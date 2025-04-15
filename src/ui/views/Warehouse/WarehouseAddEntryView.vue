<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import SelectGroupTwo from '@/components/Forms/SelectGroup/SelectGroupTwo.vue'
import DatePickerOne from '@/components/Forms/DatePicker/DatePickerOne.vue'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import BaseTableTanStack from '@/components/Tables/BaseTableTanStack.vue'

import { PlusIcon } from '@heroicons/vue/24/solid';
import { useVueTable, createColumnHelper, getCoreRowModel } from '@tanstack/vue-table';
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

// Helper para crear columnas
const columnHelper = createColumnHelper();
// Definición de columnas
const warehouseMovementDetailsColumns = [
  columnHelper.accessor('name', {
    header: 'Alimento',
    width: 20
  }),
  columnHelper.accessor('currentOccupancy', {
    header: 'Descripción o factura',
    width: 20
  }),
  columnHelper.accessor('location', {
    header: 'Precio por unidad',
    width: 20
  }),
  columnHelper.accessor('status', {
    header: 'Unidades ingresadas',
    width: 20
  })
];

const {
  warehouseMovementModel
} = useWarehouseMovement();


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
    <div class="grid grid-cols-2 gap-10 p-6.5">
      <DatePickerOne
        v-model="warehouseMovementModel.registerDate"
        customClasses="w-full"
        label="Fecha del registro"
        placeholder="dd/mm/yyyy"
        isRequired
      />
      <SelectGroupTwo
        label="Proveedor"
        customClasses="w-full"
        isDisabled
      />
    </div>
  </DefaultCard>
  <DefaultCard>
    <div class="grid grid-cols-2 gap-5 p-6.5">
      <InputGroup
        label="Seleccionar alimento"
        placeholder="Selecciona o registra un nuevo alimento"
        type="text"
        customClasses="w-full"
        isRequired
      />
      <InputGroup
        label="Nota o Factura del alimento"
        placeholder="Ingresa la nota o factura del alimento a ingresar"
        type="text"
        customClasses="w-full"
      />
      <div class="grid grid-cols-2 gap-5">
        <InputGroup
          label="Precio por unidad"
          placeholder="0"
          type="text"
          customClasses="w-full"
        />
        <InputGroup
          label="Unidades a ingresar"
          placeholder="0"
          type="text"
          customClasses="w-full"
        />
      </div>
      <div class="flex items-end">
        <ButtonDefault label="Agregar" customClasses="bg-primary/90 text-sm hover:opacity-95 hover:cursor-pointer text-white w-20 h-12 rounded-lg" />
      </div>
    </div>
  </DefaultCard>

  <div class="overflow-auto w-full">
    <BaseTableTanStack
      :columns = "warehouseMovementDetailsColumns"
      :withHeader = true
      :data = "warehouseMovementModel.movementDetails"
    >

    </BaseTableTanStack>
  </div>

  <div class="flex w-full justify-center mt-8">
    <button
      @click="addEntry"
      class="flex w-full lg:w-1/3 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
    >
      Registrar
    </button>
  </div>
</template>
