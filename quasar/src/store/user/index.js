/* eslint-disable no-unused-vars */

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

import Vue from "vue";
import { AUTH_LOGOUT } from "../auth";

const state = {
  status: "",
  profile: {
    profile: {
      emoji: {
        code: "",
        skin: ""
      }
    }
  }
};

const getters = {
  getProfile: s => s.profile,
  isProfileLoaded: s => !!s.profile.name,
  getCurrentUserId: s => s.profile.id,
  getProfileEmoji: (s, getters) => {
    if (s.profile.profile.emoji.code === "") {
      return "bust_in_silhouette";
    } else {
      // TODO
      return s.profile.profile.emoji.code; // get the user's profile emoji
    }
  }
};

const actions = {
  saveProfile: ({ commit }, payload) => {
    Vue.prototype.$axios
      .post("/api/users/profile/", { profile: payload.profile })
      .then(resp => {
        commit("setUserProfile", resp.data);
      });
  },
  [USER_REQUEST]: ({ dispatch, commit }) => {
    Vue.prototype.$axios
      .get("/api/users/profile/")
      .then(resp => {
        const profile = resp.data;
        commit(USER_SUCCESS, profile);
      })
      .catch(err => {
        commit(USER_ERROR);
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  setUserProfile: (state, payload) => {
    if (state.profile === {}) {
      state.profile = { profile: { emoji: { code: "", skin: "" } } };
    }
    state.profile = payload;
  },
  [USER_REQUEST]: s => {
    s.status = "loading";
  },
  [USER_SUCCESS]: (s, resp) => {
    s.status = "success";
    Vue.set(state, "profile", resp);
  },
  [USER_ERROR]: s => {
    s.status = "error";
  },
  [AUTH_LOGOUT]: s => {
    s.profile = {};
    s.status = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
