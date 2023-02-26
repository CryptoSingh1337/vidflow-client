<template>
  <UnauthorizeUser
    v-if="$auth.status.value === 'unauthenticated'"
    icon="mdi-history"
    heading="Keep track of what you watch"
    caption="Watch history isn't viewable when signed out."
  />
  <v-container v-else-if="$auth.status.value === 'authenticated' && history && history.length > 0" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="10" lg="8">
        <SearchVideoCard
          v-for="(video, i) in history"
          :key="i"
          :video="video"
        />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="d-flex mt-16 pt-16 align-center justify-center flex-column">
    <v-icon
      class="mb-5"
      :color="$vuetify.theme.current.dark ? '' : '#000000'"
      :size="90"
      icon="mdi:mdi-information"
    />
    <div class="mx-auto text-h5 text-center font-weight-bold">
      Your watch history is empty!
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { User } from 'utils/model'

definePageMeta({ auth: false })

const user = useNuxtApp().$auth.data.value?.user as User
const { data: history } = useFetch(`/api/user/history/${user.id}`, {
  query: {
    page: 0
  }
})
</script>
