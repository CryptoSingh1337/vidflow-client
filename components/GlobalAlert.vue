<template>
  <v-snackbar
    :model-value="props.model"
    :color="props.type"
    location="top"
    timeout="2000"
    transition="scale-transition"
  >
    <v-icon icon="icon" />
    <div class="Subtitle-2 d-inline">
      {{ props.text }}
    </div>
  </v-snackbar>
</template>

<script lang='ts' setup>
const props = defineProps<{
    model: boolean
    type: string
    text: string
}>()
</script>
