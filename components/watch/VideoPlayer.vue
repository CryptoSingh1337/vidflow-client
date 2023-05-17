<template>
  <div class="d-flex justify-center bg-black">
    <div
      ref="player"
      class="player"
      style="width: 100% !important; height: 100% !important;"
    />
  </div>
</template>

<script lang='ts' setup>
import ArtPlayer from 'artplayer'

const player = ref(null)
const artPlayer = ref(null)

const props = defineProps<{
  src: string
  title: string
  thumbnail: string
}>()

const options = reactive({
  url: props.src,
  title: props.title,
  poster: props.thumbnail,
  volume: 0.5,
  isLive: false,
  muted: false,
  autoplay: false,
  pip: true,
  setting: true,
  loop: false,
  playbackRate: true,
  aspectRatio: true,
  fullscreen: true,
  fullscreenWeb: true,
  miniProgressBar: true,
  mutex: true,
  backdrop: true,
  playsInline: true,
  airplay: true,
  quality: [
    {
      default: true,
      html: '1080P',
      url: props.src
    },
    {
      html: '720P',
      url: `${removeFileExtension(props.src)}_720.${getFileExtension(props.src)}`
    },
    {
      html: '480P',
      url: `${removeFileExtension(props.src)}_480.${getFileExtension(props.src)}`
    },
    {
      html: '360P',
      url: `${removeFileExtension(props.src)}_360.${getFileExtension(props.src)}`
    }
  ]
})

onMounted(() => {
  nextTick(() => {
    artPlayer.value = new ArtPlayer({
      ...options,
      container: '.player'
    })
  })
})

onBeforeUnmount(() => {
  if (artPlayer.value && artPlayer.value.destroy) {
    artPlayer.value.destroy(false)
  }
})

defineExpose({
  player,
  options
})

function removeFileExtension (url: string) {
  return url.substring(0, url.lastIndexOf('.'))
}

function getFileExtension (url: string) {
  return url.substring(url.lastIndexOf('.') + 1).split('\\.')[0]
}
</script>

<style>
.player {
    aspect-ratio: 16/9;
}
</style>
