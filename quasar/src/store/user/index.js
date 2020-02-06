/* eslint-disable no-unused-vars */

import Vue from "vue";
import _ from "lodash";

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
    if (getters.getProfile.profile.emoji.code === "") {
      return "bust_in_silhouette";
    } else {
      return getters.getProfile.profile.emoji.code;
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
  userRequest: ({ dispatch, commit }) => {
    Vue.prototype.$axios
      .get("/api/users/profile/")
      .then(resp => {
        const profile = resp.data;
        commit("userSuccess", profile);
      })
      .catch(err => {
        commit("userError");
        dispatch("authLogout");
      });
  }
};

const mutations = {
  setUserProfile: (state, payload) => {
    if (payload.profile === {}) {
      state.profile = { profile: { emoji: { code: "", skin: "" } } };
      return;
    }
    state.profile = payload;
  },
  userRequest: s => {
    s.status = "loading";
  },
  userSuccess: (s, payload) => {
    s.status = "success";
    if (_.isEqual(payload.profile, {})) {
      Vue.set(state, "profile", { profile: { emoji: { code: "", skin: "" } } });
      return;
    }
    Vue.set(state, "profile", payload);
  },
  userError: s => {
    s.status = "error";
  },
  authLogout: s => {
    s.profile = {
      profile: {
        emoji: {
          code: "",
          skin: ""
        }
      }
    };
    s.status = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
