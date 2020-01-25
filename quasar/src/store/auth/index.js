/* eslint-disable promise/param-names, no-unused-vars */

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_REFRESH = "AUTH_REFRESH";

// import axios from "axios";
import Vue from "vue";
import { Cookies } from "quasar";
import { USER_REQUEST } from "../user";

const state = {
  token: Cookies.get("user-token") || "",
  refreshToken: Cookies.get("refresh-token") || "",
  status: "",
  hasLoadedOnce: false,
  authRefreshIntervalId: null
};

const getters = {
  getToken: s => s.token,
  getRefreshToken: s => s.refreshToken,
  isAuthenticated: s => !!s.token,
  authStatus: s => s.status,
  getAuthInterval: s => s.authRefreshIntervalId
};

const actions = {
  handleOauthCallback: ({ commit, dispatch }, payload) => {
    console.log(payload);
    const { provider } = payload.vm.$route.params;
    const { code } = payload.vm.$route.query;
    payload.vm.$axios
      .post(`/api/social/${provider}/`, { code })
      .then(function(resp) {
        Cookies.set("refresh-token", resp.data.refresh);
        Cookies.set("user-token", resp.data.access);
        commit("setAccessToken", resp.data.access);
        dispatch("initialAuthCheck", { vm: payload.vm });
        payload.vm.$router.push("/");
      });
  },
  initialAuthCheck: ({ commit, dispatch, getters }, payload) => {
    if (getters.isAuthenticated) {
      payload.vm.$store.dispatch("USER_REQUEST");
      // refresh the token every 4 minutes while the user is logged in in production
      // refresh every six seconds in development to ensure user stays logged in
      const refreshFrequency = process.env.NODE_ENV === "development" ? 2 : 4;
      const authRefreshIntervalId = setInterval(function() {
        payload.vm.$store.dispatch("AUTH_REFRESH");
      }, 1000 * 60 * refreshFrequency);
      commit("setAuthRefreshIntervalId", authRefreshIntervalId);
    }
  },
  [AUTH_REQUEST]: ({ commit, dispatch }, user) =>
    new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      Vue.prototype.$axios
        .post("/api/auth/obtain_token/", user)
        .then(resp => {
          Cookies.set("refresh-token", resp.data.refresh);
          Cookies.set("user-token", resp.data.access);
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST);
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          Cookies.remove("user-token");
          Cookies.remove("refresh-token");
          reject(err);
        });
    }),
  [AUTH_LOGOUT]: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      commit("toggleAuthMenu");
      Cookies.remove("user-token");
      Cookies.remove("refresh-token");
      resolve();
    }),
  [AUTH_REFRESH]: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      Vue.prototype.$axios
        .post("/api/auth/refresh_token/", {
          refresh: Cookies.get("refresh-token")
        })
        .then(resp => {
          Cookies.set("user-token", resp.data.access);
          commit(AUTH_SUCCESS, resp);
        });
    })
};

const mutations = {
  setAccessToken: (state, payload) => {
    state.token = payload;
  },
  setAuthRefreshIntervalId: (state, payload) => {
    state.authRefreshIntervalId = payload;
  },
  [AUTH_REQUEST]: requestState => {
    const s = requestState;
    s.status = "loading";
  },
  [AUTH_SUCCESS]: (s, resp) => {
    s.status = "success";
    s.token = resp.data.access;
    s.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: errorState => {
    const s = errorState;
    s.status = "error";
    s.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: logoutState => {
    const s = logoutState;
    s.token = "";
    clearInterval(s.authRefreshIntervalId);
    s.authRefreshIntervalId = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
