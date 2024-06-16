<template>
    <v-container>
        <div class="cards-container">
            <v-row no-gutters style="gap: 40px;">
                <v-col cols="2.5">
                    <v-card class="card">
                        <h1 class="fee-amount"><span class="peso-sign">₱</span> 20,000.00</h1>
                        <h3 class="title">Today's Sales</h3>
                    </v-card>
                </v-col>

                <v-col cols="2.5">
                    <v-card class="card">
                        <h1 class="fee-amount"><span class="peso-sign">₱</span> 80,000.00</h1>
                        <h3 class="title">Total Earnings</h3>
                    </v-card>
                </v-col>

                <v-col cols="2.5">
                    <v-card class="card">
                        <h1 class="fee-amount"><span class="peso-sign">₱</span> 500,000.00</h1>
                        <h3 class="title">Average Sales</h3>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div class="rating-container">
            <v-card class="chart-card">
                <v-card-title>Room Rating</v-card-title>
                <v-card-text>
                    <div class="room-list">
                        <v-row>
                            <v-col v-for="(room, index) in sortedRooms" :key="index" cols="6" class="room-col">
                                <div class="room-card">
                                    <div class="chart-container">
                                        <canvas :id="'myDoughnutChart' + index" width="150" height="150"></canvas>
                                    </div>
                                    <div class="room-info">
                                        <h3 class="room-no">Room {{ room.number }}</h3>
                                        <div class="room-details">
                                            <div v-for="(detail, dIndex) in room.details" :key="dIndex"
                                                :class="'rd-' + (dIndex + 1)">
                                                <p>{{ detail.alt }}: {{ detail.text }}</p>
                                            </div>
                                        </div>
                                        <div class="room-price">
                                            <span>Price: </span>{{ room.price }}
                                        </div>
                                        <br />
                                        <v-select class="Feedback" v-model="selectedFeedback[index]"
                                            :items="room.feedbackOptions" label="Feedback" outlined
                                            hide-details></v-select>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-text>
            </v-card>
            <v-card class="chart-card">
                <v-card-title>Total Rating of Rooms</v-card-title>
                <v-card-text>
                    <canvas id="barChart" width="400" height="300"></canvas>
                </v-card-text>
            </v-card>
        </div>
        <div>
            <v-card class="Line-chart-card">
                <v-card-title>
                    <v-row>
                        <v-col cols="6">Sales Rating Over Time</v-col>
                        <v-col cols="6">
                            <v-autocomplete v-model="selectedRoom" :items="roomOptions" label="Search Room" outlined
                                hide-details></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <canvas id="myLineChart" width="800" height="300"></canvas>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import { Doughnut, Line, Bar } from 'chart.js';
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export default {
    name: 'Dashboard',
    setup() {
        const rooms = ref([]);
        const selectedFeedback = ref([]);
        const selectedRoom = ref(null);
        const roomOptions = ref([]);
        const doughnutCharts = [];
        let barChart = null;
        let lineChart = null;

        const fetchRooms = async () => {
            try {
                const response = await axios.get('/room');
                if (response.data.status === 200) {
                    rooms.value = response.data.rooms.map(room => ({
                        id: room.id,
                        number: room.Room_Number,
                        price: room.Room_Price,
                        details: [
                            { alt: 'Capacity', text: room.Room_Capacity },
                            { alt: 'Number of Beds', text: room.Number_Of_Beds },
                            ...room.Room_Amenities.split(',').map(amenity => ({ alt: 'Amenity', text: amenity.trim() }))
                        ],
                        feedbackOptions: [],
                        ratings: []
                    }));

                    roomOptions.value = rooms.value.map(room => room.number);

                    await Promise.all(rooms.value.map((room, index) => fetchSalesRatingAndFeedback(room.number, index)));
                } else {
                    console.error('Failed to fetch rooms:', response.data.message);
                }
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        };

        const fetchSalesRatingAndFeedback = async (roomNumber, index) => {
            try {
                const [ratingResponse, feedbackResponse] = await Promise.all([
                    axios.get(`/room_sales/Sales_Rating/${roomNumber}`),
                    axios.get(`/room_sales/Sales_Feedback/${roomNumber}`)
                ]);

                if (ratingResponse.data.status === 200 && feedbackResponse.data.status === 200) {
                    let salesRating = ratingResponse.data.salesRating;
                    const salesFeedback = feedbackResponse.data.salesFeedback;

                    // Ensure salesRating is an array and contains valid numerical values
                    if (!Array.isArray(salesRating)) {
                        salesRating = [salesRating];
                    }

                    salesRating = salesRating.map(rating => {
                        if (typeof rating === 'object' && rating.Sales_Rating) {
                            return rating.Sales_Rating;
                        }
                        return rating;
                    }).filter(rating => typeof rating === 'number' && rating >= 1 && rating <= 5);

                    // Assign ratings and feedback options
                    rooms.value[index].ratings = salesRating;
                    rooms.value[index].feedbackOptions = salesFeedback;

                    const canvasId = `myDoughnutChart${index}`;
                    const canvas = document.getElementById(canvasId);
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        updateDoughnutChart(ctx, salesRating);
                    }
                } else {
                    console.error('Failed to fetch sales rating or feedback');
                }
            } catch (error) {
                console.error('Error fetching sales rating or feedback:', error);
            }
        };

        const updateDoughnutChart = (ctx, salesRating) => {
            if (!Array.isArray(salesRating)) {
                console.error('Invalid salesRating:', salesRating);
                return;
            }
            const ratingCounts = [0, 0, 0, 0, 0];
            salesRating.forEach(rating => {
                if (rating >= 1 && rating <= 5) {
                    ratingCounts[rating - 1] += 1;
                } else {
                    console.error('Invalid rating value:', rating);
                }
            });

            new Doughnut(ctx, {
                data: {
                    labels: ['1 Stars', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
                    datasets: [{
                        label: 'Room Rating',
                        data: ratingCounts,
                        backgroundColor: [
                            'rgba(255,0,0)',
                            'rgba(255,69,0)',
                            'rgba(255,140,0)',
                            'rgba(255,165,0)',
                            'rgba(255,215,0)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutoutPercentage: 70,
                    plugins: {
                        legend: {
                            display: true
                        },
                        tooltip: {
                            enabled: true
                        }
                    }
                }
            });
        };

        const renderBarChart = () => {
            const ctx = document.getElementById('barChart').getContext('2d');
            barChart = new Bar(ctx, {
                type: 'bar',
                data: {
                    labels: rooms.value.map(room => `Room ${room.number}`),
                    datasets: [{
                        label: 'Total Rating',
                        data: rooms.value.map(room => room.ratings.reduce((sum, rating) => sum + rating, 0)),
                        backgroundColor: '#1e4e72'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        };

        const renderLineChart = () => {
            const ctx = document.getElementById('myLineChart').getContext('2d');
            lineChart = new Line(ctx, {
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Room Sales Rating Over Time',
                        data: [],
                        borderColor: '#1e4e72',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'month'
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Sales Rating'
                            }
                        }
                    }
                }
            });
        };

        const updateLineChart = async () => {
            if (!selectedRoom.value) {
                // Clear line chart data when no room is selected
                lineChart.data.labels = [];
                lineChart.data.datasets[0].data = [];
                lineChart.update();
                return;
            }
            try {
                const response = await axios.get(`/room_sales/Sales_Rating/${selectedRoom.value}`);
                if (response.data.status === 200) {
                    const salesRating = response.data.salesRating;

                    // Group sales ratings by month
                    const monthlyRatings = {};
                    salesRating.forEach(data => {
                        const date = new Date(data.created_at);
                        const month = date.toLocaleString('default', { month: 'short' });
                        const year = date.getFullYear();
                        const key = `${month} ${year}`;
                        if (!monthlyRatings[key]) {
                            monthlyRatings[key] = [];
                        }
                        monthlyRatings[key].push(data.Sales_Rating);
                    });

                    const labels = Object.keys(monthlyRatings);
                    const ratings = labels.map(label => {
                        const sum = monthlyRatings[label].reduce((acc, cur) => acc + cur, 0);
                        return sum / monthlyRatings[label].length;
                    });

                    lineChart.data.labels = labels;
                    lineChart.data.datasets[0].data = ratings;
                    lineChart.update();
                } else {
                    console.error('Failed to fetch sales data');
                }
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        const sortedRooms = computed(() => {
            return rooms.value.slice().sort((a, b) => {
                const totalRatingA = a.ratings.reduce((acc, cur) => acc + cur, 0);
                const totalRatingB = b.ratings.reduce((acc, cur) => acc + cur, 0);
                return totalRatingB - totalRatingA;
            });
        });


        onMounted(() => {
            fetchRooms().then(() => {
                renderLineChart();
                renderBarChart();
            });
        });

        watch(selectedRoom, updateLineChart);

        return {
            rooms,
            selectedFeedback,
            selectedRoom,
            roomOptions,
            sortedRooms,
        };
    }
};
</script>

<style scoped>
.cards-container {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
    gap: 10px;
}

.card {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    min-width: 400px;
    max-width: 300px;
    height: 170px;
    border-left: 25px #1e4e72 solid;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.3);
}

.fee-amount {
    color: #1e4e72;
    padding: 0 5px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.Feedback {
    color: rgba(0, 0, 0, 0.405);
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
}

.title {
    color: #1e4e72;
    border-top: 1px solid #1e4e72;
    height: 70px;
    width: 100%;
    padding: 0 5px;
    display: flex;
    align-items: center;
}

.rating-container {
    display: flex;
    justify-content: space-between;
    gap: 2px;
}

.chart-card {
    flex: 1.5;
    padding: 20px;
    margin: 0 10px;
}

.char-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.Line-chart-card {
    padding: 20px;
    margin: 0 10px;
    height: 450px;
}

canvas {
    max-width: 100%;
    max-height: 100%;
}

.room-details {
    margin-top: 10px;
    color: #1e4e72;
}

.room-details p {
    font-size: 14px;
    margin-bottom: 5px;
}

.room-col {
    display: flex;
    justify-content: center;
}

.room-card {
    display: flex;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.384);
    border-radius: 10px;
    background-color: white;
    min-width: 350px;
    max-width: 300px;
    height: 300px;
}

.chart-container {
    flex: 1;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.room-info {
    flex: 2;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.room-no {
    font-size: 24px;
    font-weight: bold;
    color: #1e4e72;
    margin-bottom: 15px;
}

.room-price {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #1e4e72;
    padding: 10px;
    border-radius: 5px;
    margin-top: 15px;
}

.select {
    height: 30px;
}

.room-list {
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
