<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <Header />
        <v-alert :value="alert" outlined dense type="error">{{
          alertText
        }}</v-alert>
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
                v-model="channelName"
                :rules="[rules.required]"
                label="Channel name"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="email"
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
                  @click="handleSignUp"
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
import Alert from "@/components/Alert.vue";

export default {
  layout: "basic",
  head() {
    return {
      title: "Sign up - VidFlow",
    };
  },
  components: {
    Header,
    Alert,
  },
  data() {
    return {
      valid: false,
      loading: false,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      channelName: "",
      email: "",
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) =>
          !value ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Invalid email.",
      },
      alert: false,
      alertText: "",
    };
  },
  methods: {
    setAlert(type, icon, text) {
      this.$store.commit("showAlert", {
        alertType: type,
        alertIcon: icon,
        alertText: text,
      });
    },
    handleSignUp() {
      const data = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        channelName: this.channelName,
        password: this.password,
      };
      this.loading = true;
      this.$axios
        .post("/user/register", data)
        .then(() => {
          this.setAlert(
            "success",
            "mdi-rocket-launch",
            "Your account has been created."
          );
          this.$router.push({ path: "/login" });
        })
        .then(setTimeout(() => this.$store.commit("toggleAlert"), 2000))
        .then(() => (this.loading = false))
        .catch((err) => {
          this.alertText = JSON.stringify(err.response.data);
          this.alert = true;
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>