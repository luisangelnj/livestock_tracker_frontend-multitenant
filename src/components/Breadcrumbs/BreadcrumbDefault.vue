<script setup>
import { useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';

const router = useRouter();

const props = defineProps(['pageTitle'])

const goBack = () => {
  router.back();
};

</script>

<template>
  <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex space-x-4 items-center">
      <div class="cursor-pointer p-1.5 hover:ring-1 hover:ring-gray-400 hover:ring-inset hover:rounded-full">
        <ArrowLeftIcon class="size-6" @click="goBack" />
      </div>
      <h2 class="text-title-md2 font-semibold text-black dark:text-white">
        {{ props.pageTitle }}
      </h2>
      <slot name="button">
      </slot>
    </div>

    <nav>
      <ol class="flex items-center gap-2">
        <li>
          <router-link class="font-medium" to="/"> Dashboard / </router-link>
        </li>
        <li class="font-medium text-primary">{{ props.pageTitle }}</li>
      </ol>
    </nav>
  </div>
</template>
