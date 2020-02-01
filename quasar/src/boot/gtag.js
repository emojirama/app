import VueGtag from "vue-gtag";

export default ({ Vue }) => {
  Vue.use(VueGtag, {
    config: { id: "UA-157527099-1" }
  });
};
