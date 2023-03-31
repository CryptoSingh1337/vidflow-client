<template>
  <v-container class="d-flex align-center justify-center flex-column">
    <v-icon
      class="mb-5"
      :color="$vuetify.theme.current.dark ? '' : '#000000'"
      :size="90"
      :icon="props.icon"
    />
    <div class="mx-auto text-h5 text-center font-weight-bold">
      {{ props.text }}
    </div>
  </v-container>
</template>

<script lang='ts' setup>
const props = defineProps<{
  text: string
  icon: string
}>()
</script>
