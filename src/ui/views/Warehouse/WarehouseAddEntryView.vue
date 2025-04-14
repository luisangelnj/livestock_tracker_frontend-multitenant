<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import SelectGroupTwo from '@/components/Forms/SelectGroup/SelectGroupTwo.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DatePickerOne from '@/components/Forms/DatePicker/DatePickerOne.vue'

import { onMounted, ref } from 'vue'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay'

import useWarehouseMovement from "@/ui/composables/Warehouse/useWarehouseMovement.js";

const pageTitle = ref('Registrando entrada de almacén')

const router = useRouter()

const toast = useToast({
    timeout: 5000
});

const $loading = useLoading({
    color: '#007BFF'
});


onMounted(async () => {
  const loader = $loading.show()
  try {
    
  } catch (error) {
    toast.error('Ha ocurrido un error, intentalo en un momento')
    // router.push({ name: '' });
  } finally {
    loader.hide()
  }

})

</script>

<template>
  <!-- Breadcrumb Start -->
  <BreadcrumbDefault :pageTitle="pageTitle" />
  <!-- Breadcrumb End -->

  <DefaultCard>
    <div class="grid grid-cols-2">
      <div class="p-6.5 space-y-4.5">
        <DatePickerOne
          v-model="registerDate"
          customClasses="w-full"
          label="Fecha del registro"
          placeholder="dd/mm/yyyy"
          isRequired
        />
        <InputGroup
            label="Capturar alimento"
            placeholder="Ingresa el alimento a ingresar"
            type="text"
            customClasses="w-full"
        />
      </div>
      <div class="p-6.5 space-y-4.5">
        <SelectGroupTwo
          label="Proveedor"
          :options="sexList"
          customClasses="w-full"
          isDisabled
        />
        <InputGroup
            label="Nota o Factura del alimento"
            placeholder="Ingresa la nota o factura del alimento a ingresar"
            type="text"
            customClasses="w-full mb-4.5"
        />
      </div>
    </div>
  </DefaultCard>

  <div class="flex w-full justify-center mt-8">
    <button
      @click="addEntry"
      class="flex w-full lg:w-1/3 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
    >
      Registrar
    </button>
  </div>
</template>
