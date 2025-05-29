<template>
  <SideMenu>
    <div class="profile-wrapper">
      <div class="profile-container">
        <div v-if="user.name === 'Maiara'" class="image-wrapper">
          <img
            alt="Avatar"
            class="avatar-image"
            :src="user.avatar || defaultAvatar"
          >
        </div>

        <v-icon v-else color="gray" size="150">mdi-account-circle</v-icon>

        <h2>{{ user.name || 'Usuário' }}</h2>
        <p class="email">{{ user.email }}</p>

        <v-btn class="btn bg-deep-purple" @click="isDialogOpen = true">Editar perfil</v-btn>
      </div>
    </div>

    <v-dialog v-model="isDialogOpen" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h6">Alterar Senha</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="oldPassword"
            label="Senha antiga"
            type="password"
            variant="outlined"
          />
          <v-text-field
            v-model="newPassword"
            label="Nova senha"
            type="password"
            variant="outlined"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="isDialogOpen = false">Cancelar</v-btn>
          <v-btn color="deep-purple" @click="changePassword">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </SideMenu>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const user = ref({})
  const defaultAvatar = 'https://github.com/maiarakothe.png'

  const isDialogOpen = ref(false)
  const oldPassword = ref('')
  const newPassword = ref('')

  onMounted(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      user.value = JSON.parse(userData)
    } else {
      router.push('/')
    }
  })


</script>
<style scoped>
.profile-wrapper {
  display: flex;
  margin-top: 50px;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 40vw;
  height: 60%;
  justify-content: center;
  background-color:#EDE7F6;
  padding: 32px;
  border-radius: 12px;
}

.btn {
  margin-top: 30px;
}
.image-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.email {
  font-weight: 500;
  color: gray;
  margin-top: 4px;
}
</style>
