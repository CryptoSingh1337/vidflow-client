<template>
  <div class="mr-2 d-flex">
    <Button to="/upload" icon="mdi-video-plus" tooltip="Upload video" />
    <Notifications />
  </div>
</template>

<script>
import Button from "@/components/Navbar/Button.vue";
import Notifications from "@/components/Navbar/Notifications.vue";

export default {
  name: "SideButtons",
  components: {
    Button,
    Notifications,
  },
};
</script>
