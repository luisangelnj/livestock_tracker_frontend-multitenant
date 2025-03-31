<script setup>
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { InboxIcon } from '@heroicons/vue/24/solid';

import { APP_NAME, SYSTEM_DEVELOPER } from '@/config/env'
import useAuthentication from '@/ui/composables/useAuthentication';

import { useRoute } from 'vue-router';
import { ref } from 'vue'

const route = useRoute();



const {
  userModel,
  resendVerificationEmail
} = useAuthentication();

userModel.value.email = route.query.email; // Obtenemos el parametro de la URL

</script>

<template>

  <div class="flex flex-col h-screen w-full justify-center items-center">

    <DefaultAuthCard class="" :subtitle="`${ SYSTEM_DEVELOPER }`" :title="`Verifica tu correo electrónico`">

      <section class="space-y-5">
        <InboxIcon class="size-10"/>
        <p class="text-lg">Recibirás un email con instrucciones para verificar tu correo <br>electrónico y finalizar el proceso de registro.</p>
        <p class="text-sm">Si no encuentras el correo, te sugerimos verificar tu carpeta de correos no <br>deseados o spam, o también puedes <span class="text-sky-500 cursor-pointer" @click="resendVerificationEmail(userModel.email)">solicitar</span> un nuevo email de verificación.</p>
      </section>

    </DefaultAuthCard>

  </div>

</template>
