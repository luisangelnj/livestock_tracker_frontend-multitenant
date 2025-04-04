<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <!-- ModalsContainer debe estar en el árbol de componentes -->
  <ModalsContainer />

  <RouterView />
</template>
