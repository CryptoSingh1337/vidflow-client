<template>
  <div class="mr-2 d-flex">
    <Button to="/upload" icon="mdi-video-plus" tooltip="Upload video" />
    <Button icon="mdi-bell" tooltip="Notifications" />
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
