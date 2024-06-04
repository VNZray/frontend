<template>

        <!--Reservations-->

    <v-container>
        <v-row>
            <v-col md="3" sm="6" cols="12">
                <v-select label="Select Accommodation" :items="establishments.map(est => est.establishment_name)"
                    v-model="selectedEstablishment" variant="outlined"></v-select>
            </v-col>

            <v-col md="3" sm="6" cols="12">
                <v-select label="Select Status" :items="['Booked', 'Checked-in', 'Checked-out']" v-model="selectedStatus"
                    variant="outlined"></v-select>
            </v-col>

            <v-col md="3" sm="6" cols="12">
                <v-btn style="height: 56px;" color="#1E4E72" @click="viewRecords">
                    View Booking Records
                </v-btn>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <v-row>
            <v-col v-for="booking in filteredBookings" :key="booking.id" cols="6" md="3" sm="12">
                <v-card class="booking_card" style="height: 200px;">
                    <v-row>
                        <v-col style="height: 100%;">
                            <div class="number_container">
                                <h1>{{ booking.room_number }}</h1>
                            </div>
                        </v-col>

                        <v-col style="height: 100%; padding-left: 0">
                            <div class="booking_container">
                                <v-row>
                                    <v-container>
                                        <v-col>
                                            <v-row>
                                                <h2 style="text-align: left;">
                                                    {{ findGuestName(booking.id) }}
                                                </h2>
                                            </v-row>

                                            <v-row>
                                                <h4 style="text-align: left;">Pax: {{ booking.booking_total_pax }} Pax
                                                </h4>
                                            </v-row>

                                            <v-row>
                                                <h4 style="text-align: left;">
                                                    Day: {{ findNumberOfDayNight(booking.id) }}
                                                </h4>
                                            </v-row>

                                            <v-row>
                                                <h4 style="text-align: left;">Date: {{
                                                    formatDate(findCheckInDate(booking.id))
                                                    }}</h4>
                                            </v-row>

                                            <v-row>
                                                <h4 style="text-align: left;">Status: {{ booking.booking_status
                                                    }}</h4>
                                            </v-row>

                                            <v-row style="margin-top: 20px;">
                                                <v-btn @click="selectBookingDetails(booking)"
                                                    style="background-color: #1E4E72; color: white;">
                                                    View Full Details
                                                </v-btn>
                                            </v-row>
                                        </v-col>
                                    </v-container>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="auto" style="height: auto">
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col>
                        <h1 style="padding: 30px 120px; background-color: #1E4E72; font-size: 40px;">
                            Booking Details</h1>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <h4>Name: </h4>
                    </v-col>

                    <v-col>
                        <h4> {{ findGuestName(selectedDetails.id) }} </h4>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <h4>Booking Date: </h4>
                    </v-col>
                    <v-col>
                        <h4> {{ formatDate(selectedDetails.booking_date) }}</h4>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <h4>Check-in Date: </h4>
                    </v-col>
                    <v-col>
                        <h4> {{ formatDate(selectedDetails.check_in_date) }}</h4>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <h4>Check-out Date: </h4>
                    </v-col>
                    <v-col>
                        <h4> {{ formatDate(selectedDetails.check_out_date) }}</h4>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <h4>Day/s: </h4>
                    </v-col>
                    <v-col>
                        <h4> {{ findNumberOfDayNight(selectedDetails.id) }}</h4>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <h4>Booking Status: </h4>
                    </v-col>
                    <v-col>
                        <h4> {{ selectedDetails.booking_status }} </h4>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <h4>Note: </h4>
                    </v-col>
                    <v-col>
                        <h4> {{ selectedDetails.note }} </h4>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-btn color="red" @click="closeBookingDialog" style="width: 100%;">Close</v-btn>
                    </v-col>

                    <v-col>
                        <v-btn color="secondary" style="width: 100%;"
                            @click="checkInBooking(selectedDetails)">Check-in</v-btn>
                    </v-col>

                    <v-col>
                        <v-btn color="primary" style="width: 100%;"
                            @click="checkOutBooking(selectedDetails)">Check-out</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';

export default {
    data() {
        return {
            bookingDetailsDialog: false,
            owner: {},
            establishment: null,
            guest: [],
            bookings: [],
            establishments: [],
            selectedEstablishment: null,
            selectedStatus: 'Booked',  // Set default status to "Booked"
            dialog: false,
            selectedDetails: null,
        };
    },
    created() {
        this.fetchOwner();
        this.fetchEstablishments();
        this.fetchGuestBooking();
    },
    methods: {
        viewRecords(){
            const owner_id = this.$route.params.owner_id;
            this.$router.push(`/owner/booking_records/${owner_id}`);
        },
        selectBookingDetails(booking) {
            this.selectedDetails = booking;
            console.log(this.selectedDetails);
            this.dialog = true;
        },
        closeBookingDialog() {
            this.dialog = false;
        },
        async fetchOwner() {
            const owner_id = this.$route.params.owner_id;
            if (owner_id) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/owner/${owner_id}`);
                    console.log("Owner data:", response.data);
                    this.owner = response.data.Owner;
                } catch (error) {
                    console.error("Error fetching Owner:", error);
                }
            }
        },
        async fetchEstablishments() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/establishment`);
                console.log("Establishments data:", response.data);
                const establishments = response.data.Establishment.filter(est => est.owner_id === this.owner.id);
                this.establishments = establishments;

                // Automatically select the first establishment and fetch bookings if it exists
                if (this.establishments.length > 0) {
                    this.selectedEstablishment = this.establishments[0].establishment_name;
                    this.fetchBookings();
                }
            } catch (error) {
                console.error("Error fetching establishments:", error);
            }
        },
        async fetchBookings() {
            const establishment = this.establishments.find(est => est.establishment_name === this.selectedEstablishment);
            if (establishment) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/bookings/${establishment.id}`);
                    console.log("Bookings data:", response.data);
                    this.bookings = response.data.Booking;
                    this.establishment = establishment;
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
            } else {
                console.error("Selected establishment not found.");
            }
        },
        async fetchGuestBooking() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/guest_booking`);
                console.log("Guest Booking data:", response.data);
                this.guest = response.data.Booking;
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        },
        findGuestName(guestId) {
            const guest = this.guest.find(g => g.id === guestId);
            return guest ? `${guest.guest_first_name} ${guest.guest_last_name}` : 'Guest Name Not Found';
        },
        findNumberOfDayNight(booking_id) {
            const guest = this.guest.find(g => g.booking_id === booking_id);
            return guest ? `${guest.number_of_day}D${guest.number_of_night}N` : 'Guest Day and Night Not Found';
        },
        findCheckInDate(booking_id) {
            const guest = this.guest.find(g => g.booking_id === booking_id);
            return guest ? `${guest.check_in_date}` : 'Guest Check-in Date Not Found';
        },
        findCheckOutDate(booking_id) {
            const guest = this.guest.find(g => g.booking_id === booking_id);
            return guest ? `${guest.check_out_date}` : 'Guest Check-out Date Not Found';
        },
        formatDate(date) {
            return format(new Date(date), 'MMMM d, yyyy');
        },
        async checkInBooking(booking) {
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/booking/${booking.id}`, {
                    booking_status: 'Checked-in'
                });
                console.log("Booking status updated to Checked-in:", response.data);
                booking.booking_status = 'Checked-in';
            } catch (error) {
                console.error("Error updating booking status to Checked-in:", error);
            }
        },
        async checkOutBooking(booking) {
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/booking/${booking.id}`, {
                    booking_status: 'Checked-out'
                });
                console.log("Booking status updated to Checked-out:", response.data);
                booking.booking_status = 'Checked-out';
            } catch (error) {
                console.error("Error updating booking status to Checked-out:", error);
            }
        },
    },
    computed: {
        filteredBookings() {
            if (!this.selectedStatus) {
                return this.bookings;
            }
            return this.bookings.filter(booking => booking.booking_status === this.selectedStatus);
        }
    },
    watch: {
        selectedEstablishment(newEstablishment) {
            if (newEstablishment) {
                this.fetchBookings();
            }
        },
        selectedStatus(newStatus) {
            if (newStatus) {
                this.fetchBookings();
            }
        }
    }
};
</script>



<style scoped>
.number_container {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1E4E72;
}

.booking_container {
    width: 200px;
    height: 200px;
}

h1 {
    text-align: center;
    font-size: 100px;
    color: white;
}

h2 {
    font-size: 20px;
}

h4 {
    font-size: 16px;
    font-weight: normal
}

.booking_card {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.booking_card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
</style>
