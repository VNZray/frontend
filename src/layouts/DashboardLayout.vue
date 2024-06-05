<template>
    <v-container>
            <h1 style="color: #1E4E72;">Dashboard</h1>
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
h2 {
    color: #1E4E72;
}

</style>
  