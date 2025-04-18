<!-- components/TomSelect.vue -->
<template>
    <select ref="select" :value="modelValue" @change="updateValue($event)">
      <slot />
    </select>
</template>
  
  <script setup>
  import { onMounted, ref, watch } from 'vue';
  import TomSelect from 'tom-select';
  
  const props = defineProps({
    modelValue: [String, Number, Array],
    options: Object
  });
  const emit = defineEmits(['update:modelValue']);
  
  const select = ref(null);
  let tomSelectInstance = null;
  
  const updateValue = (event) => {
    const selected = Array.from(event.target.selectedOptions).map(o => o.value);
    emit('update:modelValue', event.target.multiple ? selected : selected[0]);
  };
  
  onMounted(() => {
    tomSelectInstance = new TomSelect(select.value, props.options || {});
  
    // Si modelValue cambia desde afuera, actualiza el valor del select
    watch(() => props.modelValue, (newVal) => {
      if (tomSelectInstance) {
        tomSelectInstance.setValue(newVal, true);
      }
    }, { immediate: true });
  });
  </script>
  