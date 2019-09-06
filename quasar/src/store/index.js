import Vue from "vue";
import Vuex from "vuex";
import ui from "./ui";
import board from "./board";
import squarePicker from "./squarePicker";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      board,
      ui,
      squarePicker
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
