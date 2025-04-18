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
  warehouseStockPagination,
  getAllWarehouseStock
} = useWarehouseStock();

const searchStock = async () => {
  warehouseStockPagination.value.searching = true
  warehouseStockPagination.value.page = 1;
  await getAllWarehouseStock(false)
  warehouseStockPagination.value.searching = false
}
const debouncedSearchStock = _.debounce(searchStock, 500)

// Helper para crear columnas
const columnHelper = createColumnHelper();
// Definición de columnas
const warehouseStockListColumns = [
  columnHelper.accessor('foodType', {
    header: 'Nombre',
    width: 20
  }),
  columnHelper.accessor('quantity', {
    header: 'Cantidad (Unidades)',
    width: 20
  }),
  columnHelper.accessor('estimatedUnitPrice', {
    header: 'Precio estimado por unidad',
    width: 20
  }),
  columnHelper.accessor('estimatedStockValue', {
    header: 'Valor estimado',
    width: 20
  })
];

onMounted(async () => {
  warehouseStockPagination.value.searching = true
  await getAllWarehouseStock(false)
  warehouseStockPagination.value.searching = false
})

</script>

<template>
    <div class="flex items-start justify-between py-1">
      <div class="flex justify-between items-center pb-2 space-x-5">
        <h2 class="text-title-md2 font-semibold text-black dark:text-white">
          {{ pageTitle }}
        </h2>
        <RouterLink class="flex justify-center items-center" :to="{name: 'warehouse-add-entry'}">
            <ButtonDefault label="Registrar entrada" customClasses="bg-primary/90 text-sm hover:opacity-95 text-white w-21 h-12 md:w-30 md:h-12 rounded-lg">
                <span><svg class="fill-yellow-400" width="19" height="19" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 41c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L383 95c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l88-88zM305.5 27.3c-6.2-6.2-16.4-6.2-22.6 0L271.5 38.6c-37.5 37.5-37.5 98.3 0 135.8l10.4 10.4-30.5 30.5c-3.4-27.3-15.5-53.8-36.5-74.8l-11.3-11.3c-6.2-6.2-16.4-6.2-22.6 0l-11.3 11.3c-37.5 37.5-37.5 98.3 0 135.8l10.4 10.4-30.5 30.5c-3.4-27.3-15.5-53.8-36.5-74.8L101.8 231c-6.2-6.2-16.4-6.2-22.6 0L67.9 242.3c-37.5 37.5-37.5 98.3 0 135.8l10.4 10.4L9.4 457.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l68.9-68.9 12.2 12.2c37.5 37.5 98.3 37.5 135.8 0l11.3-11.3c6.2-6.2 6.2-16.4 0-22.6l-11.3-11.3c-21.8-21.8-49.6-34.1-78.1-36.9l31.9-31.9 12.2 12.2c37.5 37.5 98.3 37.5 135.8 0l11.3-11.3c6.2-6.2 6.2-16.4 0-22.6l-11.3-11.3c-21.8-21.8-49.6-34.1-78.1-36.9l31.9-31.9 12.2 12.2c37.5 37.5 98.3 37.5 135.8 0L486.5 231c6.2-6.2 6.2-16.4 0-22.6L475.2 197c-5.2-5.2-10.6-9.8-16.4-13.9L505 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-59.4 59.4c-20.6-4.4-42-3.7-62.3 2.1c6.1-21.3 6.6-43.8 1.4-65.3L409 41c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L329.1 52.9c-3.7-5-7.8-9.8-12.4-14.3L305.5 27.3z"/></svg></span>
            </ButtonDefault>
        </RouterLink>
      </div>
      <InputGroup
          v-model="warehouseStockPagination.searchQuery"
          type="text"
          placeholder="Buscar"
          customClasses="w-1/2 md:w-1/3"
          customInputClasses="border-gray-400/65"
          @update:model-value="debouncedSearchStock"
      />
    </div>

    <div class="overflow-auto w-full">
      <BaseTableTanStack
            :columns = "warehouseStockListColumns"
            :withHeader = true
            :withActions = false
            :withRowNumbers= true
            :data = "warehouseStockList"
            :page = "warehouseStockPagination.page"
            :totalPages = "warehouseStockPagination.totalPages"
            :searching = "warehouseStockPagination.searching"
      >
      
      </BaseTableTanStack>
    </div>

</template>