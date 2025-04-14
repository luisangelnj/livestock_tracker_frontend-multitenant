<script setup>
import { useVueTable, createColumnHelper, getCoreRowModel } from '@tanstack/vue-table';
import { onMounted, ref } from 'vue'
import _ from 'lodash';

import InputGroup from '@/components/Forms/InputGroup.vue'
import ProgressBarOne from '@/components/ProgressBar/ProgressBarOne.vue'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import BaseTableTanStack from '@/components/Tables/BaseTableTanStack.vue'
import { EyeIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';

import useWarehouseStock from "@/ui/composables/Warehouse/useWarehouseStock.js";

const pageTitle = ref('Inventario de Almacén')

const {
  warehouseStockList,
  warehouseStockPagination
} = useWarehouseStock();

// Helper para crear columnas
const columnHelper = createColumnHelper();

// Definición de columnas
const warehouseStockListColumns = [
  columnHelper.accessor('name', {
    header: 'Nombre',
    width: 20
  }),
  columnHelper.accessor('quantity', {
    header: 'Cantidad',
    width: 20
  }),
  columnHelper.accessor('estimatedUnitPrice', {
    header: 'Precio estimado por unidad',
    width: 20
  }),
  columnHelper.accessor('estimatedValue', {
    header: 'Valor estimado',
    width: 20
  })
];

onMounted(async () => {

})

</script>

<template>
    <div class="flex items-start justify-between py-1">
      <div class="flex justify-between items-center pb-2 space-x-5">
        <h2 class="text-title-md2 font-semibold text-black dark:text-white">
          {{ pageTitle }}
        </h2>
      </div>
      <InputGroup
          v-model="warehouseStockPagination.searchQuery"
          type="text"
          placeholder="Buscar"
          customClasses="w-1/2 md:w-1/3"
          customInputClasses="border-gray-400/65"
          @update:model-value="debounceSearchQuery"
      />
    </div>

    <div class="overflow-auto w-full">
      <BaseTableTanStack
            :columns = "warehouseStockListColumns"
            :withHeader = true
            :data = "warehouseStockList"
            :page = "warehouseStockPagination.page"
            :totalPages = "warehouseStockPagination.totalPages"
            :searching = "warehouseStockPagination.searching"
            :nextPage = "nextPage"
            :previousPage = "previousPage"
      >
      
      </BaseTableTanStack>
    </div>

</template>