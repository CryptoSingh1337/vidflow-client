<template>
  <v-container>
    <h3 class="text-h5 text-center font-weight-bold">
      Your account
    </h3>
    <v-row class="mt-10" no-gutters justify-md="center">
      <v-col class="d-flex justify-center" cols="12" md="3">
        <v-avatar
          class="user-avatar"
          :size="$vuetify.display.xs ? '100px' : '150px'"
        >
          <v-img
            :max-width="$vuetify.display.xs ? '75px' : '112.5px'"
            :max-height="$vuetify.display.xs ? '75px' : '112.5px'"
            :src="user.profileImage"
          />
        </v-avatar>
      </v-col>
      <v-divider v-if="$vuetify.display.mdAndUp" vertical />
      <v-col
        :class="$vuetify.display.mdAndUp ? 'ml-8' : 'mt-10'"
        cols="12"
        md="4"
      >
        <v-container>
          <v-form ref="form" v-model="validDetails">
            <v-row class="my-2">
              <v-col cols="6">
                <v-text-field
                  v-model="firstName"
                  :rules="[requiredRule]"
                  label="First name"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="lastName"
                  :rules="[requiredRule]"
                  label="Last name"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="username"
              label="Username"
              variant="outlined"
              readonly
              disabled
            />
            <v-text-field
              v-model="channelName"
              label="Channel name"
              variant="outlined"
              readonly
              disabled
            />
            <v-text-field
              v-model="email"
              class="my-2"
              :rules="[requiredRule, emailRule]"
              label="Email"
              variant="outlined"
            />
            <v-btn :loading="loadingDetails" :disabled="!validDetails" @click="handleSave">
              Save
            </v-btn>
          </v-form>
          <v-divider class="my-7" />
          <div class="">
            <h3 class="text-h5 text-center font-weight-bold mb-5">
              Password
            </h3>
          </div>
          <v-form v-model="validPassword">
            <v-text-field
              v-model="oldPassword"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off'"
              :rules="[requiredRule]"
              label="Enter your old password"
              variant="outlined"
              @click:append="show = !show"
            />
            <v-text-field
              v-model="newPassword"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off'"
              :rules="[requiredRule]"
              label="Enter your new password"
              variant="outlined"
              @click:append="show = !show"
            />
            <v-text-field
              v-model="confirmPassword"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off'"
              :rules="[requiredRule]"
              label="Confirm your new password"
              variant="outlined"
              @click:append="show = !show"
            />
            <v-btn :loading="loadingPassword" :disabled="!validPassword" @click="handleChangePassword">
              Change password
            </v-btn>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts' setup>
import { User } from 'utils/model'
import { requiredRule, emailRule } from '@/utils/rules'

const user = useNuxtApp().$auth.data.value?.user as User

useHead({
  title: 'Settings - VidFlow'
})

const validDetails = ref(false)
const validPassword = ref(false)
const show = ref(false)
const loadingDetails = ref(false)
const loadingPassword = ref(false)
const firstName = ref(user.firstName)
const lastName = ref(user.lastName)
const username = ref(user.username)
const channelName = ref(user.channelName)
const email = ref(user.email)
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

function handleSave () {
  console.log('Details saving...')
}

function handleChangePassword () {
  console.log('Changing password...')
}
</script>

<style scoped>
.user-avatar {
  border: 1.1px grey solid !important;
}
</style>
