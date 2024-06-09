<template>
  <v-navigation-drawer expand-on-hover rail style="background-color: #1e4e72; color: white">
    <v-list>
      <v-list-item :prepend-avatar="avatarUrl" :title="`${account.name}`" subtitle="Member Account"></v-list-item>
      </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"
        :to="{ name: 'OwnerDashboard', params: { owner_id: account.owner_id } }"></v-list-item>
      <v-list-item prepend-icon="mdi-calendar" title="Reservations" :to="{
        name: 'OwnerReservation',
        params: { owner_id: account.owner_id },
      }"></v-list-item>
      <v-list-item prepend-icon="mdi-food" title="Menu"
        :to="{ name: 'OwnerMenu', params: { owner_id: account.owner_id } }"></v-list-item>
      <v-list-item prepend-icon="mdi-receipt" title="Order"
        :to="{ name: 'OwnerOrder', params: { owner_id: account.owner_id } }"></v-list-item>
      <v-list-item prepend-icon="mdi-home-city" title="My Establishments" :to="{
        name: 'OwnerEstablishmentProfile',
        params: { owner_id: account.owner_id },
      }"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="Profile"
        :to="{ name: 'OwnerProfile', params: { owner_id: account.owner_id } }"></v-list-item>
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
              <v-btn style="width: 100%;">Cancel</v-btn>
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
      logoutDialog: false, // Dialog state
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
            console.log(this.accommodations.id);
            console.log(this.accommodations.id);
            console.log(this.accommodations.id);
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
    confirmLogout() {
      this.logoutDialog = false;
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
