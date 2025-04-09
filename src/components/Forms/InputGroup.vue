<script setup>
import { defineEmits, ref, watch, defineComponent } from 'vue';
const props = defineProps({
  label: String,
  type: String,
  step: {
    type: Number,
    default: null
  },
  placeholder: String,
  modelValue: [String, Number],
  customClasses: String,
  customInputClasses: [String, Array, Object],
  isRequired: Boolean, // Define isRequired como booleano
  errorText: String,
  isDisabled: Boolean
});

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
  <div :class="customClasses">
    <label v-if="label" class="mb-2.5 block text-sm font-medium text-black dark:text-white">
      {{ label }}
      <span v-if="isRequired" class="text-meta-1">*</span>
    </label>
    <input
      :type="type"
      :step="step !== null ? step : undefined"
      :placeholder="placeholder"
      v-model="localInputValue"
      @input="updateValue"
      class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter disabled:border-stroke dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      :class="customInputClasses"
      :disabled="isDisabled"
    />
    <small v-if="errorText" class="text-pink-500">{{ errorText }}</small>
  </div>
</template>
