<template>
  <v-list-group value="Apperance">
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        prepend-icon="mdi:mdi-theme-light-dark"
        title="Apperance"
        rounded="xl"
      />
    </template>
    <v-list-item rounded="xl" prepend-icon="mdi:mdi-white-balance-sunny" title="Light" @click="toggleTheme('light')" />
    <v-list-item rounded="xl" prepend-icon="mdi:mdi-moon-waning-crescent" title="Dark" @click="toggleTheme('dark')" />
  </v-list-group>
</template>

<script lang='ts' setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme (name: string) {
  theme.global.name.value = name
}
</script>
