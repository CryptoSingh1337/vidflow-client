<template>
  <v-menu location="bottom">
    <template #activator="{ props }">
      <v-icon class="mx-2" :icon="'mdi-dots-vertical'" v-bind="props" />
    </template>
    <v-list density="compact">
      <NavThemeChanger />
      <NavInfoSection />
    </v-list>
  </v-menu>
</template>
