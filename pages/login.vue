<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <NuxtLink class="text-decoration-none" to="/">
          <v-img
            class="mx-auto"
            src="/logo.svg"
            alt="logo"
            contain
            max-height="80"
            max-width="80"
          ></v-img>
          <div
            :class="[
              $vuetify.theme.dark ? 'white--text' : 'black--text',
              'py-5 mb-5 text-center display-1 font-weight-bold',
            ]"
          >
            VidFlow
          </div>
        </NuxtLink>
        <v-card flat outlined>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="username"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
                label="Enter your username"
                outlined
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                :type="show ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                label="Enter your password"
                @click:append="show = !show"
                outlined
              >
              </v-text-field>
              <div class="caption d-flex justify-space-between">
                <NuxtLink class="text-decoration-none" to="/forgot">
                  <span class="blue--text">Forgot your password?</span>
                </NuxtLink>
                <span
                  >No account?
                  <NuxtLink class="text-decoration-none" to="/register"
                    >SignUp</NuxtLink
                  ></span
                >
              </div>
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                dense
                hide-details
              ></v-checkbox>
              <v-card-actions class="px-0">
                <v-btn
                  class="tile"
                  elevation="0"
                  color="primary"
                  block
                  x-large
                  :loading="loading"
                  @click="toggleLoading"
                  :disabled="!valid"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "basic",
  head() {
    return {
      title: "Login - VidFlow",
    };
  },
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      rememberMe: false,
      loading: false,
    };
  },
  methods: {
    toggleLoading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>