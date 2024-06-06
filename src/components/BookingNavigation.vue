<template>
  <header>
    <v-brand>
      <h3>ACOTA</h3>
    </v-brand>

    <v-navigation v-if="account.id">
      <ul class="nav-links">
        <li>
          <RouterLink :to="{ name: 'HomepageLoggedIn', params: { account_id: account.guest_id } }">Home</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'EstablsihmentsLoggedIn', params: { account_id: account.guest_id } }">Booking
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'BookingPageApplyLoggedIn', params: { account_id: account.guest_id } }">Apply
          </RouterLink>
        </li>
        <li>
          <a href="#" @click.prevent="showLogoutDialog">Logout</a>
        </li>
        <li>
          <RouterLink :to="{ name: 'GuestProfile', params: { account_id: account.guest_id } }">{{ account.name }}</RouterLink>
        </li>
      </ul>
    </v-navigation>

    <v-navigation v-else>
      <ul class="nav-links">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/booking/establishment">Booking</RouterLink>
        </li>
        <li>
          <RouterLink to="/booking/apply-membership">Apply</RouterLink>
        </li>
        <li>
          <RouterLink to="/login">Login</RouterLink>
        </li>
      </ul>
    </v-navigation>

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
              <v-btn @click="cancelLogout" style="width: 100%;" >Cancel</v-btn>
            </v-col>

            <v-col>
              <v-btn @click="confirmLogout" style="width: 100%;" color="primary" >Logout</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </header>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      accommodations: {},
      account: {}, // Handle account state locally
      logoutDialog: false, // Dialog state
    };
  },
  created() {
    this.fetchAccount();
    this.fetchAccountId();
    this.fetchEstablishment();
    this.fetchEstablishmentId();
  },
  methods: {
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
    cancelLogout(){
      this.logoutDialog = false;
    }
  },
};
</script>

<style>
* {
  font-family: 'Poppins', sans-serif;
}

header {
  padding: 0 30px;
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.nav-links {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: white;
}

.nav-links li {
  margin-left: 50px;
}

a {
  color: white;
  text-decoration: none;
  font-size: larger;
}

h3 {
  font-size: 30px;
  font-weight: 900;
}

.logout-dialog {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logout-dialog .headline {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
}

.logout-dialog .v-divider {
  margin: 12px 0;
}

.logout-dialog .v-card-actions {
  padding: 16px;
}
</style>
