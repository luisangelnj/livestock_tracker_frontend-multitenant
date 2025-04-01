<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import SelectGroupTwo from '@/components/Forms/SelectGroup/SelectGroupTwo.vue'
import SelectGroupOne from '@/components/Forms/SelectGroup/SelectGroupOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DatePickerOne from '@/components/Forms/DatePicker/DatePickerOne.vue'

import { onMounted, ref } from 'vue'
import { useToast } from "vue-toastification";

import useCattle from "@/ui/composables/Herds/Cattle/useCattle.js";
import useBreed from "@/ui/composables/Catalogs/useBreed.js";

const pageTitle = ref('Registrando nuevo ganado')

const toast = useToast({
    timeout: 5000
});

const {
  cattleModel,
  errors,
  addCattle
} = useCattle();

const {
  breedList,
  breedModel,
  getAllBreedsNoPag
} = useBreed();


onMounted(async () => {
  await getAllBreedsNoPag();
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
              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <InputGroup
                  v-model="cattleModel.tagNameNumber"
                  label="Nombre / Etiqueta"
                  type="text"
                  placeholder="Ingresa el nombre o etiqueta"
                  customClasses="w-full xl:w-1/2"
                  :customInputClasses="[{
                    'border focus:border-pink-500 enabled:border-pink-500 border-pink-500 ring-pink-500': errors.tagNameNumber
                  }]"
                  :errorText="errors.tagNameNumber"
                  isRequired
                />
                <SelectGroupTwo
                  label="Raza"
                  placeholder="Selecciona raza"
                  :options="breedList"
                  v-model="cattleModel.breedId"
                  isRequired
                />
              </div>

              <InputGroup
                label="Costo de adquisición"
                type="number"
                placeholder="$"
                customClasses="w-full xl:w-1/2"
              />

              <InputGroup
                label="Subject"
                type="text"
                placeholder="Enter your subject"
                customClasses="mb-4.5"
              />

              <div class="mb-6">
                <label class="mb-2.5 block text-black dark:text-white"> Message </label>
                <textarea
                  rows="6"
                  placeholder="Type your message"
                  class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <button
                class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Send Message
              </button>
            </div>

        </DefaultCard>

      </div>

      <div class="flex flex-col gap-9">

        <DefaultCard>
          
            <div class="p-6.5">
              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <InputGroup
                  v-model="cattleModel.tagNameNumber"
                  label="Nombre / Etiqueta"
                  type="text"
                  placeholder="Ingresa el nombre o etiqueta"
                  customClasses="w-full xl:w-1/2"
                  :customInputClasses="[{
                    'border focus:border-pink-500 enabled:border-pink-500 border-pink-500 ring-pink-500': errors.tagNameNumber
                  }]"
                  :errorText="errors.tagNameNumber"
                  isRequired
                />

                

                <InputGroup
                  label="Costo de adquisición"
                  type="number"
                  placeholder="$"
                  customClasses="w-full xl:w-1/2"
                />
              </div>

              <InputGroup
                label="Email"
                type="email"
                placeholder="Enter your email address"
                customClasses="mb-4.5"
                required
              />

              <InputGroup
                label="Subject"
                type="text"
                placeholder="Enter your subject"
                customClasses="mb-4.5"
              />

              <SelectGroupTwo />

              <div class="mb-6">
                <label class="mb-2.5 block text-black dark:text-white"> Message </label>
                <textarea
                  rows="6"
                  placeholder="Type your message"
                  class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <button
                class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Send Message
              </button>
            </div>

        </DefaultCard>

      </div>

    </div>

  </DefaultLayout>
</template>
