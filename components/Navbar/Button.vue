<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <div class="my-auto" v-on="on" v-bind="attrs">
        <NuxtLink v-if="to !== undefined" :to="to">
          <v-btn class="mx-1" icon :small="$vuetify.breakpoint.xs">
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </NuxtLink>
        <v-btn v-else class="mx-1" icon :small="$vuetify.breakpoint.xs">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </div>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "Button",
  props: {
    icon: String,
    to: {
      type: String,
      required: false
    },
    tooltip: String
  }
};
</script>
