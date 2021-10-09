<template>
  <v-app>
    <NavigationBar />
    <Alert
      :model="alert"
      :icon="alertIcon"
      :type="alertType"
      :text="alertText"
    />
    <v-main>
      <Nuxt />
    </v-main>
    <v-snackbar app v-model="snackBar">
      <v-icon color="red">mdi-alert</v-icon>
      <div class="Subtitle-2 d-inline">
        Please check your internet connection!
      </div>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="$store.commit('showSnackBar')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavigationBar from "@/components/Navbar/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
  computed: {
    ...mapState(["snackBar", "alert", "alertType", "alertIcon", "alertText"]),
  },
  methods: {
    initializeTheme() {
      const theme = localStorage.getItem("theme");
      if (theme) {
        this.$vuetify.theme.dark = theme === "dark" ? true : false;
      } else {
        this.$vuetify.theme.dark = false;
        localStorage.setItem("theme", "light");
      }
    },
  },
  mounted() {
    this.initializeTheme();
  },
};
</script>

<style>
* {
  scrollbar-width: thin;
}
</style>
