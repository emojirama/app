const state = {
  showSquarePicker: false,
  color: "white",
  emoji: "boy"
};

const getters = {
  showSquarePicker: s => s.showSquarePicker,
  getSquarePickerColor: s => s.color,
  getSquarePickerEmoji: s => s.emoji
};

const mutations = {
  toggleSquarePicker: state => {
    state.showSquarePicker = !state.showSquarePicker;
  },
  setSquarePickerColor: (state, payload) => {
    state.squarePickerColor = payload;
  },
  setSquarePickerEmoji: (state, payload) => {
    console.log(payload);
    state.emoji = payload;
  }
};

export default {
  state,
  getters,
  mutations
};
