<template>
  <div>
    <div class="my-4">{{ comments.length }} Comments</div>
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
      <Comment :key="index" v-for="(c, index) in comments" :comment="c" />
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
  props: {
    comments: Array,
  },
  data() {
    return {
      comment: "",
      typing: false,
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
