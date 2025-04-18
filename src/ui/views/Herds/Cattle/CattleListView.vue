<script setup>
import { onMounted, ref } from 'vue'
import _ from 'lodash';
import { useVueTable, createColumnHelper, getCoreRowModel } from '@tanstack/vue-table';

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import { EyeIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';
import BaseTableTanStack from '@/components/Tables/BaseTableTanStack.vue'

import useCattle from "@/ui/composables/Herds/Cattle/useCattle.js";

const pageTitle = ref('Lista de ganado')
const searching = ref(false)

const {
  page,
  totalPages,
  searchQuery,
  cattleList,
  getAllCattle
} = useCattle();

// Helper para crear columnas
const columnHelper = createColumnHelper();

// Definición de columnas
const cattleListColumns = [
  columnHelper.accessor('tagNameNumber', {
    header: 'Nombre / Etiqueta',
    width: 20
  }),
  columnHelper.accessor('corral', {
    header: 'Corral actual',
    width: 20
  }),
  columnHelper.accessor('sex', {
    header: 'Sexo',
    width: 12
  }),
  columnHelper.accessor('breed', {
    header: 'Raza',
    width: 12
  }),
  columnHelper.accessor('acquisitionDate', {
    header: 'Fecha adquisición',
    width: 15
  }),
  columnHelper.accessor('status', {
    header: 'Estatus',
    width: 10
  }),
];

// Navegación entre páginas
const nextPage = async () => {
  searching.value = true
  page.value++;
  await getAllCattle(false);
  searching.value = false;
};

const previousPage = async () => {
  searching.value = true
  page.value--;
  await getAllCattle(false);
  searching.value = false
};

const searchCattle = async () => {
  searching.value = true
  page.value = 1;
  await getAllCattle(false);
  searching.value = false;
}
const debounceSearchQuery = _.debounce(searchCattle, 450);


onMounted(async () => {
  searching.value = true;
  await getAllCattle(false);
  searching.value = false;
})

</script>

<template>
  <div class="flex items-start justify-between py-1">
    <div class="flex justify-between items-center pb-2 space-x-5">
      <h2 class="text-title-md2 font-semibold text-black dark:text-white">
        {{ pageTitle }}
      </h2>
      <RouterLink class="flex justify-center items-center" :to="{name:'cattle-add'}">
        <ButtonDefault label="Añadir" customClasses="bg-primary/90 text-sm hover:opacity-95 text-white w-21 h-12 md:w-30 md:h-12 rounded-lg">
          <span>🐄</span>
        </ButtonDefault>
      </RouterLink>
    </div>
    <InputGroup
      v-model="searchQuery"
      type="text"
      placeholder="Buscar"
      customClasses="w-1/2 md:w-1/3"
      customInputClasses="border-gray-400/65"
      @update:model-value="debounceSearchQuery"
    />
  </div>

  <div class="overflow-auto w-full">
    <BaseTableTanStack
      :columns = cattleListColumns
      :withRowNumbers = true
      :data = cattleList
      :page = page
      :totalPages = totalPages
      :searching = searching
      :nextPage = nextPage
      :previousPage = previousPage
    >
      <template #actions="{row}">
        <td class="flex space-x-5 text-sm text-primary text-center">
            <router-link :to="{ name: 'cattle-detail', params: { id: row.original.id } }"><span class="cursor-pointer" title:="Ver detalle"><EyeIcon class="size-5"/></span></router-link>
            <router-link :to="{ name: 'cattle-update', params: { id: row.original.id } }"><span class="cursor-pointer" title:="Editar registro"><PencilSquareIcon class="size-5"/></span></router-link>
        </td>
      </template>
    </BaseTableTanStack>
  </div>

</template>
