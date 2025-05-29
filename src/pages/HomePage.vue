<template>
  <SideMenu>
    <h1 class="mb-6">Bem-vindo à Loja de Roupas</h1>
    <v-btn color="primary" large @click="goToProducts">
      Gerenciar Produtos
    </v-btn>
    </SideMenu>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import SideMenu from '@/components/SideMenu.vue'

  const router = useRouter()

  const goToProducts = () => {
    router.push('/product')
  }
</script>
