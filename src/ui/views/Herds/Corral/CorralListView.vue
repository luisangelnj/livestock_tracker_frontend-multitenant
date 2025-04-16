<script setup>
import { useVueTable, createColumnHelper, getCoreRowModel } from '@tanstack/vue-table';
import { onMounted, ref } from 'vue'
import _ from 'lodash';

import InputGroup from '@/components/Forms/InputGroup.vue'
import ProgressBarOne from '@/components/ProgressBar/ProgressBarOne.vue'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import BaseTableTanStack from '@/components/Tables/BaseTableTanStack.vue'
import { EyeIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';

import useCorral from "@/ui/composables/Herds/Corral/useCorral.js";

const pageTitle = ref('Listado de corrales')

const {
  corralPagination,
  corralsList,
  getAllCorrals
} = useCorral();


// Navegación entre páginas
const nextPage = async () => {
    corralPagination.value.searching = true
    corralPagination.value.page++;
    await getAllCorrals(false);
    corralPagination.value.searching = false
};

const previousPage = async () => {
    corralPagination.value.searching = true
    corralPagination.value.page--;
    await getAllCorrals(false);
    corralPagination.value.searching = false
};

const searchCorrals = async () => {
  corralPagination.value.searching = true
  corralPagination.value.page = 1;
  await getAllCorrals(false);
  corralPagination.value.searching = false;
}
const debouncedSearchCorral = _.debounce(searchCorrals, 500);


// Helper para crear columnas
const columnHelper = createColumnHelper();

// Definición de columnas
const corralsListColumns = [
  columnHelper.accessor('name', {
    header: 'Nombre',
    width: 20
  }),
  columnHelper.accessor('currentOccupancy', {
    header: 'Ocupación actual',
    width: 20
  }),
  columnHelper.accessor('location', {
    header: 'Ubicación o referencia',
    width: 20
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    width: 20
  })
];


onMounted(async () => {
  corralPagination.value.searching = true;
  await getAllCorrals(true);
  corralPagination.value.searching = false;
})

</script>

<template>
    <div class="flex items-start justify-between py-1">
      <div class="flex justify-between items-center pb-2 space-x-5">
        <h2 class="text-title-md2 font-semibold text-black dark:text-white">
          {{ pageTitle }}
        </h2>
        <RouterLink class="flex justify-center items-center" :to="{name: 'corral-add'}">
            <ButtonDefault label="Añadir" customClasses="bg-primary/90 text-sm hover:opacity-95 text-white w-21 h-12 md:w-30 md:h-12 rounded-lg">
                <span>🏠</span>
            </ButtonDefault>
        </RouterLink>
      </div>
      <InputGroup
          v-model="corralPagination.searchQuery"
          type="text"
          placeholder="Buscar"
          customClasses="w-1/2 md:w-1/3"
          customInputClasses="border-gray-400/65"
          @update:model-value="debouncedSearchCorral"
      />
    </div>

    <div class="overflow-auto w-full">
        <BaseTableTanStack
            :columns = "corralsListColumns"
            :withHeader = true
            :data = "corralsList"
            :page = "corralPagination.page"
            :totalPages = "corralPagination.totalPages"
            :searching = "corralPagination.searching"
            :nextPage = "nextPage"
            :previousPage = "previousPage"
        >
          <!-- Slot personalizado para currentOccupancy -->
          <template #cell-currentOccupancy="{ row }">
            <ProgressBarOne 
              :value="row.original.currentOccupancy" 
              :max="row.original.capacity"
              error="Libre"
            />
          </template>
          <template #actions="{ row }">
              <div class="flex space-x-5 px-6 text-sm text-primary text-center">
                <router-link :to="{ name: 'corral-detail', params: { id: row.original.id } }"><span class="cursor-pointer" title:="Ver detalle"><EyeIcon class="size-5"/></span></router-link>
                <router-link :to="{ name: 'corral-update', params: { id: row.original.id } }"><span class="cursor-pointer" title:="Editar registro"><PencilSquareIcon class="size-5"/></span></router-link>
              </div>
          </template>
        </BaseTableTanStack>
    </div>
</template>