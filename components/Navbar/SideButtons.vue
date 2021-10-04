<template>
  <div class="mr-2 d-flex">
    <Button to="/upload" icon="mdi-video-plus" />
    <Button icon="mdi-bell" />
  </div>
</template>

<script>
import Button from "@/components/Navbar/Button.vue";

export default {
  name: "SideButtons",
  components: {
    Button
  }
};
</script>
