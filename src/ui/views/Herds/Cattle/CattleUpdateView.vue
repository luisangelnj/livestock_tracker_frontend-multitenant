<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import SelectGroupTwo from '@/components/Forms/SelectGroup/SelectGroupTwo.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DatePickerOne from '@/components/Forms/DatePicker/DatePickerOne.vue'

import { onMounted, ref } from 'vue'
import { useToast } from "vue-toastification";
import { useRouter, useRoute } from 'vue-router';
import { useLoading } from 'vue-loading-overlay'

import useCattle from "@/ui/composables/Herds/Cattle/useCattle.js";
import useBreed from "@/ui/composables/Catalogs/useBreed.js";
import useSex from "@/ui/composables/Catalogs/useSex.js";
import useCattleStatus from "@/ui/composables/Catalogs/useCattleStatus.js";

const pageTitle = ref('Editando ganado')

const router = useRouter()
const route = useRoute()

const toast = useToast({
    timeout: 5000
});

const $loading = useLoading({
    color: '#007BFF'
});

const {
  cattleModel,
  errors,
  getCattleDetail,
  updateCattle
} = useCattle();

const {
  breedList,
  getAllBreedsNoPag
} = useBreed();

const {
  sexList,
  getAllSexesNoPag
} = useSex();

const {
  statusList,
  getAllStatusNoPag
} = useCattleStatus();


onMounted(async () => {
  const loader = $loading.show()
  try {
    cattleModel.value.id = route.params.id;
    await getAllSexesNoPag(false);
    await getAllBreedsNoPag(false);
    await getAllStatusNoPag(false);
    await getCattleDetail(false, cattleModel.value.id)
  } catch (error) {
    toast.error('Ha ocurrido un error, intentalo en un momento')
    
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
                isRequired
              />

              <div class="mb-7 flex flex-col gap-6 xl:flex-row">
                <SelectGroupTwo
                  v-model="cattleModel.sexId"
                  label="Sexo"
                  placeholder="Selecciona sexo"
                  :options="sexList"
                  customClasses="w-full xl:w-1/2"
                />
                <SelectGroupTwo
                  v-model="cattleModel.breedId"
                  label="Raza"
                  placeholder="Selecciona raza"
                  :options="breedList"
                  customClasses="w-full xl:w-1/2"
                />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <DatePickerOne
                  customClasses="w-full xl:w-1/2"
                  label="Fecha de nacimiento"
                  placeholder="dd/mm/yyyy"
                  v-model="cattleModel.birthDate"
                />
                <InputGroup
                  v-model="cattleModel.initialWeight"
                  label="Peso inicial (Kg)"
                  type="number"
                  placeholder="Kg"
                  customClasses="w-full xl:w-1/2"
                />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <SelectGroupTwo
                  v-model="cattleModel.statusId"
                  label="Estatus"
                  placeholder="Selecciona el estatus del animal"
                  :options="statusList"
                  customClasses="w-full xl:w-1/2"
                />
              </div>

            </div>

        </DefaultCard>

      </div>

      <div class="flex flex-col gap-9">

        <DefaultCard>
          
            <div class="p-6.5">
              <div class="flex flex-col gap-6 xl:flex-row">
                <DatePickerOne
                  customClasses="w-full xl:w-1/2 mb-4.5"
                  label="Fecha de adquisición"
                  placeholder="dd/mm/yyyy"
                  v-model="cattleModel.acquisitionDate"
                />

                <InputGroup
                  v-model="cattleModel.purchaseCost"
                  label="Costo de adquisición ($)"
                  type="number"
                  placeholder="$"
                  customClasses="w-full xl:w-1/2"
                />
              </div>

              <div class="mb-6">
                <label class="mb-2.5 block font-medium text-sm text-black dark:text-white"> Notas iniciales </label>
                <textarea
                  rows="5"
                  v-model="cattleModel.initialNotes"
                  placeholder="Escribe notas iniciales"
                  class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

            </div>

        </DefaultCard>

      </div>

    </div>

    <div class="flex w-full justify-center mt-8">
      <button
        @click="updateCattle"
        class="flex w-full lg:w-1/3 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
      >
        Actualizar
      </button>
    </div>

  </DefaultLayout>
</template>
