<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DatePickerOne from '@/components/Forms/DatePicker/DatePickerOne.vue'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';

import { onMounted, ref } from 'vue'
import { useToast } from "vue-toastification";
import { useRoute } from 'vue-router';

import useCattle from "@/ui/composables/Herds/Cattle/useCattle.js";

const pageTitle = ref('Detalle de ganado')

const toast = useToast({
    timeout: 5000
});

const route = useRoute();

const {
  cattleModel,
  errors,
  addCattle,
  getCattleDetail,
} = useCattle();

const handleAddWeight = () => {
  console.log('se intentó registrar un pesaje');
}

const handleAddMedicineShot = () => {
  console.log('se intentó registrar un shot de medicina');
  
}

onMounted(async () => {
  const cattleId = route.params.id;
  await getCattleDetail(cattleId);
})

</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->
    <div class="flex justify-between items-center pb-2.5">
      <RouterLink class="flex justify-center items-center" to="#">
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
              placeholder="Ingresa el nombre o etiqueta"
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
        <DefaultCard cardTitle="Historial de pesaje" buttonTitle="Registrar" @button-clicked="handleAddWeight">
          <div class="text-center min-h-30">
          </div>
        </DefaultCard>
      </div>

      <div class="flex flex-col gap-9">
        <DefaultCard cardTitle="Historial médico" buttonTitle="Registrar" @button-clicked="handleAddMedicineShot">
          <div class="text-center min-h-30">
          </div>
        </DefaultCard>
      </div>

    </div>

  </DefaultLayout>
</template>
