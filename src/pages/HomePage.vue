<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <h1 class="mb-6">Bem-vindo à Loja de Roupas</h1>
    <v-btn color="primary" large @click="goToProducts">
      Gerenciar Produtos
    </v-btn>
  </v-container>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goToProducts = () => {
    router.push('/product')
  }
</script>
