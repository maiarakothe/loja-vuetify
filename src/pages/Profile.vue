<template>
  <SideMenu>
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

      <v-btn>Editar perfil</v-btn>
    </div>
  </SideMenu>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const user = ref({})
  const defaultAvatar = 'https://github.com/maiarakothe.png'

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
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  text-align: center;
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
