<template>
  <div id="Qapp" style="min-height: 100vh;">
  <div class="Qpa-md" style="max-width: 400px;padding: 14px;">

    <QForm
      @submit="submit"
      @reset="reset"
      class="Qgutter-md"
    >     
      <QInput
        filled
        type="email"
        ref="mail"
        v-model="email"
        label="Your e-mail *"
      ></QInput>
      <QInput
        filled
        type="password"
        v-model="password"
        label="Your password *"
      ></QInput>      
      <div>
        <QBtn label="Submit" type="submit" color="primary"></QBtn>
        <QBtn label="Reset" type="reset" color="primary" flat class="Qml-sm"></QBtn>
      </div>
    </QForm>
    <div v-if="errMsg" style="font-size: 16px; color: red;">
        {{errMsg}}
    </div>

  </div>
</div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router' 
  import { useAuthStore } from '../stores';
  const email = ref('')
  const password = ref('')
  const errMsg = ref('') 
  const router = useRouter() 
  const authStore = useAuthStore()  
  const submit = async () => {
      await authStore.login(email.value, password.value)
      if(authStore.$state.error) {
        errMsg.value = authStore.$state.error
      } else {
        router.push('/')
      }
  }
  const reset = () => {
    email.value = ''
    password.value = ''
    authStore.resetError()
  }
</script>