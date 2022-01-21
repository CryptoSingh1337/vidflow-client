<template>
  <div>
    <div class="my-6">
      {{ !commentsData ? 0 : commentsData.length }} Comments
    </div>
    <v-text-field
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
    ></v-text-field>
    <div v-if="typing" class="d-flex my-3 justify-end">
      <v-btn class="mx-3" depressed @click="resetCommentField">Cancel</v-btn>
      <v-btn
        class="mx-3"
        color="primary"
        v-if="!editing"
        depressed
        :disabled="comment.length < 3 || comment.length > 50"
        @click="handleComment"
        >Comment</v-btn
      >
      <v-btn
        class="mx-3"
        color="primary"
        v-else
        depressed
        :disabled="comment.length < 3 || comment.length > 50"
        @click="handleSave"
        >Save</v-btn
      >
    </div>
    <div class="mt-6">
      <Comment :key="index" v-for="(c, index) in commentsData" :comment="c" />
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
      editing: false,
      typing: false,
      commentsData: this.comments ? this.comments : [],
      editing: false,
      editId: "",
    };
  },
  created() {
    this.$nuxt.$on("deleteComment", (id) => {
      this.deleteComment(id);
    });

    this.$nuxt.$on("editComment", (id) => {
      this.editComment(id);
    });
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
      this.commentsData.unshift(comment);
    },
    deleteComment(id) {
      if (id) {
        this.$axios
          .delete(`/video/${this.$route.params.id}/comment/${id}`)
          .then(
            () =>
              (this.commentsData = this.commentsData.filter((c) => c.id !== id))
          )
          .catch((e) => console.log(e));
      }
    },
    editComment(id) {
      this.comment = this.commentsData.find((c) => c.id === id).body;
      this.editing = true;
      this.typing = true;
      this.editId = id;
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
    handleSave() {
      const data = {
        body: this.comment,
      };
      this.$axios
        .put(`/video/${this.$route.params.id}/comment/${this.editId}`, data)
        .then(() => {
          const comment = this.commentsData.find((c) => c.id === this.editId);
          comment.body = this.comment;
          this.comment = "";
        })
        .then(() => (this.editing = false))
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
