<template>
  <v-menu offset-y class="mx-3" :close-on-content-click="false">
    <template #activator="{ on }">
      <v-icon class="mx-2" v-on="on">mdi-dots-vertical</v-icon>
    </template>
    <v-list dense>
      <v-list-item @click.prevent="handleEdit">
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>
      <v-list-item @click.prevent="handleDelete">
        <v-list-item-icon>
          <v-icon>mdi-delete</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    commentId: String,
  },
  methods: {
    handleEdit() {
      console.log("Edit...", this.commentId);
    },
    handleDelete() {
      console.log("Delete...", this.commentId);
    },
  },
};
</script>