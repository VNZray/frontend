<template>
    <v-container style="padding: 0;">
        <v-card-text>
            <v-tabs v-model="tab" bg-color="primary" class="hiddenTab">
                <v-tab value="booking">Item One</v-tab>
                <v-tab value="payment">Item Two</v-tab>
            </v-tabs>

            <form @submit.prevent="submitBooking">
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="booking">
                        <h1>Booking Form</h1>
                        <v-row style="margin-top: 25px;">
                            <v-col style="padding: 10px 15px">
                                <v-text-field v-model="model.booking.room_number" class="custom-text-field"
                                    label="Room Number:" variant="outlined" type="number" id="room_number"
                                    name="room_number" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col style="padding: 10px 15px">
                                <v-text-field v-model="model.booking.booking_total_pax" class="custom-text-field"
                                    label="Total Pax:" variant="outlined" type="number" id="booking_total_pax"
                                    name="booking_total_pax" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col style="padding: 10px 15px">
                                <v-text-field v-model="model.booking.check_in_date" class="custom-text-field"
                                    label="Check-in Date:" placeholder="YYYY-MM-DD" variant="outlined"
                                    :error-messages="errors.checkInDate" @blur="validateDate('checkInDate')"
                                    prepend-inner-icon="mdi-calendar" type="text" id="check_in_date"
                                    name="check_in_date" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col style="padding: 10px 15px">
                                <v-text-field v-model="model.booking.check_out_date" class="custom-text-field"
                                    label="Check-out Date:" placeholder="YYYY-MM-DD" variant="outlined"
                                    :error-messages="errors.checkOutDate" @blur="validateDate('checkOutDate')"
                                    prepend-inner-icon="mdi-calendar" type="text" id="check_out_date"
                                    name="check_out_date" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col style="padding: 10px 15px">
                                <v-textarea v-model="model.booking.note" label="Notes" row-height="25" rows="3"
                                    variant="outlined" auto-grow shaped type="text" id="note" name="note"></v-textarea>
                            </v-col>
                        </v-row>

                        <div class="buttons">
                            <v-btn style="background-color: #1e1e1e; color: white;" @click="closeDialog">Close</v-btn>
                            <v-btn type="button" @click="nextTab"
                                style="background-color: #1e4e72; color: white">Next</v-btn>
                        </div>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="payment">
                        <h1>Reservation Payment</h1>
                        <v-row style="margin-top: 25px;">
                            <v-col style="padding: 10px 15px">
                                <v-text-field v-model="model.payment.payment_amount" class="custom-text-field"
                                    label="Amount:" variant="outlined" type="number" id="payment_amount"
                                    name="payment_amount" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="8" style="padding: 10px 15px">
                                <v-select v-model="model.payment.payment_method" label="Payment Method"
                                    :items="['Gcash', 'Paymaya', 'GoTyme']" variant="outlined" type="text"
                                    id="payment_method" name="payment_method" required></v-select>
                            </v-col>

                            <v-col cols="4" style="padding: 10px 15px">
                                <v-btn @click="openDialog"
                                    style="width: 100%; margin: 0; height: 56px; background-color: #1e4e72; color: white;">Scan</v-btn>
                            </v-col>

                            <v-dialog v-model="dialog" width="auto" style="height: auto">
                                <v-card>
                                    <v-card-actions>
                                        <div v-if="model.payment.payment_method === 'Gcash'"
                                            style="width: 400px; height: auto;">
                                            <img src="../Profile/qr_code/qr_img.png" width="100%" alt="">
                                            <h1 style="margin-bottom: 0;">Scan Gcash QR Code</h1>
                                            <span>or send to</span>
                                            <h1>09380417303</h1>
                                        </div>
                                        <div v-else-if="model.payment.payment_method === 'Paymaya'"
                                            style="width: 400px; height: auto;">
                                            <img src="../Profile/qr_code/qr_img.png" width="100%" alt="">
                                            <h1 style="margin-bottom: 0;">Scan PayMaya QR Code</h1>
                                            <span>or send to</span>
                                            <h1>09380417303</h1>
                                        </div>
                                        <div v-else-if="model.payment.payment_method === 'GoTyme'"
                                            style="width: 400px; height: auto;">
                                            <img src="../Profile/qr_code/qr_img.png" width="100%" alt="">
                                            <h1 style="margin-bottom: 0;">Scan GoTyme QR Code</h1>
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
                                    :items="['Partial', 'Full Payment']" variant="outlined" type="text"
                                    id="payment_type" name="payment_type" required></v-combobox>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col style="padding: 10px 15px">
                                <v-text-field v-model="model.payment.reference_number" class="custom-text-field"
                                    label="Reference No:" variant="outlined" type="text" id="reference_number"
                                    name="reference_number" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col style="padding: 10px 15px">
                                <v-text-field v-model="model.payment.number_of_day" class="custom-text-field"
                                    label="Number of Day:" variant="outlined" type="number" id="number_of_day"
                                    name="number_of_day" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col style="padding: 10px 15px">
                                <v-text-field v-model="model.payment.number_of_night" class="custom-text-field"
                                    label="Number of Night:" variant="outlined" type="number" id="number_of_night"
                                    name="number_of_night" required></v-text-field>
                            </v-col>
                        </v-row>


                        <div class="buttons">
                            <v-btn type="button" @click="prevTab"
                                style="background-color: #1e1e1e; color: white;">Back</v-btn>
                            <v-btn type="submit" style="background-color: #1e4e72; color: white; ">Submit</v-btn>
                        </div>
                    </v-tabs-window-item>
                </v-tabs-window>
            </form>

            <v-dialog v-model="paymentReceiptDialog" width="auto" style="height: auto;">
                <v-card>
                    <v-card-text id="receipt-content">

                        <v-row>
                            <v-col style="padding: 0; margin: 7px 0 0 0">
                                <h1 v-if="establishment.establishment_name"
                                    style="display: flex; align-items: center; justify-content: center; width: 600px; height: 180px; margin: 0; font-weight: 900; font-size: 50px; color: white; background-color: #1e4e72">
                                    {{ establishment.establishment_name }}</h1>
                                <h1 v-else
                                    style="display: flex; align-items: center; justify-content: center; width: 600px; height: 180px; margin: 0; font-weight: 900; font-size: 50px; color: white; background-color: #1e4e72">
                                    Loading...</h1>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <h2 style="text-align: center; font-weight: 900;">ACOTA Payment Receipt</h2>
                            </v-col>
                        </v-row>

                        <v-card-text>
                            <hr>
                        </v-card-text>

                        <v-col cols="12">
                            <v-row>
                                <h1 style="text-align: center; width: 100%; font-weight: 800; font-size: 40px;">{{
                                    payment.payment_amount + ".00 PHP" }}</h1>
                            </v-row>
                            <v-row>
                                <h2 style="text-align: center; margin-top: -20px; width: 100%;">Amount</h2>
                            </v-row>
                        </v-col>

                        <hr style="margin: 40px 0 20px 0">


                        <v-row>
                            <v-col>
                                <h4>{{ "Reference Number: " + payment.reference_number }} </h4>
                            </v-col>

                            <v-col>
                                <h4 style="text-align: right">{{ "Date: " + payment.payment_date }}</h4>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col style="padding-top: 0;">
                                <h4>{{ "Paymend ID: " + payment.reference_id }} </h4>
                            </v-col>

                            <v-col style="padding-top: 0;">
                                <h4 style="text-align: right">{{ payment.number_of_day + "D" + payment.number_of_night +
                                    "N" }}</h4>
                            </v-col>
                        </v-row>

                        <hr style="margin-top: 20px;">

                        <br><br>
                        <v-row>
                            <v-col>
                                <h3 style="color: #22bb33; font-size: 24px; text-align: center">Payment Success</h3>
                                <h4 style="color: #22bb33; font-size: 24px; text-align: center">Thank you!</h4>
                            </v-col>
                        </v-row>
                        <br><br>
                        <hr>

                        <v-col>
                            <v-row style="width: 100%; display: flex; align-items: center; justify-content: center;">
                                <h4 style="margin-top: 10px;">Contact Us</h4>
                            </v-row>
                            <v-row style="width: 100%; display: flex; align-items: center; justify-content: center;">
                                <h4> <v-icon icon="mdi-phone" end></v-icon> 09380417303</h4>
                            </v-row>
                            <v-row style="width: 100%; display: flex; align-items: center; justify-content: center;">
                                <h4> <v-icon icon="mdi-email" end></v-icon> <a style="color: #1e4e72;"
                                        href="#">acota@travel.gov.ph</a></h4>
                            </v-row>
                        </v-col>

                    </v-card-text>
                    <hr>
                    <v-card-actions style="gap: 10px;">
                        <v-btn type="button" style="margin: 0; width: 49%; color: #1e4e72;"
                            @click="closePaymentReceiptDialog">Close</v-btn>
                        <v-btn type="button" style="margin: 0; width: 49%; color: #1e4e72;"
                            @click="downloadReceipt">Download</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-text>
    </v-container>
</template>

<script>

import axios from 'axios';
import html2canvas from 'html2canvas';

export default {
    data: () => ({
        current_date: "",

        tab: "booking",
        dialog: false,
        paymentReceiptDialog: false,

        establishment: {},
        account: {},
        booking: {},
        payment: {},


        errors: {
            check_in_date: "",
            check_out_date: ""
        },

        model: {
            booking: {
                guest_id: "",
                establishment_id: "",
                room_number: "",
                booking_total_pax: "",
                booking_date: "",
                check_in_date: "",
                check_out_date: "",
                note: ""
            },
            payment: {
                booking_id: "",
                payment_amount: "",
                payment_method: "",
                payment_type: "",
                reference_number: "",
                number_of_day: "",
                number_of_night: ""
            }
        }

    }),
    methods: {
        async downloadReceipt() {
            const receiptElement = document.getElementById('receipt-content');
            const canvas = await html2canvas(receiptElement);
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'receipt.png';
            link.click();
        },
        closePaymentReceiptDialog() {
            this.paymentReceiptDialog = false;
            this.$emit('closeDialog');
        },
        closeDialog() {
            this.$emit('closeDialog');
        },
        openDialog() {
            this.dialog = true;
        },
        nextTab() {
            if (this.tab === "booking" && this.validateForm()) {
                this.tab = "payment";
            }
        },
        prevTab() {
            if (this.tab === "payment") {
                this.tab = "booking";
            }
        },
        async submitBooking() {
            if (this.validateForm()) {

                const bookingData = {
                    guest_id: this.account.guest_id,
                    establishment_id: this.establishment.id,
                    room_number: this.model.booking.room_number,
                    booking_total_pax: this.model.booking.booking_total_pax,
                    booking_date: this.current_date,
                    check_in_date: this.model.booking.check_in_date,
                    booking_status: "Booked",
                    check_out_date: this.model.booking.check_out_date,
                    note: this.model.booking.note,
                };

                console.log(bookingData);

                try {
                    const bookingResponse = await axios.post("http://127.0.0.1:8000/api/booking", bookingData);
                    console.log("booking data:", bookingResponse.data);
                    const booking_id = bookingResponse.data.Booking.id;
                    this.booking = bookingResponse.data.Booking;

                    console.log("Booking ID: " + booking_id);

                    const paymentData = {
                        booking_id: booking_id,
                        payment_amount: this.model.payment.payment_amount,
                        payment_method: this.model.payment.payment_method,
                        payment_date: this.current_date,
                        payment_type: this.model.payment.payment_type,
                        reference_number: this.model.payment.reference_number,
                        number_of_day: this.model.payment.number_of_day,
                        number_of_night: this.model.payment.number_of_night,
                    };

                    console.log(paymentData);

                    const paymentResponse = await axios.post("http://127.0.0.1:8000/api/booking_payment", paymentData);
                    console.log("Booking Payment data:", paymentResponse.data);
                    const payment_id = paymentResponse.data.BookingPayment.id;
                    this.payment = paymentResponse.data.BookingPayment;

                    console.log("Booking ID: " + booking_id);
                    console.log("Payment ID: " + payment_id);

                    this.paymentReceiptDialog = true;
                } catch (error) {
                    console.error("Error during form submission:", error);
                }

            }
        },
        validateDate(field) {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!datePattern.test(this.model.booking[field])) {
                this.errors[field] = "Date must be in YYYY-MM-DD format";
            } else {
                this.errors[field] = "";
            }
        },
        validateForm() {
            this.validateDate('check_in_date');
            this.validateDate('check_out_date');
            return !this.errors.check_in_date && !this.errors.check_out_date;
        },
        clearForm() {
            this.booking.checkInDate = "";
            this.booking.checkOutDate = "";
        },
        fetchEstablishment() {
            axios
                .get("http://127.0.0.1:8000/api/establishment")
                .then((response) => {
                    console.log("Establishment data:", response.data); // Log the response
                    this.establishment = response.data.Establishment;
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
                    this.establishment = response.data.Establishment;
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
        getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear();
            let month = today.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            let day = today.getDate();
            day = day < 10 ? '0' + day : day;

            this.current_date = year + "-" + month + "-" + day;
        },
    },
    created() {
        this.fetchAccount();
        this.fetchAccountId();
        this.fetchEstablishment();
        this.fetchEstablishmentId();
        this.getCurrentDate();
    },
};
</script>

<style scoped>
span {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1e4e72;
    font-weight: 900
}

.hiddenTab {
    display: none;
}

.v-btn {
    width: 50%;
    height: 40px;
    margin: 15px 0 0 0;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 15px;
    border-style: none;
}

.v-btn:hover {
    background-color: #15344c;
    color: white;
}

.buttons {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    border-radius: 10px;
}

h1 {
    color: #1e4e72;
    text-align: center;
    font-weight: bold;
    font-size: 35px;
    margin-bottom: 20px;
}

.r-btn:hover {
    color: white;
}

h4,
h3,
h2 {
    color: #1e4e72;
}

hr {
    opacity: 0.5;
}
</style>
