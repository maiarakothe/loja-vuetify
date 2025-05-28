<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <h1 class="mb-6">Bem-vindo à Loja de Roupas</h1>
    <v-btn color="primary" large @click="irParaProdutos">
      Gerenciar Produtos
    </v-btn>
  </v-container>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const irParaProdutos = () => {
    router.push('/product')
  }
</script>
