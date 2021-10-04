<template>
  <div>
    <div class="my-4">{{ commentsCount | numberfy }} Comments</div>
    <v-textarea
      name="comment"
      hide-details="true"
      label="Add a public comment..."
      flat
      dense
      rows="1"
      auto-grow
      v-model="comment"
      @click="typing = true"
    ></v-textarea>
    <div v-if="typing" class="d-flex my-3 justify-end">
      <v-btn class="mx-3" depressed @click="commentButtons">Cancel</v-btn>
      <v-btn
        class="mx-3"
        depressed
        :disabled="comment === ''"
        @click="postComment"
        >Comment</v-btn
      >
    </div>
    <div class="mt-6">
      <Comment :key="i" v-for="i in 6" :comment="comments[0]" />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/WatchVideo/Comment.vue";

export default {
  name: "Comments",
  components: {
    Comment,
  },
  data() {
    return {
      comment: "",
      typing: false,
      commentsCount: 78946,
      comments: [
        {
          id: 1,
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
          channelName: "Harsh Live",
          createdAt: "16 hourse ago",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
      ],
    };
  },
  methods: {
    commentButtons() {
      this.comment = "";
      this.typing = false;
    },
    postComment() {
      console.log(this.comment);
    },
  },
  filters: {
    numberfy: function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
