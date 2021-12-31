<template>
  <div>
    <div class="my-6">{{ !comments ? 0 : comments.length }} Comments</div>
    <v-textarea
      name="comment"
      label="Add a public comment..."
      flat
      dense
      rows="1"
      auto-grow
      counter
      maxlength="50"
      v-model="comment"
      @click="typing = true"
    ></v-textarea>
    <div v-if="typing" class="d-flex my-3 justify-end">
      <v-btn class="mx-3" depressed @click="commentButtons">Cancel</v-btn>
      <v-btn
        class="mx-3"
        depressed
        :disabled="comment.length < 3 || comment.length > 50"
        @click="handleComment"
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
    setAlert(type, icon, text) {
      this.$store.commit("showAlert", {
        alertType: type,
        alertIcon: icon,
        alertText: text,
      });
      setTimeout(() => this.$store.commit("toggleAlert"), 2000);
    },
    resetCommentField() {
      this.comment = "";
      this.typing = false;
    },
    addComment(comment) {
      this.comments.unshift(comment);
    },
    commentButtons() {
      this.comment = "";
      this.typing = false;
    },
    handleComment() {
      if (!this.$auth.loggedIn) {
        this.setAlert(
          "error",
          "mdi-alert-circle",
          "You must login to post a comment."
        );
        return;
      }
      const user = this.$auth.user;
      const data = {
        username: user.username,
        channelName: user.channelName,
        body: this.comment,
      };
      this.$axios
        .post(`/video/${this.$route.params.id}/comment`, data)
        .then((res) => res.data)
        .then((data) => this.addComment(data))
        .then(() => this.resetCommentField())
        .catch((e) => console.log(e));
    },
  },
  filters: {
    numberfy: function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
