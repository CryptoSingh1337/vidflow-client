<template>
  <v-system-bar :app="banner ? true : false" height="36" absolute fixed>
    <v-spacer></v-spacer>
    The backend of this application is hosted on Heroku (free dynos). So it
    might take 1-2 mins on first visit. Check out&nbsp;
    <a
      href="https://devcenter.heroku.com/articles/free-dyno-hours"
      target="_blank"
      >official article</a
    >.
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