<template>
  <v-app>
    <NuxtLoadingIndicator color="#2096f3" />
    <AppBar />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang='ts' setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
const colorMode = useColorMode()

onMounted(() => {
  theme.global.name.value = colorMode.value
})
</script>

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
