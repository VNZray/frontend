<template>
  <v-card>
    <v-layout>
      <v-main style="min-height: 100vh; max-height: auto" >
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>