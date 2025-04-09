<script setup>
import { computed } from 'vue';

const props = defineProps({
    value: Number,
    max: Number,
    error: String,
});

const percentage = computed(() => {
    if (!props.max || props.max === 0) return 0;
    return Math.min((props.value / props.max) * 100, 100); // nunca más del 100%
});

const barColor = computed(() => {
  const pct = percentage.value;
  if (pct < 70) return 'bg-green-500';
  if (pct < 90) return 'bg-yellow-500';
  return 'bg-blue-600';
});

</script>

<template>
    <div v-if="props.value > 0" class="w-full text-xs italic">
        <p class="w-full text-center">{{ props.value }} de {{ props.max }}</p>
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