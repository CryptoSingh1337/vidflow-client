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
          'hidden-lg-and-up': $route.name === 'Watch' ? false : true
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
          >
            <v-list-item-icon>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ child.name }}</v-list-item-title>
          </v-list-item>
          <v-list-item class="ma-0" style="min-height: 10px !important;"
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
        src="/vuetify-logo.svg"
      ></v-img>
      <router-link class="ml-2" to="/" style="text-decoration: none"
        ><h3 :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
          VidFlow
        </h3></router-link
      >
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
      <div v-if="!loggedIn">
        <SideMenu />
        <v-btn
          :small="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
          color="grey"
          @click="handleSignInOut"
        >
          Login/Signup
        </v-btn>
      </div>
      <div v-if="loggedIn">
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
import NavLinks from "~/assets/data/nav_links.js";

export default {
  name: "NavigationBar",
  components: {
    AvatarButton,
    SideMenu,
    SideButtons
  },
  data() {
    return {
      drawer: false,
      searchText: "",
      links: NavLinks
    };
  },
  computed: {
    ...mapState(["loggedIn"])
  },
  methods: {
    ...mapMutations(["handleSignInOut"]),
    search(text) {
      console.log(text);
    }
  },
  mounted() {
    this.drawer = this.$vuetify.breakpoint.mdAndDown ? false : true;
  }
};
</script>

<style scoped>
.active-item .v-list-item__icon {
  color: #1697f6;
}
</style>
