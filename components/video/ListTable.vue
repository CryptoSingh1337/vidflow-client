<template>
  <v-data-table-server
    v-model:page="page"
    :headers="headers"
    :items="_props.videos"
    :items-length="_props.totalItems"
    hide-default-footer
    items-per-page="10"
  >
    <template #item.video="{ item }">
      <NuxtLink :to="`/watch/${item.raw.id}`" class="d-flex py-2 text-decoration-none align-center">
        <v-img :src="item.raw.thumbnail" min-width="150" min-height="85" max-width="150" max-height="85" />
        <div>
          <div
            :class="[
              'font-weight-bold ml-2',
              $vuetify.theme.current.dark ? 'text-white' : 'text-black',
            ]"
          >
            {{ truncateText(item.raw.title, 85) }}
          </div>
          <div class="ml-2 text-caption text-disabled">
            {{ truncateText(item.raw.description, 160) }}
          </div>
        </div>
      </NuxtLink>
    </template>
    <template #item.visibility="{ item }">
      <v-icon class="mr-2" :color="item.raw.videoStatus === 'PUBLIC' ? 'green' : 'grey'" icon="mdi:mdi-eye" />
      {{ capitalize(item.raw.videoStatus) }}
    </template>
    <template #item.createdAt="{ item }">
      {{ formatDate(new Date(item.raw.createdAt), "D, MMM YYYY") }}
    </template>
    <template #item.views="{ item }">
      {{ formatNumberInInternationalSystem(item.raw.views) }}
    </template>
    <template #item.ratio="{ item }">
      <div>
        {{ `${calculateRatio(item.raw.likes, item.raw.dislikes)}%` }}
      </div>
      <div>{{ formatNumberInInternationalSystem(item.raw.likes) }} likes</div>
      <v-progress-linear
        v-if="calculateRatio(item.raw.likes, item.raw.dislikes) > 0"
        color="grey"
        :model-value="calculateRatio(item.raw.likes, item.raw.dislikes)"
        rounded
      />
    </template>
    <template #item.actions="{ item }">
      <v-icon
        icon="mdi:mdi-pencil"
        size="small"
        class="me-2"
        @click="emit('editVideo', item.raw.id)"
      />
      <v-icon
        icon="mdi:mdi-delete"
        size="small"
        @click="emit('deleteVideo', item.raw.id)"
      />
    </template>
    <template #bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="_props.totalPages"
        />
      </div>
    </template>
    <template #no-data>
      <v-btn color="primary" @click="emit('fetchVideos', 1)">
        Reset
      </v-btn>
    </template>
  </v-data-table-server>
</template>

<script lang='ts' setup>
import { useDisplay } from 'vuetify'
import { formatDate } from '@vueuse/core'
import { Video } from 'utils/model'
import { formatNumberInInternationalSystem, truncateText, capitalize, calculateRatio } from '@/utils/functions'

const emit = defineEmits(['fetchVideos', 'editVideo', 'deleteVideo'])

const _props = defineProps<{
  videos: Video[],
  totalItems: number,
  totalPages: number
}>()
const { smAndDown } = useDisplay()

const page = ref(1)
const headers = [
  {
    title: 'Video',
    align: 'start',
    sortable: false,
    key: 'video',
    minWidth: smAndDown.value ? '450px' : '600px',
    maxWidth: smAndDown.value ? '450px' : '600px'
  },
  {
    title: 'Visibility',
    align: 'center',
    sortable: false,
    key: 'visibility'
  },
  {
    title: 'Date',
    align: 'start',
    sortable: true,
    key: 'createdAt'
  },
  {
    title: 'Views',
    align: 'start',
    sortable: true,
    key: 'views'
  },
  {
    title: 'Likes (vs. dislikes)',
    align: 'center',
    minWidth: '200px',
    maxWidth: '200px',
    sortable: false,
    key: 'ratio'
  },
  {
    title: 'Actions',
    sortable: false,
    key: 'actions'
  }
]

watch(page, () => {
  emit('fetchVideos', page.value)
})
</script>
