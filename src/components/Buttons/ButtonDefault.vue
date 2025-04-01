<script setup lang="ts">
const props = defineProps(['label', 'route', 'customClasses'])
</script>

<template>
  <router-link
    v-if="props.route"
    :to="props.route"
    class="inline-flex items-center justify-center gap-2.5 py-4 px-10 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-10"
    :class="props.customClasses"
  >
    <slot></slot>
    {{ props.label }}
  </router-link>
  <div v-else
    class="inline-flex items-center justify-center gap-2.5 py-4 px-10 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-10"
    :class="props.customClasses"
  >
    <slot></slot>
    {{ props.label }}
  </div>
</template>
