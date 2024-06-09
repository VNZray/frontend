<template>
    <OwnerNavigationComponents />
    <v-container style="padding: 10px 0;">
<<<<<<< Updated upstream
        <v-dashboard-title>
            <h1 style="color: #1E4E72;">Dashboard</h1>
        </v-dashboard-title>
=======
        <h1 style="color: #1E4E72;">Room Sales</h1>
>>>>>>> Stashed changes
    </v-container>

    <RoomSalesComponent />
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

h1 {
    margin: 0 10px 0 10px;
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
    width: 53%;
}
</style>