<template>
    <v-container style="padding: 10px 0;">
        <v-dashboard-title>
            <hr class="title-line-left">
            <h1 style="color: #1E4E72;">Dashboard</h1>
            <hr class="title-line-right">
        </v-dashboard-title>
    </v-container>

    <v-container style="padding: 10px 20px 20px 20px;">
        <DashboardCard />

        <v-container style="padding: 0;">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-container style="padding: 20px 0">
                        <h2>Recent Payments</h2>
                    </v-container>
                    <RecentPaymentTable />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-container style="padding: 20px 0 20px 10px;">
                        <h2>New Applicants</h2>
                    </v-container>
                    <Applicants />
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
  
<style scoped>
v-dashboard-title {
    width: 100%;
    display: flex;
    align-items: center;
}

h2 {
    color: #1E4E72;
}

h1 {
    margin: 0 10px 0 10px;
}

.title-line-left,
.title-line-right {
    border: 3px solid #1E4E72;
}

.title-line-left {
    border: 3px solid #1E4E72;
    width: 200px;
}

.title-line-right {
    border: 3px solid #1E4E72;
    width: 100%;
}
</style>
  