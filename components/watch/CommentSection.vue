<template>
  <v-container>
    {{ !commentsData ? 0 : commentsData.length }} Comments
    <v-text-field
      v-model="comment"
      class="mt-2"
      name="comment"
      label="Add a public comment..."
      variant="underlined"
      counter
      maxlength="50"
      @click="typing = true"
    />
    <v-scroll-y-transition>
      <div v-if="typing" class="d-flex my-3 justify-end">
        <v-btn class="mx-3" depressed @click="resetCommentField">
          Cancel
        </v-btn>
        <v-btn
          v-if="!editing"
          class="mx-3"
          color="primary"
          depressed
          :disabled="props.comments.length < 3 || props.comments.length > 50"
          @click="handleComment"
        >
          Comment
        </v-btn>
        <v-btn
          v-else
          class="mx-3"
          color="primary"
          depressed
          :disabled="props.comments.length < 3 || props.comments.length > 50"
          @click="handleSave"
        >
          Save
        </v-btn>
      </div>
    </v-scroll-y-transition>
    <div class="mt-6">
      <WatchCommentListItem v-for="(c, index) in commentsData" :key="index" :comment="c" />
    </div>
  </v-container>
</template>

<script lang='ts' setup>
import { Comment } from 'utils/model'

const props = defineProps<{
    comments: Comment[]
}>()

const comment = ref('')
const typing = ref(false)
const editing = ref(false)

const commentsData = ref(props.comments ? props.comments : [])

function handleComment () {
  console.log('Comment created')
}

function handleSave () {
  console.log('Comment saved')
}

function resetCommentField () {
  comment.value = ''
  typing.value = false
}
</script>
