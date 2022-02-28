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
          <v-form ref="form" v-model="valid">
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
            <v-btn :disabled="!valid" @click.prevent="handleSave">Save</v-btn>
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
      valid: false,
      firstName: "",
      lastName: "",
      username: "",
      channelName: "",
      email: "",
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
    handleSave() {
      console.log("Save");
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