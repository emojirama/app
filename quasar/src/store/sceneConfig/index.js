import uuidv1 from "uuid/v1";
import _ from "lodash";

const state = {
  emptyLayer: {
    z: null,
    colors: [],
    emoji: [],
    density: 0.25
  },
  layers: [
    {
      uuid: "layer-1",
      emoji: [{ code: "fish", uuid: "abc-123" }],
      colors: [{ uuid: "abc-123", base: "#1d417c" }],
      z: 40,
      density: 0.025
    },
    {
      uuid: "layer-2",
      emoji: [{ code: "shell", uuid: "abc-123" }],
      colors: [{ uuid: "abc-123", base: "#7a7a36" }],
      z: 50,
      density: 0.02
    },
    {
      uuid: "layer-3",
      emoji: [{ code: "deciduous_tree", uuid: "abc-123" }],
      colors: [{ uuid: "abc-123", base: "#056805" }],
      z: 70,
      density: 0.1
    },
    {
      uuid: "layer-4",
      emoji: [
        { code: "deciduous_tree", uuid: "abc-123" },
        { code: "tulip", uuid: "abc-456" }
      ],
      colors: [{ uuid: "abc-123", base: "#056805" }],
      z: 80,
      density: 0.25
    }
  ]
};

const getters = {
  getSceneConfig: s => {
    return {
      layers: s.layers,
      dimensions: [80, 80]
    };
  },
  getLayers: s => {
    const layersCopy = _.cloneDeep(s.layers);
    return layersCopy.sort((a, b) => a.z - b.z);
  },
  getLayerZ: s => uuid => {
    return s.layers.find(x => x.uuid === uuid).z;
  },
  getLayerEmojiDensity: s => uuid => {
    return s.layers.find(x => x.uuid === uuid).density;
  }
};

const actions = {
  deleteLayerColor: ({ commit }, payload) => {
    commit("deleteLayerColor", payload);
  },
  deleteLayerEmoji: ({ commit }, payload) => {
    commit("deleteLayerEmoji", payload);
  },
  deleteLayer: ({ commit, state }, { uuid }) => {
    const layersCopy = _.cloneDeep(state.layers);
    const newLayers = layersCopy.filter(x => x.uuid !== uuid);
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
    commit("addColor", payload);
  }
};

const mutations = {
  deleteLayerColor: (state, { layerUuid, colorUuid }) => {
    state.layers.find(x => x.uuid === layerUuid).colors = state.layers
      .find(x => x.uuid === layerUuid)
      .colors.filter(x => x.uuid !== colorUuid);
  },
  deleteLayerEmoji: (state, { layerUuid, emojiUuid }) => {
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
  setLayerEmojiDensity: (state, { uuid, emojiDensity }) => {
    state.layers.find(x => x.uuid === uuid).density = emojiDensity;
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
