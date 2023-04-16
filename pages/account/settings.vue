<template>
  <v-container>
    <SettingsConfirmationDialog v-if="confirmationDialog" :open="confirmationDialog" @close="confirmationDialog = false" />
    <h3 class="text-h5 text-center font-weight-bold">
      Your account
    </h3>
    <v-row class="mt-10" no-gutters justify-md="center">
      <v-col class="d-flex align-center flex-column" cols="12" md="3">
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
        <v-container>
          <v-alert class="pa-0" variant="outlined" color="error">
            <template #title>
              <div class="pa-2" style="width: 100%">
                <span class="font-weight-bold text-subtitle-1">Danger zone</span>
              </div>
            </template>
            <v-divider class="border-opacity-100" color="error" />
            <div class="pa-5 d-flex align-center flex-column">
              <v-btn class="mb-2" prepend-icon="mdi:mdi-delete" color="error" @click="confirmationDialog = true">
                Delete account
              </v-btn>
              <span>Warning: Your videos cannot be recovered after deleting your account.</span>
            </div>
          </v-alert>
        </v-container>
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
                  v-model="user.firstName"
                  :rules="[requiredRule]"
                  label="First name"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="user.lastName"
                  :rules="[requiredRule]"
                  label="Last name"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="user.username"
              label="Username"
              variant="outlined"
              readonly
              disabled
            />
            <v-text-field
              v-model="user.channelName"
              label="Channel name"
              variant="outlined"
              readonly
              disabled
            />
            <v-text-field
              v-model="user.email"
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

const { status, data, signOut } = useSession()
const sessionUser = data.value?.user as User

const user = ref({
  firstName: sessionUser.firstName,
  lastName: sessionUser.lastName,
  email: sessionUser.email,
  channelName: sessionUser.channelName,
  username: sessionUser.username,
  profileImage: sessionUser.profileImage
})

useHead({
  title: 'Settings - VidFlow'
})

const confirmationDialog = ref(false)
const validDetails = ref(false)
const validPassword = ref(false)
const show = ref(false)
const loadingDetails = ref(false)
const loadingPassword = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

async function handleSave () {
  if (status.value === 'authenticated') {
    const userDetails = {
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      email: user.value.email
    }
    await useFetch('/api/user/update', {
      method: 'PUT',
      body: userDetails,
      onRequest () {
        loadingDetails.value = true
      },
      onResponse () {
        setTimeout(() => {
          loadingDetails.value = false
          setTimeout(() => {
            signOut({ redirect: false })
            navigateTo('/login')
          }, 200)
        }, 1000)
      }
    })
  }
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
