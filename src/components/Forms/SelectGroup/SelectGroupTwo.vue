<script setup lang="ts">
import { defineEmits, ref, watch, defineComponent } from 'vue';
const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  options: Array,
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

const selectedOption = ref<string>('')
const isOptionSelected = ref<boolean>(false)

const changeTextColor = () => {
  isOptionSelected.value = true
}

const handleChangeEvent = (e) => {
  updateValue(e);
  changeTextColor();
}
</script>

<template>
  <div :class="customClasses">
    <label v-if="label" class="mb-2.5 block text-sm font-medium text-black dark:text-white">
      {{ label }}
      <span v-if="isRequired" class="text-meta-1">*</span>
    </label>

    <div class="relative z-20 bg-transparent dark:bg-form-input">
      <select
        v-model="selectedOption"
        class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        :class="{ 'text-black dark:text-white': isOptionSelected }"
        @change="handleChangeEvent"
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.id" :value="option.id">{{option.name}}</option>
      </select>

      <span class="absolute top-1/2 right-4 z-30 -translate-y-1/2">
        <svg
          class="fill-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.8">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
              fill=""
            ></path>
          </g>
        </svg>
      </span>
    </div>
  </div>
</template>
