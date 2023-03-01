<template>
  <v-data-table :headers="headers" :items="_props.videos">
    <template #item.video="{ item }">
      <NuxtLink :to="`/watch/${item.raw.id}`" class="d-flex py-2 text-decoration-none align-center">
        <v-img :src="item.raw.thumbnail" min-width="150" min-height="85" max-width="150" max-height="85" />
        <div>
          <div
            :class="[
              'text-caption font-weight-bold ml-2 mb-1',
              $vuetify.theme.current.dark ? 'text-white' : 'text-black',
            ]"
          >
            {{ minify(item.raw.title) }}
          </div>
          <div class="text-caption ml-2 text-grey">
            {{ minifyDescription(item.raw.description) }}
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
      {{ numberfy(item.raw.views) }}
    </template>
    <template #item.ratio="{ item }">
      <div>
        {{ `${calculateRatio(item.raw.likes, item.raw.dislikes)}%` }}
      </div>
      <div>{{ numberfy(item.raw.likes) }} likes</div>
      <v-progress-linear
        v-if="calculateRatio(item.raw.likes, item.raw.dislikes) > 0"
        color="grey"
        :model-value="calculateRatio(item.raw.likes, item.raw.dislikes)"
        rounded
      />
    </template>
    <template #item.operations="{ item }">
      <div class="d-flex">
        <v-menu location="bottom">
          <template #activator="{ props }">
            <v-icon class="mx-2" icon="mdi:mdi-dots-vertical" v-bind="props" />
          </template>
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-pencil" title="Edit" @click="handleEdit(item.raw.id)" />
            <v-list-item prepend-icon="mdi-delete" title="Delete" @click="handleDelete(item.raw.id)" />
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-data-table>
</template>

<script lang='ts' setup>
import { useDisplay } from 'vuetify'
import { formatDate } from '@vueuse/core'
import { Video } from 'utils/model'

const _props = defineProps<{
  videos: Video[]
}>()
const { smAndDown } = useDisplay()
const page = ref(0)

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
    title: '',
    sortable: false,
    key: 'operations'
  }
]

function minify (text: string) {
  if (text.length < 85) { return text }
  return `${text.substring(0, 85)}...`
}
function minifyDescription (text: string) {
  if (text.length < 160) { return text }
  return `${text.substring(0, 160)}...`
}
function capitalize (text: string) {
  return `${text.substring(0, 1)}${text.substring(1).toLowerCase()}`
}
function numberfy (views: number) {
  return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function calculateRatio (likes: number, dislikes: number) {
  if (likes === 0) {
    return 0
  }
  return Number(((likes / (likes + dislikes)) * 100).toFixed(2))
}

function handleEdit (id: string) {
  console.log('Edit', id)
}

function handleDelete (id: string) {
  console.log('Delete', id)
}
</script>
