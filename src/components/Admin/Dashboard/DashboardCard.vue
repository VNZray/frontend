<template>
    <v-container style="padding: 0;">
        <v-row no-gutters style="gap: 40px;">
            <v-col cols="2.5">
                <v-card class="card" link to="/payment" style="border-left: 25px #D7BD12 solid; color: #D7BD12;">
                    <h1 class="fee-amount"> <span class="peso-sign">₱</span>
                        200,000.00</h1>
                    <h4 class="title">Total Fees</h4>
                </v-card>
            </v-col>

            <v-col cols="2.5">
                <v-card class="card" link to="/members" style="border-left: 25px #00A0F0 solid; color: #00A0F0;">
                    <h1 class="fee-amount">80</h1>
                    <h4 class="title">Active Members</h4>
                </v-card>
            </v-col >

            <v-col cols="2.5">
                <v-card class="card" link to="/accommodations" style="border-left: 25px #1E4E72 solid; color: #1E4E72;">
                    <h1 class="fee-amount">160</h1>
                    <h4 class="title">Accommodations</h4>
                </v-card>
            </v-col>

            <v-col cols="2.5">
                <v-card class="card" link to="/applicants" style="border-left: 25px #8DB32C solid; color: #8DB32C;">
                    <h1 class="fee-amount">10</h1>
                    <h4 class="title">Pending application</h4>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    height: 170px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.3);
}

.fee-amount {
    padding: 0 5px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.title {
    border-top: 1px solid #1E4E72;
    height: 70px;
    width: 100%;
    padding: 0 5px;
    display: flex;
    align-items: center;
}

</style>