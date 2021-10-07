<template>
  <v-snackbar
    app
    :value="model"
    :color="type"
    top
    timeout="2000"
    transition="scale-transition"
    ><v-icon color="red">{{ icon }}</v-icon>
    <div class="Subtitle-2 d-inline">
      {{ text }}
    </div></v-snackbar
  >
</template>

<script>
export default {
  props: {
    model: Boolean,
    icon: String,
    type: String,
    text: String,
  },
};
</script>