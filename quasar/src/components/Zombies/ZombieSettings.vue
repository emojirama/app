<template>
  <div>
    <page-text>
      Interval (ms)
    </page-text>
    <q-slider
      label
      :min="100"
      :max="1000"
      dark
      v-model="zombieSpeed"
    ></q-slider>
    <page-text>
      Zombie Count
    </page-text>
    <q-slider label :min="1" :max="100" dark v-model="zombieCount"></q-slider>
  </div>
</template>

<script>
export default {
  computed: {
    zombieCount: {
      get() {
        return this.$store.getters.getZombieCount;
      },
      set(count) {
        this.$store.commit("setZombieCount", count);
      }
    },
    zombieSpeed: {
      get() {
        return this.$store.getters.getZombieMoveInterval;
      },
      set(speed) {
        this.$store.commit("setZombieMoveInterval", speed);
      }
    }
  }
};
</script>

<style scoped></style>
