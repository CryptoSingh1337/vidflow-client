<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <Header />
        <v-card flat outlined>
          <v-card-title>Sign Up</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="firstName"
                    :rules="[rules.required]"
                    label="First name"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="lastName"
                    :rules="[rules.required]"
                    label="Last name"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="username"
                prepend-inner-icon="mdi-account"
                :append-icon="
                  isAvailable === null ? '' : isAvailable ? '' : 'mdi-close'
                "
                :rules="[rules.required]"
                label="Username"
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
              <v-text-field
                type="email"
                :rules="[rules.required, rules.email]"
                label="Email"
                outlined
              ></v-text-field>
              <div class="caption">
                <span>Having an account?</span>
                <NuxtLink class="text-decoration-none" to="/login"
                  ><span class="blue--text">Login</span>
                </NuxtLink>
              </div>
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
                  >Sign up</v-btn
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
      title: "Sign up - VidFlow",
    };
  },
  components: {
    Header,
  },
  data() {
    return {
      valid: true,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid email.";
        },
      },
      isAvailable: null,
      loading: false,
    };
  },
  methods: {
    toggleLoading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$router.push({ path: "/login" });
      }, 3000);
    },
  },
  watch: {
    username: function () {
      this.isAvailable = false;
    },
  },
};
</script>

<style>
</style>