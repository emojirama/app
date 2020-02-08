import uuidv1 from "uuid/v1";
import _ from "lodash";

const state = {
  emptyLayer: {
    z: null,
    colors: [],
    emoji: [],
    density: 0.25
  },
  layers: []
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
  deleteLayerColor: ({ commit }, payload) => {
    console.log(payload);
    commit("deleteLayerColor", payload);
  },
  deleteLayerEmoji: ({ commit }, payload) => {
    console.log("actoin payload");
    console.log(payload);
    commit("deleteLayerEmoji", payload);
  },
  deleteLayer: ({ commit, state }, { uuid }) => {
    console.log(uuid);
    const layersCopy = _.cloneDeep(state.layers);
    const newLayers = layersCopy.filter(x => x.uuid !== uuid);
    console.log(newLayers.length);
    commit("deleteLayer", newLayers);
  },
  addLayer: ({ commit, state }) => {
    const newLayer = _.cloneDeep(state.emptyLayer);
    newLayer.uuid = uuidv1();
    commit("addLayer", newLayer);
  },
  addColor: ({ commit }, payload) => {
    const uuid = uuidv1();
    payload["colorUuid"] = uuid;
    console.log(payload);

    commit("addColor", payload);
  }
};

const mutations = {
  deleteLayerColor: (state, { layerUuid, colorUuid }) => {
    console.log(layerUuid, colorUuid);
    state.layers.find(x => x.uuid === layerUuid).colors = state.layers
      .find(x => x.uuid === layerUuid)
      .colors.filter(x => x.uuid !== colorUuid);
  },
  deleteLayerEmoji: (state, { layerUuid, emojiUuid }) => {
    console.log(emojiUuid);
    state.layers.find(x => x.uuid === layerUuid).emoji = state.layers
      .find(x => x.uuid === layerUuid)
      .emoji.filter(x => x.uuid !== emojiUuid);
  },
  addColor: (state, { c, uuid, colorUuid, min, max }) => {
    state.layers
      .find(x => x.uuid === uuid)
      .colors.push({ base: c, uuid: colorUuid, min, max });
  },
  addLayer: (state, payload) => {
    state.layers.push(payload);
  },
  setLayerZ: (state, { uuid, z }) => {
    state.layers.find(x => x.uuid === uuid).z = parseFloat(z);
  },
  addEmojiOption: (state, { uuid, emoji }) => {
    const newEmojiUuid = uuidv1();
    state.layers
      .find(x => x.uuid === uuid)
      .emoji.push({ code: emoji.id, tone: 1, uuid: newEmojiUuid });
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
