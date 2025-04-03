<script setup>
import { onMounted, ref } from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseTableTanStack from '@/components/Tables/BaseTableTanStack.vue'

import { createColumnHelper } from '@tanstack/vue-table';

const pageTitle = ref('Vista example')

// Datos y paginación
const weightList = ref([
  { registerDate: '2024-01-15', weight: 450 },
  { registerDate: '2024-02-10', weight: 460 },
  { registerDate: '2024-03-05', weight: 470 },
  { registerDate: '2024-04-20', weight: 480 },
  { registerDate: '2024-05-18', weight: 490 },
]);
const isLoading = ref(false);
const page = ref(1);
const totalPages = ref(1);

// Columnas de la tabla
const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor('registerDate', { header: 'Fecha registro', width: 45 }),
  columnHelper.accessor('weight', { header: 'Peso', width: 45 }),
];

</script>

<template>
  <DefaultLayout>
    <div class="flex items-start justify-between py-1">
      <h2 class="text-title-md2 font-semibold text-black dark:text-white">
        {{ pageTitle }}
      </h2>
    </div>

    <BaseTableTanStack
      :data="weightList"
      :columns="columns"
      :isLoading="isLoading"
      :page="page"
      :totalPages="totalPages"
    />

  </DefaultLayout>
</template>
