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
    <v-btn v-if="$vuetify.display.xs" variant="text" block>
      Show more
    </v-btn>
  </v-container>
</template>

<script lang='ts' setup>
import { User, Comment } from 'utils/model'

const { $auth } = useNuxtApp()
const route = useRoute()
const props = defineProps<{
    comments: Comment[]
}>()

const comment = ref('')
const typing = ref(false)
const editing = ref(false)
const editCommentId = ref('')

const commentsData = ref<Comment[]>(props.comments ? props.comments : [])

async function handleComment () {
  if ($auth.status.value === 'unauthenticated') {
    navigateTo('/login')
  } else if (comment.value.length >= 3 && comment.value.length <= 50) {
    const user = $auth.data.value?.user as User
    const payload = {
      username: user.username,
      channelName: user.channelName,
      body: comment.value
    }

    await useFetch(`/api/video/id/${route.params.id}/comment`, {
      method: 'POST',
      body: payload,
      onResponse ({ response }) {
        if (response.status === 200) {
          const comment = response._data as Comment
          commentsData.value.unshift(comment)
          resetCommentField()
        }
      }
    })
  }
}

function handleEditComment (id: string) {
  if (commentsData.value.length > 0) {
    const c = commentsData.value.find(c => c.id === id)
    if (c) {
      comment.value = c.body
      editing.value = true
      typing.value = true
      editCommentId.value = id
    }
  }
}

async function handleSave () {
  if ($auth.status.value === 'unauthenticated') {
    navigateTo('/login')
  } else if (comment.value.length >= 3 && comment.value.length <= 50) {
    const payload = {
      body: comment.value
    }
    await useFetch(`/api/video/id/${route.params.id}/comment/${editCommentId.value}`, {
      method: 'PUT',
      body: payload,
      onResponse ({ response }) {
        if (response.status === 200) {
          const c = commentsData.value.find(c => c.id === editCommentId.value)
          if (c) {
            c.body = comment.value
            editCommentId.value = ''
          }
          resetCommentField()
        }
      }
    })
    editing.value = false
  }
}

function handleDeleteComment (id: string) {
  if ($auth.status.value === 'unauthenticated') {
    navigateTo('/login')
  } else {
    useFetch(`/api/video/id/${route.params.id}/comment/${id}`, {
      method: 'DELETE',
      onResponse ({ response }) {
        if (response.status === 200) {
          const idx = commentsData.value.findIndex(c => c.id === id)
          if (idx !== -1) {
            commentsData.value.splice(idx, 1)
          }
        }
      }
    })
  }
}

function resetCommentField () {
  comment.value = ''
  typing.value = false
}
</script>
