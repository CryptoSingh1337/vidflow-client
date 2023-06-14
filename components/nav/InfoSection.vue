<template>
  <v-list-item href="https://github.com/CryptoSingh1337" target="_blank" rounded="xl">
    <template #prepend>
      <v-icon icon="mdi-github" />
    </template>
    <v-list-item-title>GitHub</v-list-item-title>
  </v-list-item>
  <v-dialog v-model="dialog" max-width="350">
    <template #activator="{ props }">
      <v-list-item v-bind="props" rounded="xl">
        <template #prepend>
          <v-icon icon="mdi-information" />
        </template>
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        About
      </v-card-title>
      <v-card-text>
        This application is developed by Saransh Kumar, Shivang Dubey, Mukund Khandelwal and Nama Sagar Gupta
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red darken-2"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts' setup>
const dialog = ref(false)
</script>
