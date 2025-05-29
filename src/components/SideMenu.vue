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
        prepend-avatar="https://github.com/maiarakothe.png"
        title="User"
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
          <v-btn block variant="tonal">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main style="overflow-y: auto; max-height: 100vh;">
      <v-app-bar app class="bg-deep-purple" flat theme="dark">
        <v-app-bar-nav-icon v-if="!isDesktop" @click="drawer = !drawer" />
      </v-app-bar>

      <slot />
    </v-main>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'

  const drawer = ref(true)
  const { lgAndUp } = useDisplay()
  const isDesktop = lgAndUp

  const menuItems = [
    { title: 'Home', icon: 'mdi-home', to: '/HomePage' },
    { title: 'Produtos', icon: 'mdi-package-variant-closed', to: '/product' },
    { title: 'Conta', icon: 'mdi-account-box', to: '/profile' },
  ]
</script>
