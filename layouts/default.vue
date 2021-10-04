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
};
</script>
