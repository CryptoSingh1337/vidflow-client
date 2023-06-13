<template>
  <v-layout full-height>
    <v-row class="mx-2 mx-sm-0" align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <GlobalHeader />
        <v-alert v-model="alert" class="my-4" variant="outlined" density="compact" type="error">
          {{ alertText }}
        </v-alert>
        <v-card variant="outlined">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="uname"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                :rules="[
                  v => !!v || 'Required.'
                ]"
                label="Enter your username"
              />
              <v-text-field
                v-model="pass"
                :type="show ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  v => !!v || 'Required.'
                ]"
                label="Enter your password"
                variant="outlined"
                @click:append-inner="show = !show"
                @keyup.enter="handleLogin"
              />
              <div class="text-caption d-flex justify-space-between">
                <NuxtLink class="text-decoration-none" to="/forgot">
                  <span>Forgot your password?</span>
                </NuxtLink>
                <span>No account?
                  <NuxtLink class="text-decoration-none" to="/register">Sign Up</NuxtLink></span>
              </div>
              <v-card-actions class="px-0">
                <v-btn
                  block
                  variant="tonal"
                  color="primary"
                  size="x-large"
                  :loading="loader"
                  :disabled="!valid"
                  @click="handleLogin"
                >
                  Login
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
const alert = ref(false)
const alertText = ref('')
const uname = ref('')
const pass = ref('')
const valid = ref(false)
const loader = ref(false)
const show = ref(false)
const { signIn } = useSession()

definePageMeta({ auth: false, layout: 'basic' })
useHead({
  title: 'Login - VidFlow'
})

async function handleLogin () {
  loader.value = true
  const { error } = await signIn('credentials', { username: uname.value, password: pass.value, redirect: false })
  if (error) {
    alert.value = true
    loader.value = false
    alertText.value = 'Invalid username/password'
  } else {
    return navigateTo('/')
  }
}
</script>
