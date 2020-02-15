<template>
  <div>
    <q-item clickable tag="a" :to="to" exact>
      <q-item-section avatar>
        <base-emoji
          :emoji="emoji"
          @click.native="toggleLeftDrawer"
          :native="false"
          size="40"
        >
        </base-emoji>
        <!-- <q-icon :name="icon" /> -->
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  props: ["label", "to", "icon", "caption", "emoji"]
};
</script>

<style lang="scss" scoped></style>
