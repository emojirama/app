/* eslint-disable promise/param-names, no-unused-vars */

import Vue from "vue";
import * as Cookies from "js-cookie";

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
    new Promise((resolve, reject) => {
      const { provider } = payload.vm.$route.params;
      const { code } = payload.vm.$route.query;
      Vue.prototype.$axios
        .post(`/api/social/${provider}/`, { code })
        .then(function(resp) {
          Cookies.set("refresh-token", resp.data.refresh);
          Cookies.set("user-token", resp.data.access);
          commit("setAccessToken", resp.data.access);
          dispatch("initialAuthCheck");
          payload.vm.$router.push("/");
        });
    });
  },
  initialAuthCheck: ({ commit, dispatch, getters }) => {
    dispatch("authRefresh").then(() => {
      dispatch("userRequest");
      if (getters.isAuthenticated) {
        // refresh the token every 4 minutes while the user is logged in in production
        // refresh every six seconds in development to ensure user stays logged in
        const refreshFrequency = process.env.NODE_ENV === "development" ? 2 : 4;
        const authRefreshIntervalId = setInterval(function() {
          dispatch("authRefresh");
        }, 1000 * 60 * refreshFrequency);
        commit("setAuthRefreshIntervalId", authRefreshIntervalId);
      }
    });
  },
  authRequest: ({ commit, dispatch }, user) =>
    new Promise((resolve, reject) => {
      commit("authRequest");
      Vue.prototype.$axios
        .post("/api/auth/obtain_token/", user)
        .then(resp => {
          Cookies.set("refresh-token", resp.data.refresh);
          Cookies.set("user-token", resp.data.access);
          commit("authSuccess", resp);
          dispatch("userRequest");
          resolve(resp);
        })
        .catch(err => {
          commit("authError", err);
          Cookies.remove("user-token");
          Cookies.remove("refresh-token");
          reject(err);
        });
    }),
  authLogout: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      commit("authLogout");
      commit("toggleAuthMenu");
      Cookies.remove("user-token");
      Cookies.remove("refresh-token");
      resolve();
    }),
  authRefresh: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      Vue.prototype.$axios
        .post("/api/auth/refresh_token/", {
          refresh: Cookies.get("refresh-token")
        })
        .then(resp => {
          Cookies.set("user-token", resp.data.access);
          commit("authSuccess", resp);
          resolve();
        })
        .catch(() => {
          reject();
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
  authRequest: requestState => {
    const s = requestState;
    s.status = "loading";
  },
  authSuccess: (s, resp) => {
    s.status = "success";
    s.token = resp.data.access;
    s.hasLoadedOnce = true;
  },
  authError: errorState => {
    const s = errorState;
    s.status = "error";
    s.hasLoadedOnce = true;
  },
  authLogout: logoutState => {
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
