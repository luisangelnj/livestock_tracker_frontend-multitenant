<!-- components/TomSelect.vue -->
<template>
  <div :class="customClasses">
    <label v-if="label" class="mb-2.5 block text-sm font-medium text-black dark:text-white">
      {{ label }}
      <span v-if="isRequired" class="text-meta-1">*</span>
    </label>
    <div :class="{'active:border-stroke focus:border-stroke !bg-gray-50 rounded-md cursor-default hover:cursor-not-allowed':isDisabled}" class="relative z-20 bg-transparent">
      <select
        ref="select"
        autocomplete="off"
        :class="{ 'text-black': isOptionSelected, 'focus:border-gray-2 active:border-gray-200 hover:cursor-not-allowed': isDisabled }"
        :disabled="isDisabled"
      >
        <option :value="''">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.id" :value="option.id">{{option.name}}</option>
      </select>
      <small v-if="errorText" class="text-pink-500">{{ errorText }}</small>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick  } from 'vue';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.css';

const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  options: {
    type: Array,
    default: () => []
  },
  modelValue: [String, Number],
  customClasses: String,
  customInputClasses: [String, Array, Object],
  isRequired: Boolean,
  errorText: String,
  isDisabled: Boolean,
});

const generateUniqueId = () => 'tmp-' + Math.random().toString(36).substr(2, 9);

const emit = defineEmits([
  'update:modelValue',
  'selectedTomSelectOption',
  'newOption'
]);

const selectedOption = ref('')
const isOptionSelected = ref(false)

const select = ref(null);
let tomSelectInstance = null;

const initTomSelect = () => {
  if (tomSelectInstance) {
    tomSelectInstance.destroy();
  }

  tomSelectInstance = new TomSelect(select.value, {
    persist: false,
    createOnBlur: false,
    onInitialize: () => {
      // Sincronizar con el valor inicial
      if (props.modelValue) {
        tomSelectInstance.setValue(props.modelValue);
      }
    },
    create: false,
    onItemAdd: function(input) {
      // Personaliza cómo se crean nuevos items
      return {
        id: generateUniqueId(), // Función que debes implementar
        name: input,
        isNew: true // Bandera para identificar items nuevos
      }
    },
    onChange: (value) => {

      const selected = props.options.find(opt => opt.id == value) || 
                    tomSelectInstance.options[value]; // Para items nuevos
    
      emit('update:modelValue', value);
      emit('selectedTomSelectOption', selected);
      
      // Emitir evento especial para nuevos items
      if (selected && selected.isNew) {
        emit('newOption', { name: selected.name });
      }
      
    }
  });

  if (props.isDisabled) {
    tomSelectInstance.disable();
  }
};

// Inicializar solo cuando los options estén disponibles
watch(() => props.options, (newOptions) => {
  if (newOptions && newOptions.length > 0) {
    nextTick(() => {
      initTomSelect();
    });
  }
}, { immediate: true });

// Manejar cambios en el valor
watch(() => props.modelValue, (newVal) => {
  if (tomSelectInstance && newVal !== tomSelectInstance.getValue()) {
    tomSelectInstance.setValue(newVal ?? '');
  }
});

// Manejar cambios en disabled
watch(() => props.isDisabled, (disabled) => {
  if (tomSelectInstance) {
    disabled ? tomSelectInstance.disable() : tomSelectInstance.enable();
  }
});

// Limpiar al desmontar
onBeforeUnmount(() => {
  if (tomSelectInstance) {
    tomSelectInstance.destroy();
  }
});

</script>

<style scoped>
/* Estilos de Tom Select sobrescritos */
::v-deep(.ts-control) {
  @apply w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3.5 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter disabled:border-stroke dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary;
}

::v-deep(.ts-control input) {
  @apply text-base; /* o text-base, text-lg, etc. */
}

::v-deep(.ts-dropdown) {
  @apply border border-gray-200 rounded-md mt-1 shadow-lg z-50;
}

::v-deep(.ts-dropdown .option) {
  @apply px-4 py-2 text-base cursor-pointer hover:bg-gray-100;
}

/* ::v-deep(.ts-dropdown .active) {
  @apply;
} */
</style>
  