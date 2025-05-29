<template>
  <SideMenu>
    <div class="profile-container">
      <v-avatar class="mb-4" size="120">
        <img
          alt="Avatar"
          :src="user.avatar || defaultAvatar"
          style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
        >
      </v-avatar>
      <h2>{{ user.name || 'Usuário' }}</h2>
      <p class="email">{{ user.email }}</p>
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

.email {
  font-weight: 500;
  color: gray;
  margin-top: 4px;
}
</style>
