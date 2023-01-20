<template>
  <v-snackbar
    :model-value="model"
    :color="type"
    location="top"
    timeout="2000"
    transition="scale-transition"
  >
    <v-icon icon="icon" />
    <div class="Subtitle-2 d-inline">
      {{ text }}
    </div>
  </v-snackbar>
</template>

<script lang='ts' setup>
defineProps<{
    model: boolean,
    type: string,
    text: string
}>()
</script>
