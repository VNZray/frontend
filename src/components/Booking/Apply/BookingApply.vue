<template>
  <div style="
      height: 100vh;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url('/public/Matukad-Island-Caramoan.webp');
      background-size: cover;
      background-repeat: no-repeat;
    ">
    <div style="
        width: 40%;
        height: auto;
        max-height: 90%;
        margin-top: 80px;
        background-color: rgba(255, 255, 255);
        backdrop-filter: blur(5px);
        overflow-y: auto;
      ">
      <div class="container">
        <v-tabs v-model="tab" bg-color="primary" class="hiddenTab">
          <v-tab value="owner">Owner Information</v-tab>
          <v-tab value="establishment">Establishment Information</v-tab>
        </v-tabs>

        <v-card-text>
          <form @submit.prevent="submitForm">
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="owner">
                <h1>Owner Information</h1>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_first_name" label="First Name:"
                      variant="outlined"></v-text-field>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_middle_name" label="Middle Name:"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_last_name" label="Last Name:"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_contact_number" label="Contact Number:"
                      variant="outlined"></v-text-field>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_email" label="Email Address:"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-date-input prepend-icon="" prepend-inner-icon="mdi-calendar"
                      v-model="model.owner.owner_birthdate" label="Birthdate:" placeholder="MM/DD/YYYY"
                      :allowed-date-formats="['MM/DD/YYYY']" variant="outlined"></v-date-input>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-select v-model="model.owner.owner_gender" label="Gender" :items="owner_gender_options"
                      variant="outlined" type="text" required></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-select v-model="model.owner.owner_civil_status" label="Civil Status"
                      :items="owner_civil_status_options" variant="outlined" type="text" required></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-select v-model="model.owner.owner_province" label="Province:" :items="province_options"
                      variant="outlined" type="text" required></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-select v-model="model.owner.owner_municipality" label="Municipality"
                      :items="municipality_options" variant="outlined" type="text" required></v-select>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-select v-model="model.owner.owner_barangay" label="Barangay" :items="barangay_options"
                      variant="outlined" type="text" required></v-select>
                  </v-col>
                </v-row>

                <div class="owner-btn">
                  <v-btn style="background-color: #1e1e1e" @click="prevTab">Back</v-btn>
                  <v-btn type="button" @click="nextTab" style="background-color: #1e4e72">Next</v-btn>
                </div>
              </v-tabs-window-item>

              <v-tabs-window-item value="establishment">
                <h1>Establishment Information</h1>
                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.establishment.establishment_name" label="Establishment Name"
                      variant="outlined" required></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-select :items="barangay_options" v-model="model.establishment.establishment_address"
                      label="Establishment Address" variant="outlined" required></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.establishment.establishment_email" label="Establishment Email"
                      variant="outlined" required></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.establishment.establishment_contact_number"
                      label="Establishment Contact Number" variant="outlined" type="text" required></v-text-field>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-select v-model="model.establishment.establishment_type" :items="establishment_options"
                      label="Establishment Type" variant="outlined" required></v-select>
                  </v-col>
                </v-row>

                <h4 style="font-size: 20px; color: #1e4e72; text-align: center">
                  Business Permits
                </h4>

                <div class="box">
                  <v-row style="margin: 15px 0">
                    <v-col style="padding: 10px 15px">
                      <h5 style="font-size: 16px">Permit 1</h5>
                      <h5 style="font-size: 16px">Permit 2</h5>
                      <h5 style="font-size: 16px">Permit 3</h5>
                    </v-col>

                    <v-col style="padding: 10px 15px">
                      <h5 style="font-size: 16px">Permit 4</h5>
                      <h5 style="font-size: 16px">Permit 5</h5>
                      <h5 style="font-size: 16px">Permit 6</h5>
                    </v-col>
                  </v-row>
                </div>

                <v-row style="margin-top: 10px">
                  <v-col style="padding: 10px 15px 0 15px">
                    <v-file-input v-model="model.establishment.business_permits" label="Upload Business Permits"
                      multiple variant="outlined"></v-file-input>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <hr style="margin-bottom: 10px" />
                  </v-col>
                </v-row>

                <v-col>
                  <v-row>
                    <v-icon left>mdi-information-outline</v-icon>
                    <p>
                      Note: We only accept Establishments located in Caramoan
                      Area
                    </p>
                  </v-row>
                </v-col>

                <v-row v-for="(establishment, index) in additional_establishments" :key="index">
                  <v-col style="margin-top: 40px">
                    <h3 class="text-center"> New Establishment </h3>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="establishment.establishment_name"
                      :label="'Establishment Name ' + (index + 2)" variant="outlined" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select :items="barangay_options" v-model="establishment.establishment_address"
                      label="Establishment Address" variant="outlined" required></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="establishment.establishment_email" label="Establishment Email"
                      variant="outlined" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="establishment.establishment_contact_number"
                      label="Establishment Contact Number" variant="outlined" type="text" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select v-model="establishment.establishment_type" :items="establishment_options"
                      label="Establishment Type" variant="outlined" required></v-select>
                  </v-col>

                  <v-col cols="12">
                    <h4 style="
                        font-size: 20px;
                        color: #1e4e72;
                        text-align: center;
                      ">
                      Business Permits
                    </h4>
                  </v-col>

                  <v-col cols="12">
                    <div class="box">
                      <v-row style="margin: 15px 0">
                        <v-col style="padding: 10px 15px">
                          <h5 style="font-size: 16px">Permit 1</h5>
                          <h5 style="font-size: 16px">Permit 2</h5>
                          <h5 style="font-size: 16px">Permit 3</h5>
                        </v-col>

                        <v-col style="padding: 10px 15px">
                          <h5 style="font-size: 16px">Permit 4</h5>
                          <h5 style="font-size: 16px">Permit 5</h5>
                          <h5 style="font-size: 16px">Permit 6</h5>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <v-file-input v-model="establishment.business_permits" label="Upload Business Permits" multiple
                      variant="outlined"></v-file-input>
                  </v-col>

                  <v-col cols="12">
                    <v-row>
                      <v-col>
                        <hr />
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12">
                    <v-col style="padding-top: 0">
                      <v-row>
                        <v-icon left>mdi-information-outline</v-icon>
                        <p>
                          Note: We only accept Establishments located in
                          Caramoan Area
                        </p>
                      </v-row>
                    </v-col>
                  </v-col>
                </v-row>

                <div class="establishment-btn">
                  <v-btn type="button" @click="prevTab" style="background-color: #1e1e1e">Back</v-btn>
                  <v-btn class="deleteButton" color="red" @click="delete_establishment_form(index)">
                    Remove
                  </v-btn>
                  <v-btn class="AddButton" color="primary" @click="add_establishment_form">
                    Add
                  </v-btn>
                  <v-btn type="submit" style="background-color: #1e4e72">Submit</v-btn>
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
          </form>

          <v-dialog v-model="paymentDialog" max-width="600" style="height: auto">
            <v-card>
              <v-card-text>
                <form @submit.prevent="submitPayment">
                  <h1>Membership Payment</h1>
                  <v-row style="margin-top: 25px">
                    <v-col style="padding: 10px 15px">
                      <v-text-field v-model="model.payment.payment_amount" class="custom-text-field" label="Amount:"
                        variant="outlined" type="number" id="payment_amount" name="payment_amount"
                        required></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="8" style="padding: 10px 15px">
                      <v-select v-model="model.payment.payment_method" label="Payment Method"
                        :items="['Gcash', 'Paymaya', 'GoTyme']" variant="outlined" type="text" id="payment_method"
                        name="payment_method" required></v-select>
                    </v-col>

                    <v-col cols="4" style="padding: 10px 15px">
                      <v-btn @click="dialog = true" style="
                          width: 100%;
                          margin: 0;
                          height: 56px;
                          background-color: #1e4e72;
                          color: white;
                        ">Scan</v-btn>
                    </v-col>

                    <v-dialog v-model="dialog" width="auto" style="height: auto">
                      <v-card>
                        <v-card-actions>
                          <div v-if="model.payment.payment_method === 'Gcash'" style="width: 400px; height: auto">
                            <img src="../Accommodation/Profile/qr_core/qr_img.png" width="100%" alt="null" />
                            <h1 style="margin-bottom: 0">Scan Gcash QR Code</h1>
                            <span>or send to</span>
                            <h1>09380417303</h1>
                          </div>
                          <div v-else-if="
                            model.payment.payment_method === 'Paymaya'
                          " style="width: 400px; height: auto">
                            <img src="../Accommodation/Profile/qr_core/qr_img.png" width="100%" alt="null" />
                            <h1 style="margin-bottom: 0">
                              Scan PayMaya QR Code
                            </h1>
                            <span>or send to</span>
                            <h1>09380417303</h1>
                          </div>
                          <div v-else-if="
                            model.payment.payment_method === 'GoTyme'
                          " style="width: 400px; height: auto">
                            <img src="../Accommodation/Profile/qr_core/qr_img.png" width="100%" alt="null" />
                            <h1 style="margin-bottom: 0">
                              Scan GoTyme QR Code
                            </h1>
                            <span>or send to</span>
                            <h1>09380417303</h1>
                          </div>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>

                  <v-row>
                    <v-col style="padding: 10px 15px">
                      <v-combobox v-model="model.payment.payment_type" label="Payment Type"
                        :items="['Membership Payment']" variant="outlined" type="text" id="payment_type"
                        name="payment_type" required></v-combobox>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col style="padding: 10px 15px">
                      <v-text-field v-model="model.payment.reference_number" class="custom-text-field"
                        label="Reference No:" variant="outlined" type="text" id="reference_number"
                        name="reference_number" required></v-text-field>
                    </v-col>
                  </v-row>

                  <div class="buttons">
                    <v-btn type="button" @click="paymentReceiptDialog = false"
                      style="background-color: #1e1e1e; color: white">Back</v-btn>
                    <v-btn type="submit" @click="paymentReceiptDialog = true"
                      style="background-color: #1e4e72; color: white">Submit</v-btn>
                  </div>
                </form>
              </v-card-text>

              <v-dialog v-model="paymentReceiptDialog" width="auto" style="height: auto">
                <v-card>
                  <v-card-text id="receipt-content">
                    <v-row>
                      <v-col style="padding: 0; margin: 7px 0 0 0">
                        <h1 style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 600px;
                            height: 180px;
                            margin: 0;
                            font-weight: 900;
                            font-size: 50px;
                            color: white;
                            background-color: #1e4e72;
                          ">
                          {{ establishment.establishment_name }}
                        </h1>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <h2 style="text-align: center; font-weight: 900">
                          ACOTA Payment Receipt
                        </h2>
                      </v-col>
                    </v-row>

                    <v-card-text>
                      <hr />
                    </v-card-text>

                    <v-col cols="12">
                      <v-row>
                        <h1 style="
                            text-align: center;
                            width: 100%;
                            font-weight: 800;
                            font-size: 40px;
                          ">
                          {{ payment.payment_amount }}.00 PHP
                        </h1>
                      </v-row>
                      <v-row>
                        <h2 style="
                            text-align: center;
                            margin-top: -20px;
                            width: 100%;
                          ">
                          Amount
                        </h2>
                      </v-row>
                    </v-col>

                    <hr style="margin: 40px 0 20px 0" />

                    <v-row>
                      <v-col>
                        <h4>Reference no: {{ payment.reference_number }}</h4>
                      </v-col>

                      <v-col>
                        <h4 style="text-align: right">Date: {{ payment.payment_date }}</h4>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col style="padding-top: 0">
                        <h4>Paymend ID: {{ payment.id }}</h4>
                      </v-col>

                      <v-col style="padding-top: 0">
                        <h4 style="text-align: right"> {{ payment.payment_type }}</h4>
                      </v-col>
                    </v-row>

                    <hr style="margin-top: 20px" />

                    <br /><br />
                    <v-row>
                      <v-col>
                        <h3 style="
                            color: #22bb33;
                            font-size: 24px;
                            text-align: center;
                          ">
                          Payment Success
                        </h3>
                        <h4 style="
                            color: #22bb33;
                            font-size: 24px;
                            text-align: center;
                          ">
                          Thank you!
                        </h4>
                      </v-col>
                    </v-row>
                    <br /><br />
                    <hr />
                  </v-card-text>

                  <hr />
                  <v-card-actions style="gap: 10px">
                    <v-btn type="button" style="margin: 0; width: 49%; color: #1e4e72"
                      @click="paymentReceiptDialog = false">Close</v-btn>
                    <v-btn type="button" style="margin: 0; width: 49%; color: #1e4e72"
                      @click="downloadReceipt">Download</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-dialog>
        </v-card-text>
      </div>
    </div>
  </div>
</template>

<script>
import { provinceOptions, municipalityOptions, barangayOptions } from '../../options';
import axios from "axios";
import html2canvas from 'html2canvas';

export default {
  data() {
    return {
      tab: "owner",
      paymentReceiptDialog: false,
      paymentDialog: false,
      dialog: false,

      password: null,

      owner: {},
      establishment: {},
      membership: {},
      payment: {},

      model: {
        owner: {
          owner_first_name: null,
          owner_middle_name: null,
          owner_last_name: null,
          owner_contact_number: "+63",
          owner_email: null,
          owner_age: null,
          owner_province: null,
          owner_municipality: null,
          owner_barangay: null,
          owner_civil_status: null,
          owner_gender: null,
          owner_birthdate: null,
        },

        establishment: {
          establishment_name: null,
          establishment_capacity: null,
          establishment_total_room: null,
          establishment_address: null,
          establishment_email: null,
          establishment_contact_number: "+63",
          establishment_type: null,
          establishment_description: null,
        },

        payment: {
          establishment_id: null,
          payment_name: null,
          payment_amount: null,
          payment_method: null,
          payment_type: null,
          reference_number: null,
          payment_date: null,
        },

        membership: {
          membership_status: null,
          membership_date: null,
          establishment_name: null,
          establishment_id: null,
        },
      },
      additional_establishments: [],
      owner_gender_options: ["M", "F"],
      owner_civil_status_options: ["Single", "Married", "Divorced", "Widowed"],
      province_options: provinceOptions,
      municipality_options: municipalityOptions,
      barangay_options: barangayOptions,
      establishment_options: ["Hotel", "Homestay", "Resort", "Inn"].sort(),
    };
  },
  methods: {
    formatDateToYYYYMMDD(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    async submitForm() {

      const ownerData = {
        owner_first_name: this.model.owner.owner_first_name,
        owner_middle_name: this.model.owner.owner_middle_name,
        owner_last_name: this.model.owner.owner_last_name,
        owner_contact_number: this.model.owner.owner_contact_number,
        owner_email: this.model.owner.owner_email,
        owner_age: null,
        owner_province: this.model.owner.owner_province,
        owner_municipality: this.model.owner.owner_municipality,
        owner_barangay: this.model.owner.owner_barangay,
        owner_civil_status: this.model.owner.owner_civil_status,
        owner_gender: this.model.owner.owner_gender,
        owner_birthdate: this.formatDateToYYYYMMDD(this.model.owner.owner_birthdate), // Format date
      };

      console.log(ownerData);

      try {

        const birthdate = this.model.owner.owner_birthdate;
        if (birthdate) {
          const today = new Date();
          const birthDate = new Date(birthdate);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();

          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
          }
          ownerData.owner_age = age;
        }

        // INSERT OWNER DATA
        const ownerResponse = await axios.post(
          "http://127.0.0.1:8000/api/owner",
          ownerData
        );
        console.log("owner data:", ownerResponse.data);
        const owner_id = ownerResponse.data.Owner.id;
        this.owner = ownerResponse.data.Owner;

        console.log("Owner ID: " + owner_id);

        const establishmentData = {
          owner_id: owner_id,
          establishment_email: this.model.establishment.establishment_email,
          establishment_capacity: this.model.establishment.establishment_capacity,
          establishment_total_room: this.model.establishment.establishment_total_room,
          establishment_contact_number: this.model.establishment.establishment_contact_number,
          establishment_type: this.model.establishment.establishment_type,
          establishment_address: this.model.establishment.establishment_address,
          show: "Private",
          establishment_name: this.model.establishment.establishment_name,
        };

        // INSERT ESTABLISHMENT DATA
        const establishmentResponse = await axios.post(
          "http://127.0.0.1:8000/api/establishment",
          establishmentData
        );

        console.log("Establishment data:", establishmentResponse.data);
        const establishment_id = establishmentResponse.data.Establishment.id;
        this.establishment = establishmentResponse.data.Establishment;

        console.log("Owner ID: " + owner_id);
        console.log("Establishment ID: " + establishment_id);

        this.paymentDialog = true;

      } catch (error) {
        console.error("Error during form submission:", error);
      }
    },
    async submitPayment() {
      const paymentData = {
        establishment_id: this.establishment.id,
        payment_name:
          this.owner.owner_first_name +
          " " +
          this.owner.owner_last_name,
        payment_amount: this.model.payment.payment_amount,
        payment_method: this.model.payment.payment_method,
        payment_type: this.model.payment.payment_type,
        reference_number: this.model.payment.reference_number,
        payment_date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
      };

      const membershipData = {
        membership_status: "Pending",
        membership_date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        establishment_id: this.establishment.id,
        establishment_name: this.model.establishment.establishment_name
      };
      // INSERT PAYMENT DATA
      const paymentResponse = await axios.post(
        "http://127.0.0.1:8000/api/membership_payment",
        paymentData
      );
      console.log("Payment data:", paymentResponse.data);
      const membership_payment_id = paymentResponse.data.MembershipPayment.id;
      this.payment = paymentResponse.data.MembershipPayment;

      // INSERT MEMBERSHIP DATA
      const membershipResponse = await axios.post(
        "http://127.0.0.1:8000/api/membership",
        membershipData
      );
      console.log("Membership data:", membershipResponse.data);
      const membership_id = membershipResponse.data.Membership.id;
      this.membership = membershipResponse.data.Membership;

      console.log("Payment ID: " + membership_payment_id);
      console.log("Membership ID: " + membership_id);

      this.model.owner.owner_first_name = "",
      this.model.owner.owner_middle_name = "",
      this.model.owner.owner_last_name = "",
      this.model.owner.owner_contact_number = "",
      this.model.owner.owner_email = "",
      this.model.owner.owner_age = "",
      this.model.owner.owner_province = "",
      this.model.owner.owner_municipality = "",
      this.model.owner.owner_barangay = "",
      this.model.owner.owner_civil_status = "",
      this.model.owner.owner_gender = "",
      this.model.owner.owner_birthdate = "",

      this.model.establishment.establishment_name = "",
      this.model.establishment.establishment_capacity = "",
      this.model.establishment.establishment_total_room = "",
      this.model.establishment.establishment_address = "",
      this.model.establishment.establishment_email = "",
      this.model.establishment.establishment_contact_number = "",
      this.model.establishment.establishment_type = "",
      this.model.establishment.establishment_description = "",

      this.paymentDialog = false;
      this.paymentReceiptDialog = true;
    },
    async downloadReceipt() {
      const receiptElement = document.getElementById('receipt-content');
      const canvas = await html2canvas(receiptElement);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'receipt.png';
      link.click();
    },
    nextTab() {
      if (this.tab === "owner") {
        this.tab = "establishment";
      }
    },
    prevTab() {
      if (this.tab === "establishment") {
        this.tab = "owner";
      }
    },
    add_establishment_form() {
      // Add a new empty establishment object to additional_establishments array
      this.additional_establishments.push({
        establishment_name: null,
        establishment_address: null,
        establishment_email: null,
        establishment_contact_number: null,
        establishment_type: null,
      });
    },
    delete_establishment_form(index) {
      // Remove establishment at given index from additional_establishments array
      this.additional_establishments.splice(index, 1);
    },
  },
};
</script>


<style scoped>
.hiddenTab {
  display: none;
}

.container {
  height: auto;
  box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 15px;
}

.establishment-btn .v-btn {
  width: 22%;
  height: 40px;
  margin: 15px 0 0 0;
  color: white;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
  border-style: none;
  display: flex;
}

.owner-btn .v-btn,
.v-btn {
  width: 47.3%;
  height: 40px;
  margin: 15px 0 0 0;
  color: white;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
  border-style: none;
  display: flex;
}

.v-btn:hover {
  background-color: rgb(153, 142, 142);
  color: white;
}

h1 {
  color: #1e4e72;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 20px;
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
  background-color: #ffff;
  color: #15344c;
  font-size: 16px;
}

.establishment-btn,
.owner-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;
  border-radius: 10px;
}

.error {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  color: #1e4e72;
}

.box {
  border-color: #1e4e72;
  border-style: dashed;
  border-width: 3px;
}

.buttons {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  border-radius: 10px;
}

span {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e4e72;
  font-weight: 900;
}
</style>