import Members from '@/pages/Members.vue';
<template>
    <v-container style="padding: 10px 20px;">
        <v-dashboard-title>
            <hr class="title-line-left">
            <h1>Members</h1>
            <hr class="title-line-right">
        </v-dashboard-title>
    </v-container>
    <Members />
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
    width: 100%;
}
</style>