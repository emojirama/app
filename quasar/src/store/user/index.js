/* eslint-disable no-unused-vars */

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

import Vue from "vue";
import { AUTH_LOGOUT } from "../auth";

const state = {
  status: "",
  profile: {}
};

const getters = {
  getProfile: s => s.profile,
  isProfileLoaded: s => !!s.profile.name,
  getCurrentUserId: s => s.profile.id,
  getProfileEmoji: s => {
    if (s.profile.emoji === "") {
      return "bust_in_silhouette";
    } else {
      // TODO
      return "elf"; // get the user's profile emoji
    }
  }
};

const actions = {
  [USER_REQUEST]: ({ dispatch, commit }) => {
    Vue.prototype.$axios
      .get("/api/users/profile/")
      .then(resp => {
        const profile = resp.data;
        commit(USER_SUCCESS, {
          email: profile.email,
          id: profile.id,
          emoji: ""
        });
      })
      .catch(err => {
        commit(USER_ERROR);
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  [USER_REQUEST]: s => {
    s.status = "loading";
  },
  [USER_SUCCESS]: (s, resp) => {
    // s.status = "success";
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
