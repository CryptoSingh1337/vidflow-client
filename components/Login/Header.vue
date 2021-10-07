<template>
  <NuxtLink class="text-decoration-none" to="/">
    <v-img
      class="mx-auto"
      src="/logo.svg"
      alt="logo"
      contain
      max-height="80"
      max-width="80"
    ></v-img>
    <div
      :class="[
        $vuetify.theme.dark ? 'white--text' : 'black--text',
        'py-5 mb-5 text-center display-1 font-weight-bold',
      ]"
    >
      VidFlow
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "Header",
};
</script>