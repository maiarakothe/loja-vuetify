<template>
  <v-container
    class="fill-height d-flex align-center justify-center"
    style="max-width: 100%;"
  >
    <v-card
      class="pa-6"
      :max-width="$vuetify.display.smAndDown ? '95%' : '500'"
      width="100%"
    >
      <v-card-title class="text-h5 text-center">
        Cadastro do Administrador
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model="name"
            label="Nome"
            prepend-inner-icon="mdi-account-outline"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="email"
            label="E-mail"
            prepend-inner-icon="mdi-email-outline"
            type="email"
            variant="outlined"
          />
          <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            label="Senha"
            prepend-inner-icon="mdi-lock-outline"
            :type="visible ? 'text' : 'password'"
            variant="outlined"
            @click:append-inner="toggleVisibility"
          />
          <div class="d-flex flex-column align-center mt-4">
            <v-btn class="mb-2" color="primary" style="width: 150px;" type="submit">
              Cadastrar-se
            </v-btn>
            <v-btn variant="text" @click="goToLogin">
              Login
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { signupUser } from '@/api/api_signup.js'

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const visible = ref(false)

  const toggleVisibility = () => {
    visible.value = !visible.value
  }


  const register = async () => {
    if (!name.value.trim() || !email.value.trim() || !password.value.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const user = await signupUser(name.value, email.value, password.value)
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/homePage')
    } catch (error) {
      if (error.status === 409) {
        alert('Email ja está em uso!')
      } else {
        alert('Erro ao se cadastrar: ' + error.message)
      }
    }
  }

  const goToLogin = () => {
    router.push('/' )
  }
</script>
