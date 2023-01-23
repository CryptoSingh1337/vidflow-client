<template>
  <div class="d-flex justify-center bg-black">
    <div ref="player" class="player mx-auto" style="width: 60%; height: 50%;" />
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
  airplay: true
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
</script>

<style>
.player {
    aspect-ratio: 16/9;
}
</style>
