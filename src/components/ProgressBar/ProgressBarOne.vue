<script setup>
import { computed } from 'vue';

const props = defineProps({
    label: String,
    value: Number,
    max: {
        type: [Number, String],
        default: null
    },
    error: String,
});

const percentage = computed(() => {
    if (props.max === 0) return 0;
    return Math.min((props.value / props.max) * 100, 100); // nunca más del 100%
});

// Para mostrar texto en la vista (solo para mostrar)
const displayMax = computed(() => {
  return props.max === null ? 'Sin límite' : props.max;
});

const barColor = computed(() => {
    const pct = percentage.value;
    if (pct > 0 && pct < 70) return 'bg-green-500';
    if (pct > 0 && pct < 90) return 'bg-yellow-500';
    if (pct == 100) return 'bg-red'
    return 'bg-blue-600';
});

</script>

<template>
    <div v-if="props.value > 0" class="w-full text-xs italic">
        <div v-if="props.label" class="mb-2.5 block not-italic text-sm font-medium text-black">{{ props.label }}</div>
        <p class="w-full text-center">{{ props.value }} de {{ displayMax }}</p>
        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div class="font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" :class="barColor" :style="{ width: percentage + '%' }"></div>
        </div>
    </div>
    <div v-else-if="props.max" class="text-sm text-gray-500 italic text-center">
        <p class="w-full text-center text-xs">{{ props.value }} de {{ props.max }}</p>
        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div class="bg-gray-200 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" :style="{ width: percentage + '%' }"></div>
        </div>
    </div>
    <div v-else class="text-xs text-gray-500 italic text-center">{{ props.error ? props.error : 'Limite no definido' }}</div>

</template>