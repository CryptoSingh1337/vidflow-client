<template>
  <div>
    <div class="max-w-5xl mx-auto mt-5 px-5">
      <h3 class="text-xl font-bold ">
        Authentication Overview
      </h3>
      <p class="text-sm">
        See all available authentication & session information below.
      </p>
      <pre v-if="status"><span>Status:</span> {{ status }}</pre>
      <pre v-if="data"><span>Data:</span> {{ data }}</pre>
      <pre v-if="csrfToken"><span>CSRF Token:</span> {{ csrfToken }}</pre>
      <pre v-if="providers"><span>Providers:</span> {{ providers }}</pre>
      <div>
        {{ video }}
      </div>
    </div>
    <v-btn class="tile" color="primary" elevation="0" @click="handleClick">
      {{ status === 'authenticated' ? 'Sign Out' : 'Sign In' }}
    </v-btn>
  </div>
</template>
<script lang="ts" setup>
const { data, status, getCsrfToken, getProviders, signOut } = useSession()
const providers = await getProviders()
const csrfToken = await getCsrfToken()
const video = await useFetch('/api/video')
definePageMeta({ auth: false })

function handleClick () {
  if (status.value === 'authenticated') {
    signOut({ redirect: false })
  } else {
    navigateTo('/login')
  }
}
</script>
