import uuidv1 from "uuid/v1";
import _ from "lodash";

const state = {
  layers: [
    {
      z: 0.5,
      colors: [{ base: "#4499aa" }],
      emoji: [
        { code: "deciduous_tree", tone: 1 },
        { code: "deciduous_tree", tone: 1 },
        { code: "deciduous_tree", tone: 1 },
        { code: "deciduous_tree", tone: 1 },
        { code: "deciduous_tree", tone: 1 },
        { code: "deciduous_tree", tone: 1 }
      ],
      density: 0.25,
      uuid: uuidv1()
    },
    {
      z: 0.8,
      colors: [{ base: "#ee1100" }],
      emoji: [{ code: "", tone: 1 }],
      density: 0.25,
      uuid: uuidv1()
    },
    {
      z: 0.3,
      colors: [{ base: "#ee1100" }],
      emoji: [{ code: "", tone: 1 }],
      density: 0.25,
      uuid: uuidv1()
    }
  ]
};

const getters = {
  getLayers: s => {
    const layersCopy = _.cloneDeep(s.layers);
    return layersCopy.sort((a, b) => a.z - b.z);
  },
  getLayerZ: s => uuid => {
    return s.layers.find(x => x.uuid === uuid).z;
  }
};

const actions = {
  deleteLayer: ({ commit, state }, { uuid }) => {
    const layersCopy = _.cloneDeep(state.layers);
    const newLayers = layersCopy.filter(x => x.uuid !== uuid);
    commit("deleteLayer", newLayers);
  },
  addLayer: ({ commit }, payload) => {
    commit("addLayer", payload);
  }
};

const mutations = {
  addLayer: (state, payload) => {
    state.layers.push(payload);
  },
  setLayerZ: (state, { uuid, z }) => {
    state.layers.find(x => x.uuid === uuid).z = parseFloat(z);
  },
  addEmojiOption: (state, { uuid, emoji }) => {
    state.layers
      .find(x => x.uuid === uuid)
      .emoji.push({ code: emoji.id, tone: 1 });
  },
  deleteLayer: (state, payload) => {
    state.layers = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
