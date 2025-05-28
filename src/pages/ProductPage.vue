
<template>
  <v-container>
    <v-row align="center" class="mb-4" justify="space-between">
      <v-col>
        <h2>Gerenciamento de Produtos</h2>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="abrirDialog()">Adicionar Produto</v-btn>
      </v-col>
    </v-row>

    <v-data-table
      class="elevation-1"
      :headers="headers"
      item-key="id"
      :items="produtos"
    >
      <template #item.imagem="{ item }">
        <v-img contain max-height="80" max-width="100" :src="item.imagem" />
      </template>
      <template #item.acoes="{ item }">
        <v-btn icon="$edit" variant="text" @click="abrirDialog(item)">
        </v-btn>
        <v-btn icon="$delete" variant="text" @click="excluirProduto(item.id)">
        </v-btn>
      </template>


    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ editando ? 'Editar Produto' : 'Adicionar Produto' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="formProduto" @submit.prevent="salvarProduto">
            <v-text-field
              v-model="form.nome"
              label="Nome"
              variant="outlined"
            />
            <v-text-field
              v-model="form.preco"
              label="Preço"
              type="number"
              variant="outlined"
              min="0"
              step="0.01"
              prefix="R$"
            />
            <v-text-field
              v-model="form.preco"
              label="Quantidade"
              type="number"
              variant="outlined"
              min="0"
            />
            <v-text-field
              v-model="form.imagem"
              label="URL da Imagem"
              type="url"
              variant="outlined"
              hint="Exemplo: https://exemplo.com/imagem.jpg"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="fecharDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="salvarProduto">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
</script>