<template>
  <v-app>
    <v-app-bar elevation="0" border>
      <v-img
        src="/images/logo.svg"
        max-width="100"
        max-height="50"
      />
      <v-app-bar-title>Authentication example</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<style>
* {
  scrollbar-width: thin;
  scroll-behavior: smooth;
}
*::-webkit-scrollbar {
  width: 5px;
}
*::-webkit-scrollbar-thumb {
  background-color: #d3d3d3;
  border-radius: 10px;
  border: 1px solid #c5c5c5;
}
</style>
