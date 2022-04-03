<template>
  <Loader v-if="$fetchState.pending" />
  <v-container v-else fluid>
    <h3 class="text-h5 text-center font-weight-bold">Your account</h3>
    <v-row class="mt-10" no-gutters justify-md="center">
      <v-col class="d-flex justify-center" cols="12" md="3">
        <v-avatar
          class="user-avatar"
          :size="$vuetify.breakpoint.xs ? '100px' : '150px'"
        >
          <v-img
            :max-width="$vuetify.breakpoint.xs ? '75px' : '112.5px'"
            :max-height="$vuetify.breakpoint.xs ? '75px' : '112.5px'"
            src="https://avatars.dicebear.com/api/bottts/lunaticdevs.svg"
          ></v-img>
        </v-avatar>
      </v-col>
      <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical></v-divider>
      <v-col
        :class="$vuetify.breakpoint.mdAndUp ? 'ml-8' : 'mt-10'"
        cols="12"
        md="4"
      >
        <v-container>
          <v-form ref="form" v-model="valid_1">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="firstName"
                  :rules="[rules.required]"
                  label="First name"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="lastName"
                  :rules="[rules.required]"
                  label="Last name"
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="username"
              label="Username"
              outlined
              readonly
              disabled
            >
            </v-text-field>
            <v-text-field
              v-model="channelName"
              label="Channel name"
              outlined
              readonly
              disabled
            >
            </v-text-field>
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              label="Email"
              outlined
            >
            </v-text-field>
            <v-btn
              :loading="loading_1"
              :disabled="!valid_1"
              @click.prevent="handleSave"
              >Save</v-btn
            >
          </v-form>
          <v-divider class="my-7"></v-divider>
          <div class="">
            <h3 class="text-h5 text-center font-weight-bold mb-5">Password</h3>
          </div>
          <v-form v-model="valid_2">
            <v-text-field
              v-model="oldPassword"
              :type="show_1 ? 'text' : 'password'"
              :append-icon="show_1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              label="Enter your old password"
              @click:append="show_1 = !show_1"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="newPassword"
              :type="show_2 ? 'text' : 'password'"
              :append-icon="show_2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              label="Enter the new password"
              @click:append="show_2 = !show_2"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :type="show_3 ? 'text' : 'password'"
              :append-icon="show_3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              label="Confirm the new password"
              @click:append="show_3 = !show_3"
              outlined
            ></v-text-field>
            <v-btn
              :loading="loading_2"
              :disabled="!valid_2"
              @click.prevent="handleChangePassword"
              >Change password</v-btn
            >
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  head() {
    return {
      title: "Settings - VidFlow",
    };
  },
  data() {
    return {
      valid_1: true,
      valid_2: true,
      show_1: false,
      show_2: false,
      show_3: false,
      loading_1: false,
      loading_2: false,
      firstName: "",
      lastName: "",
      username: "",
      channelName: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) =>
          !value ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Invalid email.",
      },
    };
  },
  async fetch() {
    if (this.$auth.loggedIn) {
      const { firstName, lastName, username, channelName, email } =
        this.$auth.user;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.channelName = channelName;
      this.email = email;
    }
  },
  methods: {
    setAlert(type, icon, text) {
      this.$store.commit("showAlert", {
        alertType: type,
        alertIcon: icon,
        alertText: text,
      });
      setTimeout(() => this.$store.commit("toggleAlert"), 2000);
    },
    handleSave() {
      this.loading_1 = true;
      setTimeout(() => (this.loading_1 = false), 2000);
      console.log("Save");
    },
    handleChangePassword() {
      console.log("Change password");
      if (this.newPassword !== this.confirmPassword) {
        this.setAlert(
          "error",
          "mdi-alert-circle",
          "New password and confirm password must be same"
        );
        return;
      }
      this.loading_2 = true;
      setTimeout(() => (this.loading_2 = false), 2000);
    },
  },
};
</script>

<style scoped>
.user-avatar {
  border: 1.1px grey solid !important;
}
.margin {
  margin: 15px !important;
}
</style>