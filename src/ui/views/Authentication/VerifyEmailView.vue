<script setup>
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { InboxIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid';

import { APP_NAME, SYSTEM_DEVELOPER } from '@/config/env'
import useAuthentication from '@/ui/composables/useAuthentication';

import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { onMounted } from 'vue';

const route = useRoute();

const {
  isEmailVerified,
  verifyUserEmail
} = useAuthentication();

const userId = route.params.id;
const userToken = route.params.token;

onMounted( async () => { 
  await verifyUserEmail(userId, userToken)
})

</script>

<template>

  <div class="flex flex-col h-screen w-full justify-center items-center">

    <DefaultAuthCard class="" :subtitle="`${ SYSTEM_DEVELOPER }`" :title="`Verifica tu correo electrónico`">

      <section v-if="isEmailVerified==true" class="space-y-5 verified">
        <InboxIcon class="size-10" />
        <p class="text-2xl"> Verificación de correo electrónico</p>
        <div class="flex flex-row space-x-5 border rounded-lg px-3 py-5 border-green-500-300 bg-green-50 items-center">
          <CheckCircleIcon class="size-10 text-green-500" />
          <span class="text-lg">¡Haz verificado tu correo electrónico de manera exitosa!</span>
        </div>
        <p>Inicia sesión para continuar, haz clic <RouterLink class="text-sky-500" :to="{name: 'login'}">aquí</RouterLink>.</p>
      </section>
      <section v-else-if="isEmailVerified==false" class="space-y-5 invalid">
        <InboxIcon class="size-10" />
        <p class="text-2xl"> Verificación de correo electrónico</p>
        <div class="flex flex-row space-x-5 border rounded-lg px-3 py-5 border-pink-300 bg-pink-50 items-center">
          <XCircleIcon class="size-10 text-pink-500" />
          <span class="text-lg">¡Este enlace es inválido!</span>
        </div>
      </section>

    </DefaultAuthCard>

  </div>

</template>
