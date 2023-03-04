<template>
  <v-menu location="bottom" transition="slide-x-transition">
    <template #activator="{ props }">
      <v-icon class="mx-2" v-bind="props" icon="mdi-dots-vertical" />
    </template>
    <v-list density="compact">
      <v-list-item prepend-icon="mdi-pencil" title="Edit" @click="emit('editComment', _props.commentId)" />
      <v-list-item prepend-icon="mdi-delete" title="Delete" @click="emit('deleteComment', _props.commentId)" />
    </v-list>
  </v-menu>
</template>

<script lang='ts' setup>
const emit = defineEmits(['editComment', 'deleteComment'])

const _props = defineProps<{
  commentId: string
}>()
</script>
