<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { useToast } from "vue-toastification";
import { useLoading } from 'vue-loading-overlay'
import { onMounted, ref, onUnmounted } from 'vue'

import InputGroup from '@/components/Forms/InputGroup.vue'
import DatePickerOne from '@/components/Forms/DatePicker/DatePickerOne.vue'
import { XMarkIcon } from '@heroicons/vue/24/solid';

import useCattleWeight from "@/ui/composables/History/useCattleWeight.js";

const props = defineProps({
    cattleId: Number, // Id del cattle al que se registrará pesaje
})

const emit = defineEmits([
    'weight-registered',
    'closed'
]);

const {
    weightModel,
    errors,

    registerWeight,
} = useCattleWeight();


const handleRegisterWeight = async () => {
    const success = await registerWeight(props.cattleId)
    if (success) {
        weightModel.value = []
        emit('weight-registered')
    }
}

const handleCloseModal = () => {
    weightModel.value = []
    errors.value = []
    emit('closed')
}

</script>

<template>
    <VueFinalModal
        :clickToClose="false"
        :escToClose="false"
        class="flex justify-center items-start pt-10"
        content-class="flex flex-col w-100 max-w-xl px-4 py-2 bg-white border rounded-lg space-y-2"
    >
        <div class="flex flex-row justify-between border-b border-stroke py-4 mb-4 dark:border-strokedark w-full">
            <h3 class="font-semibold text-black dark:text-white">Registrando pesaje</h3>
            <button class="text-primary underline" @click="handleCloseModal"><XMarkIcon class="size-6" /></button>
        </div>
        <slot></slot>
        <div class="space-y-4">
            <InputGroup
                v-model="weightModel.weight"
                label="Peso (kg)"
                type="number"
                placeholder="Digita el peso"
                isRequired
                :errorText="errors.weight"
            />
            <DatePickerOne
                v-model="weightModel.registerDate"
                label="Fecha de pesaje"
                isRequired
                :errorText="errors.registerDate"
            />
        </div>
        <div class="flex w-full justify-center py-4">
            <button
                @click="handleRegisterWeight"
                class="flex w-full lg:w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
                Registrar peso
            </button>
        </div>
    </VueFinalModal>

</template>