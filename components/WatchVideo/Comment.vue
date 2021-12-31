<template>
  <v-list-item class="px-0 px-sm-5" three-line>
    <v-list-item-avatar
      ><v-img
        :src="`https://avatars.dicebear.com/api/bottts/${comment.username}.svg`"
        :alt="comment.channelName"
      ></v-img
    ></v-list-item-avatar>
    <v-list-item-content>
      <div class="d-flex align-center">
        <span class="font-weight-bold caption">{{ comment.username }}</span>
        <span class="mx-2 caption">{{
          $moment(comment.createdAt).fromNow()
        }}</span>
        <v-spacer></v-spacer>
        <client-only>
          <SideMenu
            v-if="$auth.user ? $auth.user.username === comment.username : false"
            :commentId="comment.id"
          />
        </client-only>
      </div>
      <div class="body-2">{{ comment.body }}</div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import SideMenu from "@/components/WatchVideo/Comment/SideMenu.vue";

export default {
  name: "Comment",
  components: {
    SideMenu,
  },
  props: {
    comment: Object,
  },
  emits: ["deleteComment"],
};
</script>
