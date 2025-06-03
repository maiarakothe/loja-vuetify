<template>
  <SideMenu>
    <v-container>

      <v-row>
        <v-col cols="12" md="4" sm="6">
          <v-card class="pa-4" outlined>
            <v-icon color="deep-purple" size="36">mdi-package-variant</v-icon>
            <div class="mt-2">Total de Produtos</div>
            <div class="text-h6 font-weight-bold">{{ totalProducts }}</div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-card class="pa-4" outlined>
            <v-icon color="green" size="36">mdi-currency-brl</v-icon>
            <div class="mt-2">Valor Total</div>
            <div class="text-h6 font-weight-bold">R$ {{ totalValue.toFixed(2) }}</div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-card class="pa-4" outlined>
            <v-icon color="blue" size="36">mdi-format-list-bulleted-type</v-icon>
            <div class="mt-2">Categorias</div>
            <div class="text-h6 font-weight-bold">{{ uniqueCategories.length }}</div>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

    </v-container>
  </SideMenu>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { getAllProducts } from '@/api/api_product.js'

  const products = ref([])

  const totalProducts = computed(() => products.value.length)

  const totalValue = computed(() => {
    return products.value.reduce((total, product) => {
      const price = product.value || 0
      const quantity = product.quantity || 0
      return total + (price * quantity)
    }, 0)
  })

  const uniqueCategories = computed(() => {
    const categories = products.value.map(product => product.category_type)
    return [...new Set(categories)]
  })

  async function loadProducts () {
    try {
      const accountId = localStorage.getItem('accountId')
      if (!accountId) {
        alert('Conta não encontrada. Faça login novamente.')
        return
      }
      products.value = await getAllProducts(Number(accountId))
    } catch (error) {
      alert('Erro ao carregar produtos: ' + error.message)
    }
  }

  onMounted(() => {
    loadProducts()
  })
</script>
