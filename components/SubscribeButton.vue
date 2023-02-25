<template>
  <v-btn
    v-model="subscribe"
    :size="$vuetify.display.xs ? 'x-small' : 'default'"
    :disabled="same"
    :color="subscribe ? 'grey' : 'red'"
    @click="handleSubscribe"
  >
    {{ subscribe ? "Subscribed" : "Subscribe" }}
  </v-btn>
</template>

<script lang='ts' setup>
const props = defineProps<{
    id: string,
    channelName: string,
    subscribed: boolean,
    same: boolean
}>()

const subscribe = ref(props.subscribed)

function handleSubscribe () {
  console.log('Subscribe')
}
</script>
