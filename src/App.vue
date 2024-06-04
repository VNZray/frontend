<template>
  <v-card>
    <v-layout>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>