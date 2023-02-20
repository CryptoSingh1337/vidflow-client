<template>
  <v-menu
    :min-width="$vuetify.display.xs ? 200 : 300"
    :max-width="$vuetify.display.xs ? 200 : 300"
    location="bottom"
    class="mx-3"
  >
    <template #activator="{ props }">
      <v-btn
        :small="$vuetify.display.xs"
        class="my-auto mx-1"
        icon
        v-bind="props"
      >
        <v-badge
          :content="smallerfy"
          :value="smallerfy"
          color="primary"
          overlap
        >
          <v-icon icon="mdi:mdi-bell" />
        </v-badge>
      </v-btn>
    </template>
    <v-list max-height="300px">
      <v-list-subheader class="d-block">
        <div class="d-flex justify-space-between">
          <span class="d-flex align-center">Notifications</span>
          <v-btn
            variant="text"
            icon
            size="x-small"
            @click="clearNotifications"
          >
            <v-icon icon="mdi-notification-clear-all" />
          </v-btn>
        </div>
      </v-list-subheader>
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
  },
  {
    channelName: 'Harsh Live',
    content: 'How are you, you are noob'
  }
])

const smallerfy = computed(() => {
  if (notifications.value.length > 10) {
    return '9+'
  }
  return notifications.value.length
})

function clearNotifications () {
  notifications.value = notifications.value.splice(0, 0)
}
</script>
