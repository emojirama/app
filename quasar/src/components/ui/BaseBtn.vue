<template>
  <q-btn :id="id" :color="color" :text-color="textColor" :class="buttonClass"
    ><slot></slot
  ></q-btn>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "default_key_change_me"
    },
    color: {
      type: String,
      default: "white"
    },
    textColor: {
      type: String,
      default: "black"
    },
    buttonClass: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped></style>
