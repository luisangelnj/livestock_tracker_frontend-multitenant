<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue';
const props = defineProps(['label', 'type', 'placeholder', 'modelValue'])

const localInputValue = ref(props.modelValue)

// Watch for changes to modelValue prop
watch(() => props.modelValue, (newValue) => {
  localInputValue.value = newValue; // Update local value when prop changes
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};

</script>

<template>
  <div class="mb-4">
    <label class="mb-2.5 block font-medium text-black dark:text-white">{{ props.label }}</label>
    <div class="relative">
      <input
        :type="props.type"
        :placeholder="props.placeholder"
        v-model="localInputValue"
        @input="updateValue"
        class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
      />

      <span class="absolute right-4 top-4">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
