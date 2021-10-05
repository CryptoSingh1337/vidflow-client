<template>
  <section class="page_404 my-auto">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center" cols="12">
          <div class="col-sm-10 col-sm-offset-1 text-center">
            <div class="four_zero_four_bg">
              <h1 class="text-center">{{ error.statusCode }}</h1>
            </div>
            <div class="contant_box_404">
              <h3 class="heading-2">Look like you're lost</h3>

              <p v-if="error.statusCode === 404">
                The page you are looking for not avaible!
              </p>
              <p v-else>An error occurred</p>
              <v-btn
                text
                class="green"
                :to="$route.path !== '/' ? '/' : ''"
                @click="$route.path === '/' ? reload() : ''"
                nuxt
                >Go to Home</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  layout: "basic",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  methods: {
    changeThemeToLight() {
      this.$vuetify.theme.dark = false;
    },
    reload() {
      window.location.reload();
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title = `${
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    } - VidFlow`;
    return {
      title,
    };
  },
  created() {
    this.changeThemeToLight();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Arvo&display=swap");

.page_404 {
  font-family: "Arvo", serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  background: #39ac31;
  display: inline-block;
}
</style>
