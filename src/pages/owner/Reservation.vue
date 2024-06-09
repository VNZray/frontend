<script setup>
import Reservation from '../../components/Owner/Reservations/Reservation.vue'
</script>

<template>
    <OwnerNavigationComponents />
    <v-container style="padding: 10px 0;">
        <h1 style="color: #1E4E72;">Reservations</h1>
    </v-container>

    <Reservation />
</template>

<style scoped>
h2 {
    color: #607683;
}
</style>