<template>
    <v-navigation-drawer expand-on-hover rail style="background-color: #1e4e72; color: white">
        <v-list>
            <v-list-item :prepend-avatar="avatarUrl" :title="`${account.name}`"
                :subtitle="`${account.account_type}`"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Home" value="home"
            :to="{ name: 'HomepageLoggedIn', params: { account_id: account.guest_id } }"
            ></v-list-item>            <v-list-item prepend-icon="mdi-book-open" title="Booking" value="shared"
            :to="{ name: 'guestBooking', params: { account_id: account.guest_id } }"
            ></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="My Profile" value="MyProfile"
                :to="{ name: 'GuestProfile', params: { account_id: account.guest_id } }"></v-list-item>
        </v-list>

        <template v-slot:append>
            <div class="pb-2">
                <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" to="/login"></v-list-item>
            </div>
        </template>
    </v-navigation-drawer>
</template>


<script>
import axios from "axios";

export default {
    data() {
        return {
            accommodations: {},
            account: {}, // Handle account state locally
            logoutDialog: false, // Dialog state
            avatarUrl: "https://cdn-icons-png.flaticon.com/128/10438/10438143.png",

        };
    },
    created() {
        this.fetchAccount();
        this.fetchAccountId();
        this.fetchEstablishment();
        this.fetchEstablishmentId();
    },
    methods: {
        navigateToHomepage() {
            const guest_id = this.$route.params.account_id;

            this.$router.push(`/account/${guest_id}`);
        },
        fetchEstablishment() {
            axios
                .get("http://127.0.0.1:8000/api/establishment")
                .then((response) => {
                    console.log("Establishment data:", response.data); // Log the response
                    this.accommodations = response.data.Establishment;
                })
                .catch((error) => {
                    console.error("Error fetching establishment:", error);
                });
        },
        fetchEstablishmentId() {
            const establishment_id = this.$route.params.establishment_id;

            axios
                .get(`http://127.0.0.1:8000/api/establishment/${establishment_id}`)
                .then((response) => {
                    console.log("Establishment data:", response.data); // Log the response
                    this.accommodations = response.data.Establishment;
                })
                .catch((error) => {
                    console.error("Error fetching establishment:", error);
                });
        },
        fetchAccount() {
            axios
                .get("http://127.0.0.1:8000/api/account")
                .then((response) => {
                    console.log("Account data:", response.data); // Log the response
                    this.account = response.data.Account;
                })
                .catch((error) => {
                    console.error("Error fetching account:", error);
                });
        },
        fetchAccountId() {
            const account_id = this.$route.params.account_id;
            if (account_id) {
                axios
                    .get(`http://127.0.0.1:8000/api/guest_account/${account_id}`)
                    .then((response) => {
                        this.account = response.data.Account;
                        console.log("Account data:", this.account);
                    })
                    .catch((error) => {
                        console.error("Error fetching account:", error);
                    });
            } else {
                console.error("Account ID is undefined");
            }
        },
        showLogoutDialog() {
            this.logoutDialog = true;
        },
        confirmLogout() {
            this.account = {}; // Clear the account data locally
            this.logoutDialog = false;
            this.$router.push({ name: "Login" });
        },
        cancelLogout() {
            this.logoutDialog = false;
        },
        openLogout() {
            this.logoutDialog = true;
        },
        confirmLogout() {
            this.logoutDialog = false;
            this.$router.push({ name: "Login" });
        },
    },
};
</script>