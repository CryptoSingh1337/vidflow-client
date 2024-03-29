<template>
  <v-layout full-height>
    <v-row class="mx-2 mx-sm-0" align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <GlobalHeader />
        <v-alert v-model="alert" class="my-4" variant="outlined" density="compact" type="error">
          {{ alertText }}
        </v-alert>
        <v-card variant="outlined">
          <v-card-title>Sign Up</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="firstName"
                    variant="outlined"
                    :rules="[requiredRule]"
                    label="First name"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="lastName"
                    variant="outlined"
                    :rules="[requiredRule]"
                    label="Last name"
                  />
                </v-col>
              </v-row>
              <v-text-field
                v-model="username"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                :rules="[requiredRule]"
                label="Username"
              />
              <v-text-field
                v-model="password"
                :type="show ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[requiredRule]"
                label="Enter your password"
                variant="outlined"
                @click:append-inner="show = !show"
              />
              <v-text-field
                v-model="channelName"
                variant="outlined"
                :rules="[requiredRule]"
                label="Channel name"
              />
              <v-text-field
                v-model="email"
                type="email"
                variant="outlined"
                :rules="[requiredRule, emailRule]"
                label="Email"
                @keyup.enter="register"
              />
              <div class="text-caption">
                <span>Having an account?</span>
                <NuxtLink class="text-decoration-none" to="/login">
                  <span class="ml-1">Login</span>
                </NuxtLink>
              </div>
              <v-card-actions class="px-0">
                <v-btn
                  block
                  variant="tonal"
                  color="primary"
                  size="x-large"
                  :loading="loader"
                  :disabled="!valid"
                  @click="register"
                >
                  Sign up
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang='ts' setup>
import { requiredRule, emailRule } from '@/utils/rules'

const alert = ref(false)
const alertText = ref('')
const valid = ref(false)
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')
const channelName = ref('')
const email = ref('')
const show = ref(false)
const loader = ref(false)

definePageMeta({ auth: false, layout: 'basic' })
useHead({
  title: 'Register - VidFlow'
})

function register () {
  loader.value = true
  const user = {
    username: username.value,
    password: password.value,
    channelName: channelName.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value
  }
  useFetch('/api/user/register', {
    method: 'POST',
    body: user,
    onResponse ({ response }) {
      if (response.status === 200) {
        navigateTo('/login')
      }
    },
    onResponseError ({ response }) {
      loader.value = false
      if (response.status !== 200) {
        alertText.value = response._data?.statusMessage
        alert.value = true
      }
    }
  })
  loader.value = false
}
</script>
