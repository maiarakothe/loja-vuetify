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

        <v-col cols="12" md="4" sm="6">
          <v-card class="pa-4" outlined style="cursor: pointer;" @click="dialog = true">
            <v-icon color="red" size="36">mdi-alert-circle</v-icon>
            <div class="mt-2">Itens com quantidade baixa</div>
            <div class="text-h6 font-weight-bold">{{ lowStockCount }}</div>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-4" />
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title class="headline">Produtos com quantidade baixa</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(product, index) in lowStockProducts"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ product.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Quantidade: {{ product.quantity }} | Categoria: {{ product.category_type }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <div v-if="lowStockProducts.length === 0" class="text-subtitle-2 mt-2">
              Nenhum produto com quantidade baixa.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="red" text @click="dialog = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-container>
  </SideMenu>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { getAllProducts } from '@/api/api_product.js'

  const products = ref([])

  const totalProducts = computed(() => products.value.length)

  const dialog = ref(false)

  const lowStockProducts = computed(() => {
    return products.value.filter(product => (product.quantity || 0) < 5)
  })

  const lowStockCount = computed(() => {
    return lowStockProducts.value.length
  })

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
