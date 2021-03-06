<template>
  <div class="base-layout">
    <debug-panel id="debug"></debug-panel>
    <settings-modal></settings-modal>
    <stats-panel></stats-panel>
    <square-conifg v-if="$store.getters.getShowSquareConfig" />
    <home-modal />
    <save-button v-if="$route.meta.save" />
    <biome-menu />
    <scene-menu />
    <movement-control />
    <square-dialog />
    <zombie-mode v-if="$route.meta.zombies" />
    <square-picker></square-picker>
    <div
      @touchmove="handleScroll"
      @scroll="handleScroll"
      id="board"
      :style="style"
    >
      <board :rows="$store.getters.getRows" :cols="$store.getters.getCols" />
    </div>
  </div>
</template>

<script>
import { dom } from "quasar";
const { height, width } = dom;

// Some aliases of the previous method for "width" and "height" which
// returns Numbers instead of Strings:
import Board from "components/Board.vue";
import DebugPanel from "components/DebugPanel.vue";
import SettingsModal from "components/SettingsModal.vue";
import SquarePicker from "components/SquarePicker/index.vue";
import StatsPanel from "components/StatsPanel.vue";
import SquareConifg from "components/SquareConfig.vue";
import HomeModal from "components/HomeModal.vue";
import SaveButton from "components/SaveButton.vue";
import SceneMenu from "components/SceneMenu/index.vue";
import SquareDialog from "components/SquareDialog.vue";
import BiomeMenu from "components/BiomeMenu.vue";

export default {
  components: {
    BiomeMenu,
    Board,
    DebugPanel,
    SettingsModal,
    SquarePicker,
    StatsPanel,
    SquareConifg,
    HomeModal,
    SaveButton,
    SceneMenu,
    SquareDialog
  },
  created() {
    document.body.style.backgroundColor = "black";
    this.$store.commit("switchScene", { nextScene: "default" });
    this.handleResize();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    if (this.$route.meta.db) {
      this.$store.dispatch("loadEmojiramaFromServer", {
        vm: this,
        id: this.$route.params.id
      });
    } else if (this.$route.meta.live) {
      this.$connect(
        `${process.env.WS_BASE_URL}emojirama/${this.$route.params.id}/`,
        { format: "json" }
      );
      // TODO: move this code outside of the base component?
      // dispatch action, commit from store
      this.$socket.onmessage = i => {
        const message = JSON.parse(i["data"]);
        if (message["type"] === "updated") {
          this.$store.commit("setSquareFromWebsocket", message);
        } else {
          this.$store.commit("loadEmojiramaFromServer", message);
        }
      };
    } else if (this.$route.meta.zombies) {
      this.$store.dispatch("resetZombies", { created: true, initial: true });
    } else {
      this.$store.dispatch("createNewEmojiramaFromConfig");
    }
  },
  data() {
    return {
      style: {},
      rows: 10,
      cols: 10
    };
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    document.body.style.backgroundColor = "white";
  },
  methods: {
    handleScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    handleResize() {
      const b = document.body;
      const rows = Math.floor(height(b) / this.$store.getters.getSquareSize);
      const cols = Math.floor(width(b) / this.$store.getters.getSquareSize);
      this.$store.commit("setRows", rows);
      this.$store.commit("setCols", cols);
    }
  }
};
</script>

<style>
#board {
  top: 50%;
  /* background-color: red; */

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#debug {
  z-index: 10;
}
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
  /* color: #056805 */
}
</style>
