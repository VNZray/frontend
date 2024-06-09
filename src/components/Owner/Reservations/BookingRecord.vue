<template>
    <!-- Booking Records -->
    <v-container>
        <v-row>
            <v-col md="3" sm="6" cols="12">
                <v-select label="Select Accommodation" :items="establishments.map(est => est.establishment_name)"
                    v-model="selectedEstablishment" variant="outlined"></v-select>
            </v-col>
            <v-col cols="6" md="3" sm="12">
                <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                    hide-details single-line></v-text-field>
            </v-col>
        </v-row>
        
        <v-card elevation="4">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Contact Number</th>
                        <th class="text-left">Booking Date</th>
                        <th class="text-left">Check-in Date</th>
                        <th class="text-left">Check-out Date</th>
                        <th class="text-left">Status</th>
                    </tr>
                </thead>
                <tbody v-if="bookings.length === 0">
                    <tr>
                        <td colspan="5" class="text-center">Loading...</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="booking in filteredBookings" :key="booking.id">
                        <td>{{ findGuestName(booking.id) }}</td>
                        <td>{{ findGuestContactNo(booking.id) }}</td>
                        <td>{{ formatDate(booking.booking_date) }}</td>
                        <td>{{ formatDate(booking.check_in_date) }}</td>
                        <td>{{ formatDate(booking.check_out_date) }}</td>
                        <td>{{ booking.booking_status }}</td>
                    </tr>
                </tbody>

            </v-table>
        </v-card>
    </v-container>

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
        viewRecords() {
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
        findGuestContactNo(booking_id){
            const guest = this.guest.find(g => g.booking_id === booking_id);
            return guest ? `${guest.guest_contact_no}` : 'Guest Name Not Found';
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
            return this.bookings.filter(booking => booking.booking_status === 'Checked-out');
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
/* Add any additional styles here */
</style>
