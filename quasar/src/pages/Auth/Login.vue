<template>
  <base-page>
    <div class="login">
      <div class="lock">
        <base-emoji
          :native="false"
          :sheetSize="64"
          :emoji="`lock_with_ink_pen`"
          :size="64"
          :skin="1"
        />
      </div>
      <base-card class="card">
        <div class="social-button-grid">
          <social-auth-button
            v-for="(provider, i) in [
              { image: 'google', name: 'google-oauth2' },
              { image: 'facebook', name: 'facebook' },
              { image: 'github', name: 'github' }
            ]"
            :key="i"
            :imagePrefix="provider.image"
            :provider="provider.name"
          ></social-auth-button>
        </div>
        <div class="login-wrapper">
          <login-form v-if="true"></login-form>
        </div>
      </base-card>
    </div>
  </base-page>
</template>

<script>
import LoginForm from "components/auth/LoginForm.vue";
export default {
  components: {
    LoginForm
  }
};
</script>

<style scoped>
.login {
  text-align: center;
  display: grid;
  justify-content: center;
}

.card {
  min-width: 320px;
  padding: 20px;
}

.signup {
  text-align: right;
  margin-top: 10px;
}

.lock {
  margin-bottom: 10px;
}

.social-button-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 10px;
}
</style>
