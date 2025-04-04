<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DatePickerOne from '@/components/Forms/DatePicker/DatePickerOne.vue'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import BaseTableTanStack from '@/components/Tables/BaseTableTanStack.vue'
import RegisterCattleWeightModal from '@/ui/components/RegisterCattleWeightModal.vue'
import { EyeIcon, TrashIcon } from '@heroicons/vue/24/solid';

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useVueTable, createColumnHelper, getCoreRowModel } from '@tanstack/vue-table';
import { useToast } from "vue-toastification";
import { useLoading } from 'vue-loading-overlay'

import useCattle from "@/ui/composables/Herds/Cattle/useCattle.js";
import useCattleWeight from "@/ui/composables/History/useCattleWeight.js";

const pageTitle = ref('Detalle de ganado')

const toast = useToast({
    timeout: 5000
});
const $loading = useLoading({
    color: '#007BFF'
});

const route = useRoute();

const {
  cattleModel,
  errors,
  getCattleDetail,
} = useCattle();

const {
  weightList,
  getAllWeightHistory,
  pagination: weightPagination,
  isRegisterWeightModalOpen,
  deleteWeight
} = useCattleWeight();

const handleRegisteredWeight = async () => {
  isRegisterWeightModalOpen.value = false;
  weightPagination.searching.value = true
  await getAllWeightHistory(false, cattleModel.value.id);
  weightPagination.searching.value = false
}

const handleDeleteWeight = async (weightId) => {
  if (!confirm('¿Estás seguro de que quieres borrar este registro de pesaje?')) return
  weightPagination.searching.value = true
  const success = await deleteWeight(false, weightId)
  if (success) {
    await getAllWeightHistory(false, cattleModel.value.id);
  }
  weightPagination.searching.value = false
}

// Helper para crear columnas
const columnHelper = createColumnHelper();

// Definición de columnas
const weightColumns = [
  columnHelper.accessor('registerDate', {
    header: 'Fecha de registro',
    width: 45
  }),
  columnHelper.accessor('weight', {
    header: 'Peso',
    width: 45
  })
];

// Navegación entre páginas
const nextWeightHistoryPage = async () => {
  weightPagination.searching.value = true
  weightPagination.page.value++;
  await getAllWeightHistory(false, cattleModel.value.id);
  weightPagination.searching.value = false
};

// Navegación entre páginas
const previousWeightHistoryPage = async () => {
  weightPagination.searching.value = true
  weightPagination.page.value--;
  await getAllWeightHistory(false, cattleModel.value.id);
  weightPagination.searching.value = false
};

onMounted(async () => {
  const loader = $loading.show()
  try {
    cattleModel.value.id = route.params.id;
    await getCattleDetail(false, cattleModel.value.id);
    await getAllWeightHistory(false, cattleModel.value.id);
  } catch (error) {
    toast.error('Ha ocurrido un error, intentalo en un momento')
    route.push({ name: 'cattle-list' });
  } finally {
    loader.hide()
  }
})

</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->
    <div class="flex justify-between items-center pb-2.5">
      <RouterLink class="flex justify-center items-center" :to="{name:'cattle-update', params: {id: cattleModel.id}}">
        <ButtonDefault label="Editar" customClasses="bg-primary/90 text-sm hover:opacity-95 text-white w-21 h-12 md:w-30 md:h-12 rounded-lg">
          <span>✍️</span>
        </ButtonDefault>
      </RouterLink>
    </div>
    <div class="grid grid-row-1 gap-1 sm:grid-cols-2">

      <div class="flex flex-col gap-9">
        <DefaultCard>
          
          <div class="p-6.5">
            <InputGroup
              v-model="cattleModel.tagNameNumber"
              label="Nombre / Etiqueta"
              type="text"
              customClasses="w-full mb-4.5"
              :customInputClasses="[{
                'border focus:border-pink-500 enabled:border-pink-500 border-pink-500 ring-pink-500': errors.tagNameNumber
              }]"
              :errorText="errors.tagNameNumber"
              isDisabled
            />

            <div class="mb-7 flex flex-col gap-6 xl:flex-row">
              <InputGroup
                v-model="cattleModel.sex"
                label="Sexo"
                type="text"
                customClasses="w-full xl:w-1/2"
                isDisabled
              />
              <InputGroup
                v-model="cattleModel.breed"
                label="Raza"
                type="text"
                customClasses="w-full xl:w-1/2"
                isDisabled
              />
            </div>


            <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <DatePickerOne
                customClasses="w-full xl:w-1/2"
                label="Fecha de nacimiento"
                placeholder=""
                v-model="cattleModel.birthDate"
                isDisabled
              />

              <InputGroup
                v-model="cattleModel.initialWeight"
                label="Peso inicial (Kg)"
                type="text"
                customClasses="w-full xl:w-1/2"
                isDisabled
              />
            </div>

          </div>

        </DefaultCard>
      </div>

      <div class="flex flex-col gap-9">
        <DefaultCard>
          
            <div class="p-6.5">
              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <DatePickerOne
                  customClasses="w-full xl:w-1/2 mb-4.5"
                  label="Fecha de adquisición"
                  v-model="cattleModel.acquisitionDate"
                  isDisabled
                />

                <InputGroup
                  v-model="cattleModel.purchaseCost"
                  label="Costo de adquisición ($)"
                  type="text"
                  customClasses="w-full xl:w-1/2"
                  isDisabled
                />
              </div>

              <div class="mb-6">
                <label class="mb-2.5 block text-black dark:text-white"> Notas iniciales </label>
                <textarea
                  rows="4"
                  v-model="cattleModel.initialNotes"
                  class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  disabled
                ></textarea>
              </div>

            </div>

        </DefaultCard>
      </div>

      <div class="flex flex-col gap-9 sm:col-span-2">
        <DefaultCard cardTitle="Fotos y Documentos">
          <div class="text-center min-h-20">
          </div>
        </DefaultCard>
      </div>

      <div class="flex flex-col gap-9">
        <DefaultCard cardTitle="Historial de pesaje" buttonTitle="Registrar" @button-clicked="isRegisterWeightModalOpen=true">
          <div class="text-center min-h-30 pb-1 pe-1">
            <BaseTableTanStack
              v-if="weightList.length > 0"
              :columns = "weightColumns"
              :withHeader = false
              :data = "weightList"
              :page = "weightPagination.page.value"
              :totalPages = "weightPagination.totalPages.value"
              :searching = "weightPagination.searching.value"
              :nextPage = "nextWeightHistoryPage"
              :previousPage = "previousWeightHistoryPage"
            >
              <template #actions="{ row }">
                  <div class="flex justify-center space-x-2">
                      <button @click="handleDeleteWeight(row.original.id)" class="text-red-500 hover:underline">
                          <TrashIcon title="Eliminar" class="size-5" />
                      </button>
                  </div>
              </template>
            </BaseTableTanStack>
            <p class="py-5 font-medium" v-else>No hay registros</p>
          </div>
          <RegisterCattleWeightModal
            v-model="isRegisterWeightModalOpen"
            @weight-registered="handleRegisteredWeight"
            @closed="isRegisterWeightModalOpen=false"
            :cattleId="Number(cattleModel.id)"
          />
        </DefaultCard>
      </div>

      <div class="flex flex-col gap-9">
        <DefaultCard cardTitle="Historial médico">
          <div class="text-center min-h-30">
          </div>
        </DefaultCard>
      </div>

    </div>
  </DefaultLayout>
</template>
