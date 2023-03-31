<template>
  <v-dialog v-model="open" :max-width="$vuetify.display.smAndUp ? '30%' : '95%'">
    <v-card>
      <v-card-title style="border-bottom: grey solid 1px;">
        Delete
      </v-card-title>
      <v-card-text>
        <v-layout align="center" justify="center">
          <v-icon class="mr-2" icon="mdi:mdi-information" />
          <span>Are you sure you want to delete your account?</span>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary" @click="emit('close'); open = false">
          Close
        </v-btn>
        <v-btn color="error" @click="handleDelete">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts' setup>
const props = defineProps<{
  open: boolean
}>()
const { $auth } = useNuxtApp()
const emit = defineEmits(['close'])

const open = ref(props.open)

async function handleDelete () {
  await useFetch('/api/user/deleteUser', {
    method: 'DELETE',
    onResponse () {
      $auth.signOut({ redirect: false })
      navigateTo('/')
    }
  })
}
</script>
