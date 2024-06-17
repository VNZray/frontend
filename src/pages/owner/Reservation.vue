<script setup>
import Reservation from '../../components/Owner/Reservations/Reservation.vue'
</script>

<template>
    <OwnerNavigationComponents />
    <v-container>
        <h1>Reservations</h1>
    </v-container>

    <Reservation />
</template>

<style scoped>
h2, h1 {
    color: #607683;
}
</style>