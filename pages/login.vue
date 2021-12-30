<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <Header />
        <v-alert :value="alert" outlined dense type="error">{{
          alertText
        }}</v-alert>
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
                    >SignIn</NuxtLink
                  ></span
                >
              </div>
              <v-card-actions class="px-0">
                <v-btn
                  class="tile"
                  elevation="0"
                  color="primary"
                  block
                  x-large
                  @click="handleLogin"
                  :loading="loading"
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
import Header from "@/components/Login/Header.vue";

export default {
  layout: "basic",
  head() {
    return {
      title: "Login - VidFlow",
    };
  },
  components: {
    Header,
  },
  data() {
    return {
      valid: true,
      loading: false,
      username: "",
      password: "",
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      alert: false,
      alertText: "",
    };
  },
  methods: {
    handleLogin() {
      const data = {
        username: this.username,
        password: this.password,
      };
      console.log(data);
      this.loading = true;
      this.$auth
        .loginWith("local", { data: data })
        .then((res) => res.data)
        .then((data) => {
          this.$auth.setUserToken(data.accessToken, data.refreshToken);
        })
        .then(() => (this.loading = false))
        .catch((err) => {
          if (err.response.data.status === 401) {
            this.alertText = "Invalid username/password";
            this.alert = true;
          }
          this.loading = false;
        });
    },
  },
  mounted() {
    this.$vuetify.theme.dark =
      localStorage.getItem("theme") === "dark" ? true : false;
  },
};
</script>