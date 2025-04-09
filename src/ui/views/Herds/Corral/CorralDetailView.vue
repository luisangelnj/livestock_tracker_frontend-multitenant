<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import BaseTableTanStack from '@/components/Tables/BaseTableTanStack.vue'

import { createColumnHelper } from '@tanstack/vue-table';
import { onMounted, ref } from 'vue'
import { useToast } from "vue-toastification";
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { useLoading } from 'vue-loading-overlay'

import useCorral from "@/ui/composables/Herds/Corral/useCorral.js";

const pageTitle = ref('Detalle de corral')

const router = useRouter()
const route = useRoute();

const toast = useToast({
    timeout: 5000
});

const $loading = useLoading({
    color: '#007BFF'
});

const {
  corralModel,
  corralCattleList,
  corralCattlePagination,
  errors,
  getCorralDetail,
  getCorralCattleList,
} = useCorral();


// Helper para crear columnas
const columnHelper = createColumnHelper();

// Definición de columnas
const corralCattleListColumns = [
  columnHelper.accessor('tagNameNumber', {
    header: 'Nombre / Etiqueta',
    width: 15
  }),
  columnHelper.accessor('sex', {
    header: 'Sexo',
    width: 15
  }),
  columnHelper.accessor('breed', {
    header: 'Raza',
    width: 15
  }),
  columnHelper.accessor('acquisitionDate', {
    header: 'Fecha adquisición',
    width: 15
  }),
  columnHelper.accessor('status', {
    header: 'Estatus',
    width: 15
  }),
];

// Navegación entre páginas
const corralCattleListNextPage = async () => {
  corralCattlePagination.value.searching = true
  corralCattlePagination.value.page++;
  await getCorralCattleList(false);
  corralCattlePagination.value.searching = false
};

const corralCattleListPreviousPage = async () => {
  corralCattlePagination.value.searching = true
  corralCattlePagination.value.page--;
  await getCorralCattleList(false);
  corralCattlePagination.value.searching = false
};


onMounted(async () => {
  const loader = $loading.show()
  try {
    corralModel.value.id = route.params.id;
    await getCorralDetail(false, corralModel.value.id);
    await getCorralCattleList(false, corralModel.value.id)
  } catch (error) {
    toast.error('Ha ocurrido un error, intentalo en un momento')
    // router.push({ name: 'corrals-list' });
  } finally {
    loader.hide()
  }
})

</script>

<template>
  <!-- Breadcrumb Start -->
  <BreadcrumbDefault :pageTitle="pageTitle" />
  <!-- Breadcrumb End -->
  <div class="flex justify-between items-center pb-2.5">
    <RouterLink class="flex justify-center items-center" :to="{name:'corral-update', params: {id: corralModel.id}}">
      <ButtonDefault label="Editar" customClasses="bg-primary/90 text-sm hover:opacity-95 text-white w-21 h-12 md:w-30 md:h-12 rounded-lg">
        <span>✍️</span>
      </ButtonDefault>
    </RouterLink>
  </div>

  <div class="grid grid-row-1 gap-1 sm:grid-cols-2">
    
    <div class="flex flex-col gap-9">
      <DefaultCard>

          <div class="p-6.5 space-y-4.5">
            <InputGroup
              v-model="corralModel.name"
              label="Nombre del corral"
              type="text"
              isDisabled
              customClasses="w-full"
              :customInputClasses="[{
                'border focus:border-pink-500 enabled:border-pink-500 border-pink-500 ring-pink-500': errors.name
              }]"
              :errorText="errors.name"
            />

            <InputGroup
                v-model="corralModel.location"
                label="Ubicación o referencia"
                isDisabled
                type="text"
                customClasses="w-full"
            />

            <div class="mb-6">
              <label class="mb-2.5 font-medium text-sm block text-black dark:text-white">Descripción</label>
              <textarea
                disabled
                rows="4"
                v-model="corralModel.description"
                class="resize-none w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
            </div>

          </div>

      </DefaultCard>
    </div>

    <div class="flex flex-col gap-9">
      <DefaultCard>
        
          <div class="p-6.5 space-y-4.5">
            <InputGroup
              v-model="corralModel.capacity"
              label="Capacidad máxima del corral"
              type="number"
              isDisabled
              customClasses="w-full"
            />
            <InputGroup
              v-if="corralModel.currentOccupancy > 0"
              v-model="corralModel.currentOccupancy"
              label="Ocupación actual del corral"
              type="number"
              isDisabled
              customClasses="w-full"
            />
          </div>

      </DefaultCard>
    </div>

    <div class="flex flex-col gap-9 sm:col-span-2">
      <DefaultCard cardTitle="Ganado activo en el corral">
        <div class="text-center min-h-20">
          <BaseTableTanStack
            :columns = "corralCattleListColumns"
            :withHeader = true
            :data = "corralCattleList"
            :page = "corralCattlePagination.page"
            :totalPages = "corralCattlePagination.totalPages"
            :searching = "corralCattlePagination.searching"
            :nextPage = "corralCattleListNextPage"
            :previousPage = "corralCattleListPreviousPage"
          >
          </BaseTableTanStack>
        </div>
      </DefaultCard>
    </div>

  </div>

</template>
