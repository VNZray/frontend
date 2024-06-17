<template>
    <v-container style="padding: 10px 0;">
        <v-dashboard-title>
            <h1 style="color: #1E4E72;">Reservations</h1>
        </v-dashboard-title>
    </v-container>

    <Reservation />

</template>

<style scoped>
v-dashboard-title {
    width: 100%;
    display: flex;
    align-items: center;
}

h2 {
    color: #607683;
}

.title-line-left,
.title-line-right {
    border: 3px solid #607683;
}

.title-line-left {
    border: 3px solid #607683;
    width: 200px;
}

.title-line-right {
    border: 3px solid #607683;
    width: 100%;
}
</style>