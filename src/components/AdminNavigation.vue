<template>
    <v-navigation-drawer expand-on-hover rail style="background-color: #1E4E72; color: white;">
        <v-list>
            <v-list-item :prepend-avatar="avatarUrl" :title="`${account.name}`"
                subtitle="System Administrator"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard-outline" title="Dashboard" value="dashboard"
                :to="{ name: 'AdminDashboard', params: { owner_id: account.owner_id } }"></v-list-item>
            <v-list-item prepend-icon="mdi-file-document-edit-outline" title="New Application" value="new_application"
                :to="{ name: 'AddminApply', params: { owner_id: account.owner_id } }"></v-list-item>
            <v-list-item prepend-icon="mdi-account-plus-outline" title="Applicants" value="applicants"
                :to="{ name: 'AdminApplicants', params: { owner_id: account.owner_id } }"></v-list-item>
            <v-list-item prepend-icon="mdi-credit-card-outline" title="Payment" value="payment"
                :to="{ name: 'AdminPayment', params: { owner_id: account.owner_id } }"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple-outline" title="Members" value="members"
                :to="{ name: 'AdminMembers', params: { owner_id: account.owner_id } }"></v-list-item>
            <v-list-item prepend-icon="mdi-office-building-outline" title="Establishments" value="establishment"
                :to="{ name: 'AdminEstablishment', params: { owner_id: account.owner_id } }"></v-list-item>
            <v-list-item prepend-icon="mdi-account-outline" title="Create Account" value="create-account"
                :to="{ name: 'AdminCreateAccount', params: { owner_id: account.owner_id } }"></v-list-item>
        </v-list>

        <template v-slot:append>
            <div class="pb-2">
                <v-list-item prepend-icon="mdi-logout" title="Logout" @click="openLogout"></v-list-item>
            </div>
        </template>

        <v-dialog v-model="logoutDialog" max-width="400">
            <v-card style="padding: 10px;">
                <v-card-text>
                    <v-row>
                        <v-col>
                            <h2>Are you sure you want to logout?</h2>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-btn @click="closeLogout" style="width: 100%;">Cancel</v-btn>
                        </v-col>

                        <v-col>
                            <v-btn @click="confirmLogout" style="width: 100%;" color="primary">Logout</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-navigation-drawer>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            accommodations: {},
            account: {}, // Handle account state locally
            logoutDialog: false, // Dialog states
            avatarUrl: "https://cdn-icons-png.flaticon.com/128/10438/10438143.png",
        };
    },
    created() {
        this.fetchAccount();
        this.fetchEstablishment();
    },
    methods: {
        fetchEstablishment() {
            const establishment_id = this.$route.params.establishment_id;

            if (establishment_id) {
                axios
                    .get(`http://127.0.0.1:8000/api/establishment/${establishment_id}`)
                    .then((response) => {
                        console.log("Establishment data:", response.data); // Log the response
                        this.accommodations = response.data.Establishment;
                        console.log(this.accommodations.id);
                    })
                    .catch((error) => {
                        console.error("Error fetching establishment:", error);
                    });
            } else {
                axios
                    .get("http://127.0.0.1:8000/api/establishment")
                    .then((response) => {
                        console.log("Establishments data:", response.data); // Log the response
                        this.accommodations = response.data.Establishment;
                        console.log(this.accommodations.id);

                    })
                    .catch((error) => {
                        console.error("Error fetching establishment:", error);
                    });
            }
        },
        fetchAccount() {
            const owner_id = this.$route.params.owner_id;

            if (owner_id) {
                axios
                    .get(`http://127.0.0.1:8000/api/owner_account/${owner_id}`)
                    .then((response) => {
                        console.log("Account data:", response.data); // Log the response
                        this.account = response.data.Account;
                        console.log(this.account.id);
                        console.log(this.account.name);

                    })
                    .catch((error) => {
                        console.error("Error fetching account:", error);
                    });
            } else {
                axios
                    .get("http://127.0.0.1:8000/api/account")
                    .then((response) => {
                        console.log("Accounts data:", response.data); // Log the response
                        this.account = response.data.Account;
                        console.log(this.account.id);
                        console.log(this.account.name);
                    })
                    .catch((error) => {
                        console.error("Error fetching account:", error);
                    });
            }
        },
        openLogout() {
            this.logoutDialog = true;
        },
        closeLogout() {
            this.logoutDialog = false;
        },
        async confirmLogout() {
            this.logoutDialog = false;
            this.$router.push({ name: "Login" });
        },
    },
};
</script>