<template>
  <v-menu location="bottom" transition="slide-x-transition">
    <template #activator="{ props }">
      <v-icon class="mx-2" v-bind="props" icon="mdi-dots-vertical" />
    </template>
    <v-list density="compact">
      <v-list-item prepend-icon="mdi-pencil" title="Edit" @click="handleEdit" />
      <v-list-item prepend-icon="mdi-delete" title="Delete" @click="handleDelete" />
    </v-list>
  </v-menu>
</template>

<script lang='ts' setup>

const _props = defineProps<{
  commentId: string
}>()

function handleEdit () {
  console.log('Editing', _props.commentId)
}

function handleDelete () {
  console.log('Deleting', _props.commentId)
}
</script>
