<template>
  <h1>Error</h1>
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
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
