<template>
  <div>
    <v-navigation-drawer
      app
      :temporary="$route.path.startsWith('/watch')"
      v-model="drawer"
      clipped
    >
      <div
        :class="{
          'hidden-lg-and-up': $route.name === 'Watch' ? false : true,
        }"
      >
        <v-list-item>
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            class="mr-5"
          ></v-app-bar-nav-icon>
          <v-toolbar-title class="font-weight-bold">VueTube</v-toolbar-title>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      <v-list nav dense>
        <div :key="i" v-for="(parent, i) in links">
          <v-list-item
            :key="j"
            v-for="(child, j) in parent.pages"
            link
            :to="child.to"
            nuxt
          >
            <v-list-item-icon>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ child.name }}</v-list-item-title>
          </v-list-item>
          <v-list-item class="ma-0" style="min-height: 10px !important"
            ><v-divider></v-divider
          ></v-list-item>
        </div>
        <v-list-item class="justify-self-end">
          <v-list-item-content>
            <v-list-item-subtitle class="text-center">
              <span>© CryptoSingh1337</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        class="ml-1 hidden-xs-only"
        max-height="40"
        max-width="40"
        src="/logo.svg"
      ></v-img>
      <NuxtLink class="ml-2" to="/" style="text-decoration: none">
        <h3
          :class="[
            $vuetify.theme.dark ? 'white--text' : 'black--text',
            'heading-1',
          ]"
        >
          VidFlow
        </h3>
      </NuxtLink>
      <v-spacer></v-spacer>
      <v-text-field
        solo
        flat
        dense
        outlined
        hide-details
        placeholder="Search"
        append-icon="mdi-magnify"
        class="my-auto mt-1.5 hidden-xs-only"
        v-model="searchText"
        @click:append="search"
        @keyup.enter="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="searchDialog" v-if="$vuetify.breakpoint.xs">
        <template #activator="{ on }">
          <v-btn small v-on="on" icon><v-icon>mdi-magnify</v-icon></v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">Search</v-card-title>
          <v-card-text>
            <v-text-field
              solo
              flat
              dense
              outlined
              hide-details
              placeholder="Search"
              class="my-auto mt-1.5"
              v-model="searchText"
              @keyup.enter="search"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="search"> Search </v-btn>
            <v-btn color="red darken-2" text @click="searchDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div v-if="!isAuthenticated">
        <SideMenu />
        <v-btn
          :small="$vuetify.breakpoint.xs"
          color="grey"
          @click="handleSignInOut"
        >
          Login/Signup
        </v-btn>
      </div>
      <div v-else class="d-flex">
        <SideButtons />
        <AvatarButton />
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AvatarButton from "@/components/Navbar/AvatarButton.vue";
import SideMenu from "@/components/Navbar/SideMenu.vue";
import SideButtons from "@/components/Navbar/SideButtons.vue";
import NavLinks from "@/assets/data/navlinks.js";
import Button from "@/components/Navbar/Button.vue";

export default {
  name: "NavigationBar",
  components: {
    AvatarButton,
    SideMenu,
    SideButtons,
    Button,
  },
  data() {
    return {
      drawer: false,
      searchText: "",
      links: NavLinks,
      searchDialog: false,
    };
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    ...mapMutations(["handleSignInOut"]),
    search() {
      if (this.searchText && this.searchText.trim().length > 0)
        console.log(this.searchText);
      if (this.searchDialog) this.searchDialog = false;
    },
    log() {
      console.log("Button is clicked");
    },
  },
  beforeCreated() {
    this.drawer = this.$vuetify.breakpoint.mdAndDown ? false : true;
  },
};
</script>
