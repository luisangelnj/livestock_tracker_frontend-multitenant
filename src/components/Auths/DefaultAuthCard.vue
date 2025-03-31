<script setup>
import { APP_NAME, APP_SLOGAN } from '@/config/env'
const props = defineProps(['subtitle', 'title', 'customClasses'])
</script>

<template>
  <!-- ====== Forms Section Start -->
  <div
    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="flex flex-wrap items-center">
      <div class="hidden w-full xl:block xl:w-1/2">
        <div class="py-17.5 px-26 text-center">
          <router-link class="mb-5.5 inline-block" to="/">
            <img class="hidden dark:block max-w-60" src="@/assets/images/logo/logo.png" alt="Logo" />
            <img class="dark:hidden max-w-60" src="@/assets/images/logo/logo-dark.png" alt="Logo" />
          </router-link>

          <p class="font-medium 2xl:px-20">
            {{ APP_NAME }} | {{ APP_SLOGAN }}
          </p>

          <span class="mt-15 inline-block">
            <img src="@/assets/images/livestock/farm_animals.png" class="max-w-lg" alt="illustration" />
            <!-- <img src="@/assets/images/illustration/illustration-03.svg" alt="illustration" /> -->
          </span>
        </div>
      </div>
      <div class="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 xl:max-h-[90vh] xl:overflow-scroll">
        <div class="w-full p-4 sm:p-12.5 xl:p-17.5">
          <span class="mb-1.5 block font-medium">{{ props.subtitle }}</span>
          <h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            {{ props.title }}
          </h2>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <!-- ====== Forms Section End -->
</template>
