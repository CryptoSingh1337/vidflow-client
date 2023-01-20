<template>
  <NuxtLink
    :class="[
      'text-decoration-none',
      $vuetify.theme.current.dark ? 'text-white' : 'text-black'
    ]"
    to="/"
  >
    <v-img
      class="mx-auto"
      src="/images/logo.svg"
      alt="logo"
      max-height="80"
      max-width="80"
    />
    <div class="py-5 mb-5 text-center text-h4 font-weight-bold">
      VidFlow
    </div>
  </NuxtLink>
</template>
