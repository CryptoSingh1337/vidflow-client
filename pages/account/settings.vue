<template>
  <h3>Settings page</h3>
</template>

<script>
export default {
  middleware: "auth",
  head() {
    return {
      title: "Settings - VidFlow",
    };
  },
};
</script>