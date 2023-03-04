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
        <v-btn class="mx-3" :size="$vuetify.display.xs ? 'x-small' : 'default'" @click="resetCommentField">
          Cancel
        </v-btn>
        <v-btn
          v-if="!editing"
          class="mx-3"
          color="primary"
          :size="$vuetify.display.xs ? 'x-small' : 'default'"
          :disabled="comment.length < 3 || comment.length > 50"
          @click="handleComment"
        >
          Comment
        </v-btn>
        <v-btn
          v-else
          class="mx-3"
          color="primary"
          :size="$vuetify.display.xs ? 'x-small' : 'default'"
          :disabled="comment.length < 3 || comment.length > 50"
          @click="handleSave"
        >
          Save
        </v-btn>
      </div>
    </v-scroll-y-transition>
    <div v-if="commentsData.length > 0" class="mt-6">
      <WatchCommentListItem v-for="(c, index) in commentsData" :key="index" :comment="c" @edit-comment="handleEditComment" @delete-comment="handleDeleteComment" />
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

function handleEditComment (id: string) {
  console.log('Editing comment', id)
}

function handleDeleteComment (id: string) {
  console.log('Deleting comment', id)
}

function resetCommentField () {
  comment.value = ''
  typing.value = false
}
</script>
