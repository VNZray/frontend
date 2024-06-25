<script setup lang="ts">
import GuestNavigation from '@/components/GuestNavigation.vue';
import MyBooking from '@/components/guest/booking/MyBooking.vue';
</script>

<template>
    <GuestNavigation />
    <v-container>
        <h1 style="color: #1E4E72;">My Booking</h1>
    </v-container>

    <MyBooking />


</template>

<style scoped>
h2 {
    color: #607683;
}
</style>