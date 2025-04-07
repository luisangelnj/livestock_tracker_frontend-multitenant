<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import SelectGroupTwo from '@/components/Forms/SelectGroup/SelectGroupTwo.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DatePickerOne from '@/components/Forms/DatePicker/DatePickerOne.vue'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';

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
  errors,
  getCorralDetail
} = useCorral();


onMounted(async () => {
  const loader = $loading.show()
  try {
    corralModel.value.id = route.params.id;
    await getCorralDetail(false, corralModel.value.id);
  } catch (error) {
    toast.error('Ha ocurrido un error, intentalo en un momento')
    router.push({ name: 'corrals-list' });
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
          <div class="p-6.5">
            <InputGroup
              v-model="corralModel.name"
              label="Nombre del corral"
              type="text"
              isDisabled
              customClasses="w-full mb-4.5"
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
                customClasses="w-full mb-4.5"
            />

            <div class="mb-6">
              <label class="mb-2.5 font-medium text-sm block text-black dark:text-white">Descripción</label>
              <textarea
                disabled
                rows="4"
                v-model="corralModel.description"
                placeholder="Ingresa la descripción del corral"
                class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
            </div>

          </div>

      </DefaultCard>

    </div>

    <div class="flex flex-col gap-9">

      <DefaultCard>
        
          <div class="p-6.5">
            <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <InputGroup
                v-model="corralModel.capacity"
                label="Capacidad máxima del corral"
                type="number"
                isDisabled
                customClasses="w-full xl:w-1/2"
              />
              <p class="text-sm w-full xl:w-1/2">
                Al ingresar la capacidad, se valida el ingreso de nuevo ganado al corral para no revasar su máxima capacidad.<br>
                Al dejar vacío no se limitará el ingreso de nuevo ganado al corral.
              </p>
            </div>
          </div>

      </DefaultCard>

    </div>

  </div>

</template>
