<template>
  <v-app>
    <Alert
      :model="alert"
      :icon="alertIcon"
      :type="alertType"
      :text="alertText"
    />
    <Nuxt />
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Alert from "@/components/Alert.vue";

export default {
  name: "basic",
  components: {
    Alert,
  },
  computed: {
    ...mapState(["alert", "alertType", "alertIcon", "alertText"]),
  },
};
</script>