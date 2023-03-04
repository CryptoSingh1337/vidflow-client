<template>
  <div>
    <v-app-bar border elevation="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img v-if="$vuetify.display.smAndUp" src="/images/logo.svg" max-width="60" max-height="50" />
      <h3>VidFlow</h3>
      <v-spacer />
      <v-text-field
        v-model="searchText"
        class="d-none d-sm-block"
        color="primary"
        variant="outlined"
        density="compact"
        hide-details
        label="Search"
        append-inner-icon="mdi-magnify"
        @click:append="search"
        @keyup.enter="search"
      />
      <v-spacer />
      <v-dialog v-if="$vuetify.display.xs" v-model="searchDialog">
        <template #activator="{ props }">
          <v-btn small icon v-bind="props">
            <v-icon icon="mdi-magnify" />
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Search
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="searchText"
              color="primary"
              variant="outlined"
              density="compact"
              hide-details
              label="Search"
              class="my-auto mt-1.5"
              @keyup.enter="search"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="search">
              Search
            </v-btn>
            <v-btn color="red darken-2" text @click="searchDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div v-if="$auth.status.value === 'unauthenticated'">
        <NavSideMenu />
        <v-btn
          class="mr-3"
          :size="$vuetify.display.xs ? 'small' : 'default'"
          variant="outlined"
          elevation="0"
          color="grey"
          to="/login"
        >
          Login/SignIn
        </v-btn>
      </div>
      <div v-else class="d-flex">
        <NavSideButtons />
        <NavAvatarButton />
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :temporary="route.path.startsWith('/watch')">
      <v-list nav density="compact">
        <div v-for="(parent, i) in links" :key="i">
          <v-list-item v-for="(child, j) in parent.pages" :key="j" :to="child.to">
            <template #prepend>
              <v-icon :icon="child.icon" />
            </template>
            <v-list-item-title>{{ child.name }}</v-list-item-title>
          </v-list-item>
          <v-divider class="my-2" />
        </div>
        <NavSubscriptionsList v-if="$auth.status.value === 'authenticated'" />
      </v-list>
      <v-list-item density="compact">
        <v-list-item-subtitle class="text-center">
          <span>© CryptoSingh1337</span>
        </v-list-item-subtitle>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>

<script lang='ts' setup>
import NavLinks from '@/assets/data/navlinks'
const route = useRoute()
const router = useRouter()

const drawer = ref(false)
const searchText = ref('')
const searchDialog = ref(false)

const links = NavLinks

function search () {
  if (searchText.value && searchText.value.trim().length > 0) {
    router.push({
      path: '/search',
      query: { q: searchText.value }
    })
  }
  if (searchDialog) {
    searchDialog.value = false
  }
}
</script>
