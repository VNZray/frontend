<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card elevation="6" style="overflow: auto; max-height: 810px;">
                    <v-tabs v-model="tab" color="#1e4e72" bg-color="white">
                        <v-tab value="one">Pending Booking</v-tab>
                        <v-tab value="two">My Booking</v-tab>
                        <v-tab value="three">Booking History</v-tab>
                        <v-tab value="four">Canceled Booking</v-tab>
                    </v-tabs>

                    <v-card-text style="padding: 10px">
                        <v-tabs-window v-model="tab">
                            <!-- Pending Booking Tab -->
                            <v-tabs-window-item value="one">
                                <v-row style="margin-bottom: 10px">
                                    <v-col style="padding-bottom: 0;">
                                        <v-card color="#1e4e72">
                                            <v-row style="padding: 10px;">
                                                <v-col cols="2">
                                                    <h3>Room Number</h3>
                                                </v-col>
                                                <v-col cols="5">
                                                    <h3>Establishment Name</h3>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h3>Booking Date</h3>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h3>Status</h3>
                                                </v-col>
                                                <v-col cols="1">
                                                    <h3 style="text-align: center;">Action</h3>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row v-if="filteredBookings('Pending').length > 0"
                                    v-for="b in filteredBookings('Pending')" :key="b.id">
                                    <v-col style="padding-top: 0">
                                        <v-card class="cards" elevation="0" style="padding: 12px;">
                                            <v-row>
                                                <v-col cols="2">
                                                    <h4>{{ b.room_number }}</h4>
                                                </v-col>
                                                <v-col cols="5">
                                                    <h4>{{ getEstablishmentName(b.establishment_id) }}</h4>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h4>{{ formatDate(b.booking_date) }}</h4>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h4>{{ b.booking_status }}</h4>
                                                </v-col>
                                                <v-col cols="1">
                                                    <button style="width: 100%;" class="cancel-btn"
                                                        @click="cancelBooking(b.id)">Cancel</button>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row v-else>
                                    <v-col>
                                        <v-card elevation="0" style="padding: 10px">
                                            <v-row>
                                                <v-col>
                                                    <h4 class="text-center">No bookings have been made</h4>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>

                            <!-- Booked Booking Tab -->
                            <v-tabs-window-item value="two">
                                <v-row style="margin-bottom: 10px">
                                    <v-col style="padding-bottom: 0;">
                                        <v-card color="#1e4e72">
                                            <v-row style="padding: 10px;">
                                                <v-col cols="2">
                                                    <h3>Room Number</h3>
                                                </v-col>
                                                <v-col cols="5">
                                                    <h3>Establishment Name</h3>
                                                </v-col>
                                                <v-col cols="3">
                                                    <h3>Booking Date</h3>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h3>Status</h3>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row v-if="filteredBookings('Booked').length > 0"
                                    v-for="b in filteredBookings('Booked')" :key="b.id">
                                    <v-col style="padding-top: 0">
                                        <v-card class="cards" elevation="0" style="padding: 12px;">
                                            <v-row>
                                                <v-col cols="2">
                                                    <h4>{{ b.room_number }}</h4>
                                                </v-col>
                                                <v-col cols="5">
                                                    <h4>{{ getEstablishmentName(b.establishment_id) }}</h4>
                                                </v-col>
                                                <v-col cols="3">
                                                    <h4>{{ formatDate(b.booking_date) }}</h4>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h4>{{ b.booking_status }}</h4>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row v-else>
                                    <v-col>
                                        <v-card elevation="0" style="padding: 10px">
                                            <v-row>
                                                <v-col>
                                                    <h4 class="text-center">No bookings have been made</h4>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>

                            <!-- Checked-out Booking Tab -->
                            <v-tabs-window-item value="three">
                                <v-row style="margin-bottom: 10px">
                                    <v-col style="padding-bottom: 0;">
                                        <v-card color="#1e4e72">
                                            <v-row style="padding: 10px;">
                                                <v-col cols="2">
                                                    <h3>Room Number</h3>
                                                </v-col>
                                                <v-col cols="5">
                                                    <h3>Establishment Name</h3>
                                                </v-col>
                                                <v-col cols="3">
                                                    <h3>Booking Date</h3>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h3>Status</h3>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row v-if="filteredBookings('Checked-out').length > 0"
                                    v-for="b in filteredBookings('Checked-out')" :key="b.id">
                                    <v-col style="padding-top: 0">
                                        <v-card class="cards" elevation="0" style="padding: 12px;">
                                            <v-row>
                                                <v-col cols="2">
                                                    <h4>{{ b.room_number }}</h4>
                                                </v-col>
                                                <v-col cols="5">
                                                    <h4>{{ getEstablishmentName(b.establishment_id) }}</h4>
                                                </v-col>
                                                <v-col cols="3">
                                                    <h4>{{ formatDate(b.booking_date) }}</h4>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h4>{{ b.booking_status }}</h4>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row v-else>
                                    <v-col>
                                        <v-card elevation="0" style="padding: 10px">
                                            <v-row>
                                                <v-col>
                                                    <h4 class="text-center">No bookings have been made</h4>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>

                            <!-- Canceled Booking Tab -->
                            <v-tabs-window-item value="four">
                                <v-row style="margin-bottom: 10px">
                                    <v-col style="padding-bottom: 0;">
                                        <v-card color="#1e4e72">
                                            <v-row style="padding: 10px;">
                                                <v-col cols="2">
                                                    <h3>Room Number</h3>
                                                </v-col>
                                                <v-col cols="5">
                                                    <h3>Establishment Name</h3>
                                                </v-col>
                                                <v-col cols="3">
                                                    <h3>Booking Date</h3>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h3>Status</h3>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row v-if="filteredBookings('Canceled').length > 0"
                                    v-for="b in filteredBookings('Canceled')" :key="b.id">
                                    <v-col style="padding-top: 0">
                                        <v-card class="cards" elevation="0" style="padding: 12px;">
                                            <v-row>
                                                <v-col cols="2">
                                                    <h4>{{ b.room_number }}</h4>
                                                </v-col>
                                                <v-col cols="5">
                                                    <h4>{{ getEstablishmentName(b.establishment_id) }}</h4>
                                                </v-col>
                                                <v-col cols="3">
                                                    <h4>{{ formatDate(b.booking_date) }}</h4>
                                                </v-col>
                                                <v-col cols="2">
                                                    <h4>{{ b.booking_status }}</h4>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row v-else>
                                    <v-col>
                                        <v-card elevation="0" style="padding: 10px">
                                            <v-row>
                                                <v-col>
                                                    <h4 class="text-center">No bookings have been made</h4>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="3">
                <v-card elevation="6" height="485" style="padding: 20px">
                    <v-row justify="space-around">
                        <v-date-picker title="Calendar" v-model="selectedDate" width="100%" height="100%"
                            color="#1e4e72">
                        </v-date-picker>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';

export default {
    data() {
        return {
            tab: 'one',
            selectedDate: new Date(),
            booking: [],
            establishment: []
        };
    },
    created() {
        this.fetchBooking();
        this.fetchEstablishment();
    },
    methods: {
        async fetchBooking() {
            try {
                const guest_id = this.$route.params.account_id;
                const response = await axios.get(`http://127.0.0.1:8000/api/booking/guest/${guest_id}`);
                console.log("Booking data:", response.data);
                this.booking = response.data.Booking;
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        },
        async fetchEstablishment() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/establishment`);
                this.establishment = response.data.Establishment;
            } catch (error) {
                console.error("Error fetching establishments:", error);
            }
        },
        getEstablishmentName(establishment_id) {
            const establishment = this.establishment.find(e => e.id === establishment_id);
            return establishment ? `${establishment.establishment_name}` : 'Establishment Name Not Found';
        },
        formatDate(date) {
            return format(new Date(date), 'MMMM d, yyyy');
        },
        async cancelBooking(bookingId) {
            try {
                await axios.put(`http://127.0.0.1:8000/api/booking/${bookingId}`, {
                    booking_status: 'Canceled'
                });
                // Update room status after cancellation
                const booking = this.booking.find(b => b.id === bookingId);
                if (booking) {
                    await this.updateRoomStatus(booking.room_id);
                }
                this.fetchBooking(); // Refresh bookings after cancellation
            } catch (error) {
                console.error("Error cancelling booking:", error);
            }
        },
        async updateRoomStatus(room_id) {
            try {
                await axios.put(`http://127.0.0.1:8000/api/room/${room_id}/update`, {
                    room_status: 'Available'
                });

                console.log("Room updated");

            } catch (error) {
                console.error("Error updating room status:", error);
            }
        },
        filteredBookings(status) {
            return this.booking.filter(b => b.booking_status === status);
        }
    }
};
</script>

<style scoped>
h3,
h4 {
    font-weight: normal;
}

h3 {
    font-size: 16px;
}

.cancel-btn {
    color: red;
    text-align: center;
    height: 25px;
}

.cancel-btn:hover {
    color: rgb(136, 1, 1);
}

.cards {
    transition: transform 0.1s ease, box-shadow 0.4s ease;
}

.cards:hover {
    background-color: rgb(240, 240, 240);
}
</style>
