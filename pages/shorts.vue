<template>
  <v-container class="d-flex mt-16 pt-16 align-center justify-center flex-column">
    <v-icon
      class="mb-5"
      :color="$vuetify.theme.current.dark ? '' : '#000000'"
      :size="90"
      icon="mdi:mdi-information"
    />
    <div class="mx-auto text-h5 text-center font-weight-bold">
      This page yet to be implemented
    </div>
  </v-container>
</template>

<script lang='ts' setup>
definePageMeta({ auth: false })
useHead({
  title: 'Shorts - VidFlow'
})
</script>
