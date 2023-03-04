<template>
  <v-menu location="bottom" :close-on-content-click="false">
    <template #activator="{ props }">
      <v-avatar class="btn mr-3" v-bind="props">
        <v-img :src="user.profileImage" />
      </v-avatar>
    </template>
    <v-list density="compact">
      <v-list-item>
        <template #prepend>
          <v-avatar size="40">
            <v-img :src="user.profileImage" />
          </v-avatar>
        </template>
        <h3>{{ user.username }}</h3>
        <NuxtLink to="/account/settings">
          <span class="text-caption">Manage your account</span>
        </NuxtLink>
      </v-list-item>
      <v-divider class="mx-2" />
      <v-list-item rounded="xl" :to="`/channel/${user.id}`" prepend-icon="mdi-account" title="Your channel" />
      <v-list-item rounded="xl" prepend-icon="mdi-logout" title="Sign out" @click="$auth.signOut({ redirect: false })" />
      <v-divider class="mx-2" />
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
