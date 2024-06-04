<template>
  <v-container fluid style="height: 100vh; background-image: url('/public/Matukad-Island-Caramoan.webp'); background-size: cover; background-repeat: no-repeat;">
    <v-row justify="center" align="center" style="height: 100%;">
      <v-col cols="12" sm="12" md="4">
        <v-card width="100%" style="background-color: rgba(255, 255, 255, 0.8); backdrop-filter: blur(5px);">
          <div class="container">
            <h1>Login Here</h1>
            <div class="login">
              <form @submit.prevent="login" method="post">
                <div class="email_field">
                  <label for="email">Email:</label>
                  <input type="email" v-model="email" :class="{ 'error-border': emailError }" name="email" id="email" placeholder="Enter your email" />
                  <p v-if="emailError" class="error-message">{{ emailError }}</p>
                </div>
                <div class="password_field">
                  <label for="password">Password:</label><br />
                  <input type="password" v-model="password" :class="{ 'error-border': passwordError }" name="password" id="password" placeholder="Enter your password" />
                  <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
                </div>
                <div class="account_type_field">
                  <label for="accountType">Account Type:</label><br />
                  <select v-model="account_type" :class="{ 'error-border': accountTypeError }" name="account_type" id="account_type">
                    <option value="" disabled selected>Select account type</option>
                    <option value="Admin">Admin</option>
                    <option value="Owner">Owner</option>
                    <option value="Guest">Guest</option>
                  </select>
                  <p v-if="accountTypeError" class="error-message">{{ accountTypeError }}</p>
                </div>
                <v-btn class="login-btn" type="submit">Log In</v-btn>
                <v-btn class="register-btn" @click="register">Register</v-btn>
                <p>Developed by: CCS 2nd Year BSIT</p>
              </form>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: "",
      password: "",
      account_type: "",
      emailError: "",
      passwordError: "",
      accountTypeError: "",
    };
  },
  methods: {
    login() {
      // Reset errors
      this.emailError = "";
      this.passwordError = "";
      this.accountTypeError = "";

      // Validate inputs
      if (this.email === "") {
        this.emailError = "Please enter your email.";
      }
      if (this.password === "") {
        this.passwordError = "Please enter your password.";
      }
      if (this.account_type === "") {
        this.accountTypeError = "Please select an account type.";
      }

      // If any errors, stop submission
      if (this.emailError || this.passwordError || this.accountTypeError) {
        return;
      }

      // Send login request
      axios.post('http://127.0.0.1:8000/api/login', {
        email: this.email,
        password: this.password,
        account_type: this.account_type
      })
        .then(response => {
          const account = response.data.Account;

          if (response.data.status === 200) {
            if (this.account_type === 'Admin' && account.account_type === 'Admin') {
              this.$router.push("/admin/dashboard");
            } else if (this.account_type === 'Guest' && account.account_type === 'Guest') {
              this.$router.push(`/booking/establishment/account/${account.guest_id}`);
            } else if (this.account_type === 'Owner' && account.account_type === 'Owner') {
              this.$router.push(`/owner/dashboard/${account.owner_id}`);
            } else {
              this.emailError = "Login failed. Account type mismatch.";
            }
          } else {
            this.emailError = response.data.message || "Login failed.";
          }
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 401) {
              this.passwordError = "Incorrect password. Please try again.";
            } else if (error.response.status === 404) {
              this.emailError = "Account not found.";
            } else {
              this.emailError = "An error occurred. Please try again.";
            }
          } else {
            this.emailError = "An error occurred. Please try again.";
          }
        });
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>
<style scoped>
.container {
  padding: 60px 40px 40px 40px;
  border-radius: 15px;
}

.login {
  padding: 15px 0 0 0;
}

.login-btn {
  width: 100%;
  height: 55px;
  margin: 15px 0 0 0;
  background-color: #1E4E72;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 18px;
}

.register-btn {
  width: 100%;
  height: 55px;
  margin: 15px 0 0 0;
  box-shadow: 1px 1px 1px 1px rgba(255, 255, 255, 0.2);
  background-color: #111111;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 18px;
}

.login-btn:hover,
.register-btn:hover {
  background-color: #15344c;
}

h1 {
  color: #1E4E72;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
}

label {
  font-size: 20px;
}

.email_field,
.password_field,
.account_type_field {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 0 15px 0;
  row-gap: 5px;
}

input[type="email"],
input[type="password"],
select {
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  background-color: #efefef;
  color: #15344c;
  font-size: 18px;
}

input.error-border,
select.error-border {
  border-color: red;
}

.error-message {
  margin-top: 5px;
  color: red;
  font-size: 14px;
  text-align: left;
}

.checkbox+label::before {
  content: "";
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 2px solid #4d4d4d;
  border-radius: 5px;
  margin-right: 10px;
  vertical-align: middle;
}

p {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  margin: 30px 0 0 0;
  color: #1E4E72;
}
</style>
