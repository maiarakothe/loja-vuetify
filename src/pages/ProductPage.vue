<template>
  <SideMenu>
    <v-container>
      <v-row align="center" class="mb-4" justify="space-between">
        <v-col>
          <v-text-field
            v-model="searchQuery"
            append-inner-icon="mdi-magnify"
            density="compact"
            hide-details
            label="Pesquisar produto"
            :loading="loading"
            single-line
            variant="solo"
          />
        </v-col>
        <v-col cols="auto">
          <v-btn class="bg-deep-purple" @click="openDialog()">Adicionar Produto</v-btn>
        </v-col>
      </v-row>

      <v-data-table
        class="elevation-1"
        :headers="tableHeaders"
        item-key="id"
        :items="filteredProducts"
      >
        <template #headers>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </template>

        <template #item.url="{ item }">
          <v-img contain max-height="80" max-width="100" :src="item.url" />
        </template>
        <template #item.acoes="{ item }">
          <v-btn icon="$edit" variant="text" @click="openDialog(item)">
          </v-btn>
          <v-btn icon="$delete" variant="text" @click="deleteProductById(item.id)">
          </v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="isDialogOpen" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h6">{{ isEditing ? 'Editar Produto' : 'Adicionar Produto' }}</span>
          </v-card-title>

          <v-card-text>
            <v-form ref="productFormRef" @submit.prevent="saveProduct">
              <v-text-field
                v-model="productName"
                label="Nome"
                variant="outlined"
              />
              <v-text-field
                v-model="productPrice"
                label="Preço"
                prefix="R$"
                step="0.01"
                type="number"
                variant="outlined"
              />
              <v-select
                v-model="productCategory"
                chips
                :items="['Vestido', 'Calça', 'Camiseta']"
                label="Categoria"
                variant="outlined"
              />
              <v-text-field
                v-model="productQuantity"
                label="Quantidade"
                type="number"
                variant="outlined"
              />
              <v-text-field
                v-model="productUrl"
                hint="Exemplo: https://exemplo.com/imagem.jpg"
                label="URL da Imagem"
                type="url"
                variant="outlined"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="primary" @click="saveProduct">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </SideMenu>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { createProduct, deleteProduct, getAllProducts, updateProduct } from '@/api/api_product.js'
  import { computed } from 'vue'

  const productList = ref([])
  const isDialogOpen = ref(false)
  const isEditing = ref(false)
  const editingProductId = ref(null)

  const productName = ref('')
  const productPrice = ref(0)
  const productCategory = ref('')
  const productQuantity = ref(0)
  const productUrl = ref('')
  const searchQuery = ref('')


  const productFormRef = ref(null)

  const tableHeaders = [
    { text: 'Nome', value: 'name' },
    { text: 'Preço', value: 'value' },
    { text: 'Categoria', value: 'category_type' },
    { text: 'Quantidade', value: 'quantity' },
    { text: 'Imagem', value: 'url' },
    { text: 'Ações', value: 'acoes', sortable: false },
  ]

  const filteredProducts = computed(() => {
    if (!searchQuery.value) return productList.value
    return productList.value.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  function openDialog (product = null) {
    if (product) {
      isEditing.value = true
      editingProductId.value = product.id
      productName.value = product.name
      productPrice.value = product.value
      productCategory.value = product.category_type
      productQuantity.value = product.quantity
      productUrl.value = product.url
    } else {
      isEditing.value = false
      editingProductId.value = null
      productName.value = ''
      productPrice.value = 0
      productCategory.value = ''
      productQuantity.value = 0
      productUrl.value = ''
    }
    isDialogOpen.value = true
  }

  function closeDialog () {
    isDialogOpen.value = false
  }

  async function loadProducts () {
    try {
      const accountId = localStorage.getItem('accountId')
      if (!accountId) {
        alert('Conta não encontrada. Faça login novamente.')
        return
      }
      productList.value = await getAllProducts(Number(accountId))
    } catch (error) {
      alert('Erro ao carregar produtos: ' + error.message)
    }
  }

  async function saveProduct () {
    if (!productFormRef.value.validate()) return

    try {
      const accountId = localStorage.getItem('accountId')
      if (!accountId) {
        alert('Conta não encontrada. Faça login novamente.')
        return
      }

      if (isEditing.value && editingProductId.value !== null) {
        await updateProduct(
          editingProductId.value,
          productName.value,
          productCategory.value,
          productQuantity.value,
          productPrice.value,
          productUrl.value,
          Number(accountId)
        )
        await loadProducts()
        closeDialog()
        return
      }

      await createProduct(
        productName.value,
        productCategory.value,
        productQuantity.value,
        productPrice.value,
        productUrl.value,
        Number(accountId)
      )
      await loadProducts()
      closeDialog()
    } catch (error) {
      alert('Erro ao salvar produto: ' + error.message)
    }
  }

  async function deleteProductById (id) {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto?')
    if (!confirmDelete) return

    try {
      const accountId = localStorage.getItem('accountId')
      if (!accountId) {
        alert('Conta não encontrada. Faça login novamente.')
        return
      }
      await deleteProduct(id, Number(accountId))
      await loadProducts()
    } catch (error) {
      alert('Erro ao excluir produto: ' + error.message)
    }
  }

  onMounted(() => {
    loadProducts()
  })

</script>
