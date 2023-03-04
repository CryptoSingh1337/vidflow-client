<template>
  <v-list-item class="px-0 px-sm-5" lines="two">
    <template #prepend>
      <v-avatar size="40">
        <v-img
          :src="`https://avatars.dicebear.com/api/bottts/${comment.username}.svg`"
          :alt="props.comment.channelName"
        />
      </v-avatar>
    </template>
    <template #title>
      <div class="d-flex align-center">
        <span class="font-weight-bold text-caption">{{ comment.username }}</span>
        <span class="mx-2 text-caption">{{ formatTimeAgo(new Date(comment.createdAt)) }}</span>
        <v-spacer />
        <WatchCommentSideMenu
          v-if="$auth.status.value === 'authenticated' ? user.username === comment.username : false"
          :key="comment.id"
          :comment-id="comment.id"
          @edit-comment="emit('editComment', comment.id)"
          @delete-comment="emit('deleteComment', comment.id)"
        />
      </div>
      <div class="text-body-2">
        {{ comment.body }}
      </div>
    </template>
  </v-list-item>
</template>

<script lang='ts' setup>
import { formatTimeAgo } from '@vueuse/core'
import { Comment, User } from 'utils/model'

const { $auth } = useNuxtApp()
const user = $auth.data.value?.user as User

const emit = defineEmits(['editComment', 'deleteComment'])

const props = defineProps<{
  comment: Comment
}>()
</script>
