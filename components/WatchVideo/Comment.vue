<template>
  <v-list-item three-line>
    <v-list-item-avatar
      ><v-img :src="comment.avatar" :alt="comment.channelName"></v-img
    ></v-list-item-avatar>
    <v-list-item-content>
      <div>
        <span class="font-weight-bold caption">{{ comment.channelName }}</span>
        <span class="mx-2 caption">{{ comment.createdAt }}</span>
      </div>
      <div class="body-2">{{ comment.content }}</div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object,
  },
};
</script>
