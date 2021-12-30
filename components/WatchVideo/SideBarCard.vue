<template>
  <div class="d-flex flex-column-reverse">
    <SideVideoCard :key="index" v-for="(d, index) in videos" :video="d" />
  </div>
</template>

<script>
import SideVideoCard from "@/components/WatchVideo/SideVideoCard.vue";

export default {
  name: "SideBarCard",
  components: {
    SideVideoCard,
  },
  props: {
    videoId: String,
    data: Array,
  },
  computed: {
    videos: function () {
      return this.data.filter((video) => video.id !== this.videoId);
    },
  },
};
</script>
