<template>
  <v-app>
    <SystemBar />
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
import SystemBar from "@/components/SystemBar.vue";
import NavigationBar from "@/components/Navbar/NavigationBar.vue";

export default {
  name: "App",
  components: {
    SystemBar,
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
  scroll-behavior: smooth;
}
*::-webkit-scrollbar {
  width: 10px;
}
*::-webkit-scrollbar-thumb {
  background-color: #d3d3d3;
  border-radius: 20px;
  border: 1px solid #c5c5c5;
}
</style>
