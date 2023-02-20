<template>
  <v-menu location="bottom">
    <template #activator="{ props }">
      <v-avatar class="btn mr-3" v-bind="props">
        <v-img :src="user.profileImage" />
      </v-avatar>
    </template>
    <v-list density="compact" class="pt-0">
      <v-row class="mt-1 mb-1 mx-0">
        <v-col cols="3" class="pa-auto">
          <v-avatar>
            <v-img :src="user.profileImage" />
          </v-avatar>
        </v-col>
        <v-col class="pa-0">
          <h3>{{ user.username }}</h3>
          <NuxtLink to="/account/settings">
            <span class="text-caption">Manage your account</span>
          </NuxtLink>
        </v-col>
      </v-row>
      <v-divider class="px-2" />
      <v-list-item rounded="xl" :to="`/channel/${user.id}`" prepend-icon="mdi-account" title="Your Channel" />
      <v-list-item rounded="xl" prepend-icon="mdi-logout" title="Sign out" @click="$auth.signOut({ redirect: false })" />
      <v-divider class="px-2" />
      <NavThemeChanger />
      <NavInfoSection />
    </v-list>
  </v-menu>
</template>

<script lang='ts' setup>
import { User } from 'utils/model'

const { $auth } = useNuxtApp()
const user = $auth.data.value?.user as User
</script>

<style scoped>
.btn:hover {
  cursor: pointer;
}
</style>
