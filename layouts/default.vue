<template>
  <v-app>
    <NavigationBar />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/Navbar/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
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
