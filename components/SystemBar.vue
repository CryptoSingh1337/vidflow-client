<template>
  <v-system-bar :app="banner ? true : false" height="50" fixed>
    <v-spacer></v-spacer>
    <div :class="[$vuetify.breakpoint.smAndDown ? 'xs' : 'md', 'text-center']">
      The backend of this application is hosted on Heroku (free dynos). So it
      might take 1-2 mins on first visit. Check out&nbsp;
      <a
        href="https://devcenter.heroku.com/articles/free-dyno-hours"
        target="_blank"
        >official article</a
      >.
      <div>
        The time zone is set to
        <a href="https://www.google.com/search?q=universal+time+zone">UTC</a>
        (Coordinated Universal Time).
      </div>
    </div>
    <v-spacer></v-spacer>
    <v-btn @click.prevent="banner = false" icon
      ><v-icon>mdi-close</v-icon></v-btn
    >
  </v-system-bar>
</template>

<script>
export default {
  data() {
    return {
      banner: true,
    };
  },
};
</script>

<style scoped>
.xs {
  font-size: 9px;
}
.md {
  font-size: 13.28px;
}
</style>