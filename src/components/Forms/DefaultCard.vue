<script setup>
const props = defineProps(['cardTitle', 'buttonTitle'])

const emit = defineEmits(['button-clicked']);

const emitEvent = () => {
  emit("button-clicked")
}

</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div v-if="props.cardTitle" class="flex flex-row justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
      <h3 class="font-semibold text-black dark:text-white">{{ props.cardTitle }}</h3>
      <button v-if="props.buttonTitle" class="text-primary underline" @click="emitEvent">{{ props.buttonTitle }}</button>
    </div>
    <slot></slot>
  </div>
</template>
