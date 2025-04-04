<script setup>
import { onMounted, ref } from 'vue'

import RegisterCattleWeightModal from '@/ui/components/RegisterCattleWeightModal.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Vista example')

const show = ref(false)

function handleRegisteredWeight() {
  show.value=false
  console.log('se registró peso');
  
}

</script>

<template>
  <DefaultLayout>
    <div class="flex items-start justify-between py-1">
      <h2 class="text-title-md2 font-semibold text-black dark:text-white">
        {{ pageTitle }}
      </h2>
    </div>

    <button @click="show = true">
      Open Modal
    </button>

    <RegisterCattleWeightModal
      v-model="show"
      @weight-registered="() => handleRegisteredWeight()"
      @closed="show=false"
    />


  </DefaultLayout>
</template>
