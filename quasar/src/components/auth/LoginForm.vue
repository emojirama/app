<template>
  <q-form @submit.prevent="login">
    <q-card-actions>
      <q-input
        class="login-input"
        :color="$store.getters.isDark ? 'black' : 'primary'"
        :dark="$store.getters.isDark"
        id="email"
        v-model="email"
        type="text"
        label="Email"
        autofocus
      />
      <q-input
        class="login-input"
        :color="$store.getters.isDark ? 'black' : 'primary'"
        :dark="$store.getters.isDark"
        id="password"
        type="password"
        v-model="password"
        label="Password"
      />
    </q-card-actions>

    <q-card-actions align="right" class="text-primary">
      <q-btn
        style="width: 100%"
        :color="$store.getters.isDark ? 'black' : 'primary'"
        id="login-btn"
        label="Login"
        type="submit"
        v-close-popup
      />
    </q-card-actions>
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      email: process.env.NODE_ENV === "production" ? "" : "admin@company.com",
      password: process.env.NODE_ENV === "production" ? "" : "password"
    };
  },
  methods: {
    login() {
      const vm = this;
      this.$store
        .dispatch("authRequest", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          console.log("finished auth request.. in login form");
          vm.$router.push("/");
          vm.$store.dispatch("initialAuthCheck", { vm });
        });
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style scoped>
.login-input,
.q-card-actions {
  width: 100%;
}
</style>
