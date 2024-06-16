<template>
    <v-container fluid style="
      height: 100vh;
      background-image: url('/public/Matukad-Island-Caramoan.webp');
      background-size: cover;
      background-repeat: no-repeat;
    ">
      <v-row justify="center" align="center" style="height: 100%">
        <v-col cols="12" sm="12" md="4">
          <v-card width="100%" style="
            background-color: rgba(255, 255, 255);
            backdrop-filter: blur(5px);
          ">
            <div class="container">
              <h1>Register Account</h1>
  
              <form @submit.prevent="submitForm" method="post">
                <v-row>
                  <v-col style="padding: 10px 15px;">
                    <v-text-field label="First Name:" variant="outlined" type="text" id="first_name"
                      name="first_name" v-model="model.guest.guest_first_name"
                      required></v-text-field>
                  </v-col>
  
                  <v-col style="padding: 10px 15px;">
                    <v-text-field label="Middle Name:" variant="outlined" type="text" id="middle_name"
                      name="middle_name" v-model="model.guest.guest_middle_name"></v-text-field>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col style="padding: 10px 15px;">
                    <v-text-field label="Last Name:" variant="outlined" type="text" id="last_name"
                      name="last_name" v-model="model.guest.guest_last_name" required></v-text-field>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col style="padding: 10px 15px;">
                    <v-text-field prepend-inner-icon="mdi-phone" label="Contact Number:" variant="outlined" type="text"
                      id="contact_number" name="contact_number" v-model="model.guest.contact_number"
                      required></v-text-field>
                  </v-col>
  
                  <v-col style="padding: 10px 15px;">
                    <v-text-field prepend-inner-icon="mdi-email" label="Email Address:" variant="outlined" type="email" id="email"
                      name="email" v-model="model.account.email" required></v-text-field>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col style="padding: 10px 15px;">
                    <v-select label="Province" :items="province_options" variant="outlined"
                      type="text" id="province" name="province" v-model="model.guest.province"
                      required></v-select>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col style="padding: 10px 15px;">
                    <v-select label="Municipality" :items="municipality_options" variant="outlined"
                      type="text" id="municipality" name="municipality"
                      v-model="model.guest.municipality" required></v-select>
                  </v-col>
  
                  <v-col style="padding: 10px 15px;">
                    <v-select label="Barangay" :items="barangay_options" variant="outlined"
                      type="text" id="barangay" name="barangay" v-model="model.guest.barangay"
                      required></v-select>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col style="padding: 10px 15px;">
                    <v-text-field prepend-inner-icon="mdi-lock" label="Password:" variant="outlined" type="password" id="password"
                      name="password" v-model="model.account.password" required></v-text-field>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col style="padding: 10px 15px;">
                    <v-text-field prepend-inner-icon="mdi-lock" label="Confirm Password:" variant="outlined" type="password"
                      id="confirmPassword" name="confirmPassword" v-model="confirmPassword"
                      required></v-text-field>
                  </v-col>
                </v-row>
  
                <div v-if="passwordMismatch" class="error">
                  {{ passwordMismatch }}
                </div>
  
                <div class="buttons">
                  <v-btn to="/login" style="background-color: #1e1e1e">Back</v-btn>
                  <v-btn type="submit" style="background-color: #1e4e72">Submit</v-btn>
                </div>
              </form>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { provinceOptions, municipalityOptions, barangayOptions } from '../options';
  import axios from "axios";
  
  export default {
    name: "account",
    data() {
      return {
        model: {
          account: {
            name: "",
            email: "",
            password: "",
          },
          guest: {
            contact_number: "+63",
            province: "",
            municipality: "",
            barangay: "",
          },
        },
        confirmPassword: "",
        errorList: {},
        passwordMismatch: "",
  
        province_options: provinceOptions,
        municipality_options: municipalityOptions,
        barangay_options: barangayOptions,
      };
    },
    methods: {
      async submitForm() {
        if (this.model.account.password !== this.confirmPassword) {
          this.passwordMismatch = "Passwords do not match";
          return;
        }
  
        // Reset error messages
        this.passwordMismatch = "";
        this.submitError = "";
  
        // Set loading state
        this.isLoading = true;
  
        const guestData = {
          guest_first_name: this.model.guest.guest_first_name,
          guest_middle_name: this.model.guest.guest_middle_name,
          guest_last_name: this.model.guest.guest_last_name,
          guest_email: this.model.account.email,
          guest_contact_no: this.model.guest.contact_number,
          guest_province: this.model.guest.province,
          guest_municipality: this.model.guest.municipality,
          guest_barangay: this.model.guest.barangay,
        };
  
        try {
          const guestResponse = await axios.post("http://127.0.0.1:8000/api/guest", guestData);
          console.log("Guest data:", guestResponse.data);
          const guest_id = guestResponse.data.Guest.id;
  
          const accountData = {
            name: this.model.guest.guest_first_name + " " + this.model.guest.guest_last_name,
            email: this.model.account.email,
            password: this.model.account.password,
            account_type: "Guest",
            guest_id: guest_id,
          };
  
          const accountResponse = await axios.post("http://127.0.0.1:8000/api/account", accountData);
          console.log("Account data:", accountResponse.data);
          const account_id = accountResponse.data.Account.id;
          const account_guest_id = accountResponse.data.Account.guest_id;
          const account_owner_id = accountResponse.data.Account.owner_id;
  
          console.log("Guest ID: " + guest_id);
          console.log("Account ID: " + account_id);
          console.log("Account Guest ID: " + account_guest_id);
          console.log("Account Owner ID: " + account_owner_id);
  
          // Redirect to login
          this.$router.push("/login");
        } catch (error) {
          console.error("Error during form submission:", error);
        } finally {
          this.isLoading = false;
        }
      },
      clearForm() {
        this.model.account = {
          name: "",
          email: "",
          password: "",
        };
        this.model.guest = {
          contact_number: "",
          province: "",
          municipality: "",
          barangay: "",
        };
        this.confirmPassword = "";
        this.passwordMismatch = "";
        this.errorList = {};
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    height: auto;
    box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 15px;
  }
  
  .v-btn {
    width: 47%;
    height: 40px;
    margin: 15px 0 0 0;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 15px;
    border-style: none;
  }
  
  .v-btn:hover {
    background-color: #15344c;
  }
  
  h1 {
    color: #1e4e72;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 30px;
  }
  
  label {
    font-size: 18px;
  }
  
  input[type="email"],
  input[type="password"],
  input[type="text"] {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 20px;
    border-style: solid;
    border-width: 2px;
    padding: 0 10px;
    box-sizing: border-box;
  }
  
  select {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 20px;
    border-style: solid;
    border-width: 2px;
    padding: 0 10px;
    box-sizing: border-box;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .error {
    color: red;
    font-size: 14px;
  }
  </style>
  