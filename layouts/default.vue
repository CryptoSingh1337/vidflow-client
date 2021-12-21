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
    ...mapState(["alert", "alertType", "alertIcon", "alertText"]),
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
