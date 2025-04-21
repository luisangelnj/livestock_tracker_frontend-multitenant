<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import TomSelect from '@/components/Forms/SelectGroup/TomSelect.vue'
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
import useFoodType from '@/ui/composables/Catalogs/useFoodType.js'

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
  columnHelper.accessor('foodType', {
    header: 'Alimento',
    width: 20
  }),
  columnHelper.accessor('description', {
    header: 'Descripción o factura',
    width: 20
  }),
  columnHelper.accessor('unitPrice', {
    header: 'Precio por unidad ($)',
    width: 20
  }),
  columnHelper.accessor('quantity', {
    header: 'Unidades ingresadas (Kg)',
    width: 20
  })
];

const {
  warehouseMovementModel,
  newMovementDetail,
  addMovementDetail,
  removeMovementDetail,
  errors
} = useWarehouseMovement();

const {
  foodTypeList,
  getAllFoodTypesNoPag
} = useFoodType();

const handleSelectedTomSelectOption = (option) => {
  newMovementDetail.value.foodType = option.name
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    await getAllFoodTypesNoPag(false);
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

  <DefaultCard class="mb-2">
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
      <div class="flex items-end space-x-1 w-full">
        <TomSelect 
          v-model="newMovementDetail.foodTypeId"
          @selectedTomSelectOption="handleSelectedTomSelectOption"
          label="Alimento a ingresar"
          placeholder="Busca un alimento"
          :options="foodTypeList"
          customClasses="w-11/12"
          isRequired
          :errorText="errors.foodType"
        />
        <!-- <ButtonDefault label="+" @click="addMovementDetail" customClasses="bg-primary/90 text-sm hover:opacity-95 hover:cursor-pointer text-white w-1/12 rounded-lg" /> -->
        <button title="Crear nuevo alimento" class="w-1/12 bg-primary/90 size-12 rounded-lg font-semibold text-white text-xl hover:opacity-95 hover:cursor-pointer">+</button>
      </div>
      <InputGroup
        v-model="newMovementDetail.description"
        label="Nota o Factura del alimento"
        placeholder="Ingresa la nota o factura del alimento a ingresar"
        type="text"
        customClasses="w-full"
      />
      <div class="grid grid-cols-2 gap-5">
        <InputGroup
          v-model="newMovementDetail.unitPrice"
          label="Precio por unidad ($)"
          placeholder="0"
          type="number"
          customClasses="w-full"
          isRequired
          :errorText="errors.unitPrice"
        />
        <InputGroup
          v-model="newMovementDetail.quantity"
          label="Unidades a ingresar (Kg)"
          placeholder="0"
          type="number"
          customClasses="w-full"
          isRequired
          :errorText="errors.quantity"
        />
      </div>
      <div class="flex items-end">
        <ButtonDefault label="Agregar" @click="addMovementDetail" customClasses="bg-primary/90 text-sm hover:opacity-95 hover:cursor-pointer text-white w-20 h-12 rounded-lg" />
      </div>
    </div>
  </DefaultCard>
  <div class="overflow-auto w-full">
    <BaseTableTanStack
      :columns = "warehouseMovementDetailsColumns"
      :data = "warehouseMovementModel.movementDetails"
      :withRowNumbers = true
    >
      <template #actions="{row}">
        <div class="flex space-x-5 px-6 text-sm text-primary text-center">
          <span @click="removeMovementDetail(row.index)" class="text-primary hover:cursor-pointer hover:underline">Eliminar</span>
        </div>
      </template>
      <template #cell-description="{row}">
        <span v-if="!row.original.description">-</span>
      </template>
    </BaseTableTanStack>
  </div>

  <div class="flex w-full justify-center my-3">
    <button
      @click="addEntry"
      class="flex w-full sm:w-1/3 lg:w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
    >
      Registrar
    </button>
  </div>
</template>
