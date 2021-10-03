<template>
  <div class="d-flex flex-column-reverse">
    <SideVideoCard :key="index" v-for="(d, index) in data" :video="d" />
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
    data: Array,
  },
};
</script>
