<template>
  <NuxtLink v-if="props.to" :to="props.to">
    <v-btn
      v-bind="props"
      class="mx-1"
      icon
      :small="$vuetify.display.xs"
    >
      <v-icon :icon="props.icon" />
      <v-tooltip activator="parent" location="bottom">
        {{ props.tooltip }}
      </v-tooltip>
    </v-btn>
  </NuxtLink>
  <v-btn v-else class="mx-1" icon :small="$vuetify.display.xs">
    <v-icon :icon="props.icon" />
    <v-tooltip activator="parent" location="bottom">
      {{ props.tooltip }}
    </v-tooltip>
  </v-btn>
</template>

<script lang='ts' setup>
const props = defineProps<{
  to: string,
  icon: string,
  tooltip: string
}>()
</script>
