<template>
  <v-menu
    :min-width="$vuetify.breakpoint.xs ? 200 : 300"
    :max-width="$vuetify.breakpoint.xs ? 200 : 300"
    offset-y
    class="mx-3"
    :close-on-content-click="false"
  >
    <template #activator="{ on }">
      <v-btn :small="$vuetify.breakpoint.xs" class="my-auto mx-1" icon v-on="on"
        ><v-icon>mdi-bell</v-icon></v-btn
      >
    </template>
    <v-list subheader>
      <v-subheader class="d-flex"
        ><span>Notifications</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="clearNotifications"
          ><v-icon>mdi-notification-clear-all</v-icon></v-btn
        ></v-subheader
      >
      <div v-if="notifications.length > 0">
        <v-list-item :key="i" v-for="(notification, i) in notifications">
          <v-list-item-content>
            <v-list-item-title
              v-text="notification.channelName"
            ></v-list-item-title>
            <v-list-item-subtitle
              v-text="notification.content"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-list-item v-else>
        <v-list-item-title>No Notifications</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Button from "@/components/Navbar/Button.vue";

export default {
  name: "Notifications",
  components: {
    Button,
  },
  data() {
    return {
      notifications: [
        {
          channelName: "Harsh Live",
          content: "How are you, you are noob",
        },
      ],
    };
  },
  methods: {
    clearNotifications() {
      this.notifications = this.notifications.splice(0, 0);
    },
  },
};
</script>
<style scoped>
.v-menu__content {
  overflow-y: scroll;
  scrollbar-width: none;
}
</style>