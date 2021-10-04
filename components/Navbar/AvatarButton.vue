<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-avatar v-bind="attrs" v-on="on">
        <v-img src="https://randomuser.me/api/portraits/men/3.jpg"></v-img>
      </v-avatar>
    </template>
    <v-list dense>
      <v-row class="mt-1 mb-1">
        <v-col cols="3" class="py-0 ml-2">
          <v-list-item-avatar
            ><v-img src="https://randomuser.me/api/portraits/men/3.jpg"></v-img
          ></v-list-item-avatar>
        </v-col>
        <v-col class="pa-0">
          <h3>Username</h3>
          <router-link to="/account/settings">
            <span class="caption">Manage your account</span>
          </router-link>
        </v-col>
      </v-row>
      <v-divider class="mx-2"></v-divider>
      <v-list-item link to="/channel/cryptosingh" nuxt>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Your Channel</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="handleSignInOut">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sign out</v-list-item-title>
      </v-list-item>
      <v-divider class="mx-2"></v-divider>
      <v-list-group prepend-icon="mdi-theme-light-dark">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Apperance</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item dense @click="changeTheme('light')">
          <v-list-item-icon>
            <v-icon>mdi-white-balance-sunny</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Light</v-list-item-title>
        </v-list-item>
        <v-list-item dense @click="changeTheme('dark')">
          <v-list-item-icon>
            <v-icon>mdi-moon-waning-crescent</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dark</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <a href="https://github.com/CryptoSingh1337" target="_blank">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-github</v-icon>
          </v-list-item-icon>
          <v-list-item-title>GitHub</v-list-item-title>
        </v-list-item>
      </a>
      <v-dialog v-model="dialog" max-width="350">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link @click="dialog = !dialog" v-on="on" v-bind="attrs">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </template>
        <v-card>
          <v-card-title class="text-h5"> About </v-card-title>
          <v-card-text
            >This application is developed by Saransh Kumar</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "AvatarButton",
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapState(["dark"]),
  },
  methods: {
    ...mapMutations(["handleSignInOut"]),
    changeTheme(theme) {
      this.$vuetify.theme.dark = theme === "dark" ? true : false;
      localStorage.setItem("theme", theme);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
