<template>
  <v-layout class="h-screen">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="bg-deep-purple"
      :permanent="isDesktop"
      :temporary="!isDesktop"
      theme="dark"
    >
      <v-list-item
        class="mt-4"
        :title="userName"
        v-bind="userName === 'Maiara'
          ? { prependAvatar: userAvatar }
          : { prependIcon: 'mdi-account-circle'}"
      />


      <v-list dense nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          link
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
        />
      </v-list>

      <template #append>
        <div class="pa-2">
          <v-btn block variant="tonal" @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main style="overflow-y: auto; max-height: 100vh;">
      <v-app-bar app class="bg-deep-purple" flat theme="dark">
        <v-app-bar-nav-icon v-if="!isDesktop" @click="drawer = !drawer" />

        <v-toolbar-title
          v-if="route.path === '/profile'"
          class="font-weight-bold"
        >
          Conta
        </v-toolbar-title>

        <v-toolbar-title
          v-if="route.path === '/product'"
          class="font-weight-bold"
        >
          Gerenciamento de Produtos
        </v-toolbar-title>

        <v-spacer />

        <ThemeToggle />
      </v-app-bar>

      <slot />
    </v-main>
  </v-layout>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDisplay } from 'vuetify'
  import { logoutUser } from '@/api/api_login.js'

  const drawer = ref(true)
  const { lgAndUp } = useDisplay()
  const isDesktop = lgAndUp

  const router = useRouter()
  const route = useRoute()

  const userName = ref('User')
  const userAvatar = ref('https://github.com/maiarakothe.png')

  onMounted(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      userName.value = user.name || 'User'
      if (user.avatar) userAvatar.value = user.avatar
    }
  })

  const logout = async () => {
    try {
      await logoutUser()
      router.push('/')
    } catch (error) {
      alert('Erro ao fazer logout: ' + error.message)
    }
  }

  const menuItems = [
    { title: 'Home', icon: 'mdi-home', to: '/HomePage' },
    { title: 'Produtos', icon: 'mdi-package-variant-closed', to: '/product' },
    { title: 'Conta', icon: 'mdi-account-box', to: '/profile' },
  ]
</script>
