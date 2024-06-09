<template>
    <!-- Booking Records -->
    <v-container>
        <v-row>
            <v-col md="3" sm="6" cols="12">
                <v-select label="Select Accommodation" :items="establishments.map(est => est.establishment_name)"
                    v-model="selectedEstablishment" variant="outlined"></v-select>
            </v-col>
            <v-col md="2" sm="6" cols="12">
                <v-select label="Room Number" :items="rooms.map(room => room.room_number)" v-model="selectedRoom"
                    variant="outlined"></v-select>
            </v-col>
            <v-col md="2" sm="6" cols="12">
                <v-select label="Month" :items="months" v-model="searchMonth" variant="outlined"></v-select>
            </v-col>
            <v-col md="2" sm="6" cols="12">
                <v-select label="Year" :items="years" v-model="searchYear" variant="outlined"></v-select>
            </v-col>
            <v-col cols="6" md="3" sm="12">
                <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                    hide-details single-line></v-text-field>
            </v-col>
        </v-row>

        <v-card elevation="4">
            <v-table>
                <thead>
                    <tr style="background-color: #1e4e72; color: white;">
                        <th class="text-left">Name</th>
                        <th class="text-left">Booking Date</th>
                        <th class="text-left">Check-in Date</th>
                        <th class="text-left">Check-out Date</th>
                        <th class="text-left">Status</th>
                    </tr>
                </thead>
                <tbody v-if="bookings.length === 0" style="height: 690px;">
                    <tr>
                        <td colspan="5" class="text-center">Loading...</td>
                    </tr>
                </tbody>
                <tbody v-else style="max-height: 690px; overflow: auto;">
                    <tr :class="{ 'even-row': isEven(index) }" v-for="(booking, index) in filteredBookings"
                        :key="booking.id">
                        <td>{{ findGuestName(booking.id) }}</td>
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
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 11 }, (_, i) => (currentYear + i).toString()); // Generate current year + 10 years
        const latestYear = years[years.length - 1];

        return {
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            years: years,
            latestYear: latestYear,
            searchYear: null,
            search: '',
            searchMonth: null,
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
            rooms: [],
            selectedRoom: null,

        };
    },
    created() {
        this.fetchOwner();
        this.fetchEstablishments();
        this.fetchGuestBooking();
    },
    methods: {
        fetchRooms(establishment_id) {
            axios
                .get(`http://127.0.0.1:8000/api/rooms/${establishment_id}`)
                .then((response) => {
                    const roomData = response.data.Room;
                    this.rooms = roomData;
                    console.log(roomData);
                })
                .catch((error) => {
                    console.error("Error fetching rooms:", error);
                    this.loading = false;
                });
        },
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
        isEven(index) {
            return index % 2 === 0;
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
                    this.fetchRooms(this.establishments[0].id);

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
            let filtered = this.bookings;

            if (this.selectedStatus) {
                filtered = filtered.filter(booking => booking.booking_status === 'Checked-out');
            }

            if (this.selectedRoom) {
                filtered = filtered.filter(booking => booking.room_number === this.selectedRoom);
            }

            if (this.search) {
                const searchQuery = this.search.toLowerCase();
                filtered = filtered.filter(booking => {
                    return (
                        (this.findGuestName(booking.id).toLowerCase().includes(searchQuery)) ||
                        (booking.booking_date && this.formatDate(booking.booking_date).toLowerCase().includes(searchQuery)) ||
                        (booking.check_in_date && this.formatDate(booking.check_in_date).toLowerCase().includes(searchQuery)) ||
                        (booking.check_out_date && this.formatDate(booking.check_out_date).toLowerCase().includes(searchQuery))
                    );
                });
            }

            if (this.searchMonth) {
                const month = this.searchMonth.toLowerCase();
                filtered = filtered.filter(booking => {
                    return ((booking.booking_date && this.formatDate(booking.booking_date).toLowerCase().includes(month)));

                });
            }

            if (this.searchYear) {
                const month = this.searchYear.toLowerCase();
                filtered = filtered.filter(booking => {
                    return ((booking.booking_date && this.formatDate(booking.booking_date).toLowerCase().includes(month)));
                });
            }

            return filtered;
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
.even-row {
    background-color: #f0f0f0;
    /* Or any other color for even rows */
}
</style>
