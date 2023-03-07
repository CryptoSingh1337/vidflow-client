<template>
  <v-dialog v-model="open" :max-width="$vuetify.display.smAndUp ? '50%' : '95%'">
    <v-card>
      <v-card-title style="border-bottom: grey solid 1px;">
        Edit
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="4">
            <v-container>
              <h4 class="mb-2">
                Thumbnail
              </h4>
              <v-img
                class="mx-auto rounded-lg"
                :src="thumbnail"
                aspect-ratio="16/9"
                min-width="100%"
                min-height="100%"
                max-width="100%"
                max-height="100%"
                alt="Thumbnail"
              />
              <div class="my-2">
                <span class="text-subtitle font-weight-bold">Thumbnail: </span> <a :href="thumbnail" target="_blank">{{ thumbnail }}</a>
              </div>
            </v-container>
          </v-col>
          <v-col class="d-flex align-center" cols="12" sm="12" md="8">
            <v-container class="pa-0">
              <v-form v-model="valid" class="rounded">
                <v-alert v-model="alert" class="mb-3" variant="outlined" density="compact" type="error">
                  {{ alertText }}
                </v-alert>
                <v-text-field
                  v-model="title"
                  label="Title *"
                  variant="filled"
                  :rules="[requiredRule, titleRule]"
                  counter
                  maxlength="100"
                />
                <v-textarea
                  v-model="description"
                  label="Description *"
                  variant="filled"
                  :rules="[requiredRule, descriptionRule]"
                  counter
                  maxlength="500"
                />
                <v-select
                  v-model="videoStatus"
                  label="Video Status *"
                  variant="filled"
                  :rules="[requiredRule]"
                  :items="videoStatusEnum"
                />
                <v-container class="pa-0">
                  <h4 class="mb-2">
                    Tags
                  </h4>
                  <v-row align="center" justify="start" no-gutters>
                    <v-chip v-for="(t, index) in tags" :key="index" closable class="mx-1 mb-3 mt-1" @click:close="tags.splice(index, 1)">
                      {{ t }}
                    </v-chip>
                    <v-col cols="12" class="pa-0">
                      <v-text-field
                        v-model="tag"
                        label="Add Tag"
                        variant="filled"
                        :disabled="tags.length >= 5"
                        @keyup.enter.prevent="addTag"
                        @keyup.tab.prevent="addTag"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-file-input
                  v-model="thumbnailFile"
                  show-size
                  counter
                  accept="image/*"
                  label="Change thumbnail"
                  prepend-icon=""
                  prepend-inner-icon="mdi:mdi-image"
                  :rules="[requiredFileRule, thumbnailSizeRule, thumbnailTypeRule]"
                />
              </v-form>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="handleSave">
          Save
        </v-btn>
        <v-btn color="secondary" @click="emit('close'); open = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts' setup>
import { requiredRule, titleRule, descriptionRule, thumbnailSizeRule, thumbnailTypeRule } from '@/utils/rules'

const props = defineProps<{
  open: boolean
  id: string
  title: string
  description: string
  videoStatus: string
  tags: string[]
  thumbnail: string
}>()

const open = ref(props.open)
const alert = ref(false)
const valid = ref(false)
const alertText = ref('')
const title = ref(props.title)
const description = ref(props.description)
const videoStatus = ref(props.videoStatus)
const videoStatusEnum = ref(['PRIVATE', 'UNLISTED', 'PUBLIC'])
const tag = ref('')
const tags = ref<string[]>(props.tags)
const thumbnail = ref(props.thumbnail)
const thumbnailFile = ref<File[]>([])

const emit = defineEmits(['close'])

function addTag () {
  if (tag.value.trim() !== '') {
    tags.value.push(tag.value.trim())
  }
  tag.value = ''
}

function handleSave () {
  const thumbnail = thumbnailFile.value[0]
  const payload = {
    id: props.id,
    title: title.value,
    description: description.value,
    videoStatus: videoStatus.value,
    tags: tags.value.length > 0 ? tags.value : null,
    thumbnail: null as any
  }
  if (thumbnail && validateThumbnail()) {
    payload.thumbnail = thumbnail
  }
  console.log(payload)

  setTimeout(() => {
    emit('close')
    open.value = false
  }, 2000)
}

function validateThumbnail () {
  let error = ''
  const file = thumbnailFile.value[0]
  if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg')) {
    error = 'Unsupported thumbnail format'
  }
  if (error.length > 0) {
    alertText.value = error
    alert.value = true
    return false
  }
  return true
}
</script>
