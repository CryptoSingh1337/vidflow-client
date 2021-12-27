<template>
  <v-list-item class="px-0 px-sm-5" three-line>
    <v-list-item-avatar
      ><v-img
        :src="`https://avatars.dicebear.com/api/bottts/${comment.username}.svg`"
        :alt="comment.username"
      ></v-img
    ></v-list-item-avatar>
    <v-list-item-content>
      <div>
        <span class="font-weight-bold caption">{{ comment.username }}</span>
        <span class="mx-2 caption">{{
          $moment(comment.createdAt).fromNow()
        }}</span>
      </div>
      <div class="body-2">{{ comment.body }}</div>
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
