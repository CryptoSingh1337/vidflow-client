<template>
  <v-menu location="bottom">
    <template #activator="{ props }">
      <v-icon class="mx-2" icon="mdi:mdi-dots-vertical" v-bind="props" />
    </template>
    <v-list density="compact">
      <v-list-item prepend-icon="mdi-pencil" title="Edit" @click="emit('editVideo', _props.id)" />
      <v-list-item prepend-icon="mdi-delete" title="Delete" @click="emit('deleteVideo', _props.id)" />
    </v-list>
  </v-menu>
</template>

<script lang='ts' setup>
const emit = defineEmits(['editVideo', 'deleteVideo'])

const _props = defineProps<{
  id: string
}>()
</script>
