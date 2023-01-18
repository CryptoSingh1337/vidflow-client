<template>
  <v-menu
    :min-width="$vuetify.display.xs ? 200 : 300"
    :max-width="$vuetify.display.xs ? 200 : 300"
    offset-y
    class="mx-3"
    :close-on-content-click="false"
  >
    <template #activator="{ on }">
      <v-btn
        :small="$vuetify.display.xs"
        class="my-auto mx-1"
        icon
        v-on="on"
      >
        <v-badge
          :content="noOfNotifications"
          :value="noOfNotifications"
          color="primary"
          overlap
        >
          <v-icon icon="mdi:mdi-bell" />
        </v-badge>
      </v-btn>
    </template>
    <v-list subheader>
      <v-subheader class="d-flex">
        <span>Notifications</span>
        <v-spacer />
        <v-btn
          icon
          small
          @click="clearNotifications"
        >
          <v-icon icon="mdi:mdi-notification-clear-all" />
        </v-btn>
      </v-subheader>
      <div v-if="notifications.length > 0">
        <v-list-item v-for="(notification, i) in notifications" :key="i" append>
          <v-list-item-title>{{ notification.channelName }}</v-list-item-title>
          <v-list-item-subtitle>{{ notification.content }}</v-list-item-subtitle>
        </v-list-item>
      </div>
      <v-list-item v-else>
        <v-list-item-title>No Notifications</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang='ts' setup>
const notifications = ref([
  {
    channelName: 'Harsh Live',
    content: 'How are you, you are noob'
  },
  {
    channelName: 'Harsh Live',
    content: 'How are you, you are noob'
  },
  {
    channelName: 'Harsh Live',
    content: 'How are you, you are noob'
  },
  {
    channelName: 'Harsh Live',
    content: 'How are you, you are noob'
  }
])

const noOfNotifications = computed(() => {
  return notifications.value.length > 9 ? '9+' : String(notifications.value.length)
})

function clearNotifications () {
  notifications.value = notifications.value.splice(0, 0)
}
</script>
