<script setup>
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { InboxIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid';

import { APP_NAME, SYSTEM_DEVELOPER } from '@/config/env'
import useAuthentication from '@/ui/composables/useAuthentication';

import { useRoute } from 'vue-router';
import { ref } from 'vue'

const route = useRoute();

const {
  userModel,
  errors,
  forgotPassword,
  isForgotPasswordEmailSent
} = useAuthentication();

</script>

<template>

  <div class="flex flex-col h-screen w-full justify-center items-center">

    <DefaultAuthCard class="" :subtitle="`${ SYSTEM_DEVELOPER }`" :title="`Recuperar tu contraseña`">

      <section class="space-y-5" v-if="isForgotPasswordEmailSent==false">
        <p>Ingresa la dirección de correo electrónico vinculada a tu cuenta <br>y te enviaremos un enlace para restablecer tu contraseña.</p>
        <InputGroup v-model="userModel.email"  
            label="Email" 
            type="email" 
            placeholder="Ingresa tu Email"
          >
            <svg
              class="fill-current"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.5">
                <path
                  d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                  fill=""
                />
              </g>
            </svg>
        </InputGroup>
        <span v-if="errors.email" class="text-pink-500">{{ errors.email }}</span>
        <div class="mb-5 mt-6">
          <input
            @click="forgotPassword(userModel.email)"
            type="submit"
            value="Solicitar recuperar contraseña"
            class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          />
        </div>
        <p class="font-medium text-center">
          ¿Recordaste tu contraseña?...
          <router-link :to="{name:'login'}" class="text-primary">Inicia sesión</router-link>
        </p>
      </section>

      <section class="space-y-8" v-else>
        <div class="flex flex-row space-x-5 border rounded-lg px-3 py-5 border-green-500-300 bg-green-50 items-center">
          <InboxIcon class="size-10"/>
          <span class="text-lg">Se mandó el correo de recuperación. <br>Verifica tu correo para continuar.</span>
        </div>
        <p class="font-medium text-center">
          ¿Recordaste tu contraseña?...
          <router-link :to="{name:'login'}" class="text-primary">Inicia sesión</router-link>
        </p>
      </section>


    </DefaultAuthCard>

  </div>

</template>
