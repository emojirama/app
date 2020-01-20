<template>
  <div :id="`delete_emojirama_${id}`">
    <div @click="show = !show">
      <emoji-button :native="false" :emoji="`wastebasket`"></emoji-button>
    </div>
    <q-dialog v-model="show">
      <base-card>
        <q-card-section>
          <page-text>{{ $t("Delete this emojirama?") }}</page-text>
        </q-card-section>
        <div :id="`confirm_delete_emojirama_${id}`" class="delete-button">
          <div @click="deleteEmojirama">
            <emoji-button
              :backgroundColor="`white`"
              :size="24"
              :native="false"
              :emoji="`wastebasket`"
            />
          </div>
        </div>
      </base-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      loading: true
    };
  },
  props: {
    id: {
      type: Number
    }
  },
  methods: {
    deleteEmojirama() {
      this.$store
        .dispatch("deleteEmojirama", { id: this.id, vm: this })
        .then(() => {
          this.show = false;
          this.$emit("reload");
        });
    }
  }
};
</script>

<style scoped>
p {
  margin-bottom: 0px;
}
.delete-button {
  display: flex;
  justify-content: center;
  margin: 10px;
}
.button-wrapper {
  padding: 5px;
}
span.emoji-mart-emoji {
  height: 24px !important;
}
</style>
