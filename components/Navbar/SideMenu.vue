<template>
  <v-menu offset-y class="mx-3" :close-on-content-click="false">
    <template #activator="{ on }">
      <v-icon class="mx-2" v-on="on">mdi-dots-vertical</v-icon>
    </template>
    <v-list dense>
      <v-list-group no-action prepend-icon="mdi-theme-light-dark">
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>Apperance</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item class="pl-12" dense @click="changeTheme('light')">
          <v-list-item-icon>
            <v-icon>mdi-white-balance-sunny</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Light</v-list-item-title>
        </v-list-item>
        <v-list-item class="pl-12" dense @click="changeTheme('dark')">
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
        <template #activator="{ on }">
          <v-list-item link v-on="on">
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
            <v-btn color="red darken-2" text @click="dialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
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
