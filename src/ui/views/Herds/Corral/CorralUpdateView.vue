<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import SelectGroupTwo from '@/components/Forms/SelectGroup/SelectGroupTwo.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DatePickerOne from '@/components/Forms/DatePicker/DatePickerOne.vue'

import { onMounted, ref } from 'vue'
import { useToast } from "vue-toastification";
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { useLoading } from 'vue-loading-overlay'

import useCorral from "@/ui/composables/Herds/Corral/useCorral.js";

const pageTitle = ref('Editando nuevo corral')

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
  getCorralDetail,
  updateCorral
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

  <div class="grid grid-row-1 gap-1 sm:grid-cols-2">
    
    <div class="flex flex-col gap-9">
      
      <DefaultCard>
          <div class="p-6.5">
            <InputGroup
              v-model="corralModel.name"
              label="Nombre del corral"
              type="text"
              placeholder="Ingresa el nombre del corral"
              customClasses="w-full mb-4.5"
              :customInputClasses="[{
                'border focus:border-pink-500 enabled:border-pink-500 border-pink-500 ring-pink-500': errors.name
              }]"
              :errorText="errors.name"
              isRequired
            />

            <InputGroup
                v-model="corralModel.location"
                label="Ubicación o referencia"
                placeholder="Ingresa la ubicación o referencia del corral"
                type="text"
                customClasses="w-full mb-4.5"
            />

            <div class="mb-6">
              <label class="mb-2.5 font-medium text-sm block text-black dark:text-white">Descripción</label>
              <textarea
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
                :step=1
                v-model="corralModel.capacity"
                label="Capacidad máxima del corral"
                type="number"
                placeholder="Digitar capacidad máxima"
                customClasses="w-full xl:w-1/2"
              />
              <p class="text-sm w-full xl:w-1/2">
                Si se define una capacidad máxima, se impedirá superar ese límite al ingresar ganado.<br>
                Si se deja en blanco, no se aplicará ningún límite.
              </p>
            </div>
          </div>

      </DefaultCard>

    </div>

  </div>

  <div class="flex w-full justify-center mt-8">
    <button
      @click="updateCorral"
      class="flex w-full lg:w-1/3 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
    >
      Actualizar
    </button>
  </div>
</template>
