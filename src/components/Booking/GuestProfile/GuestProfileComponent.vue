<template>
    <div class="container">
        <v-container style="padding-top: 80px; width: 80%;">
            <v-row>
                <v-col cols="5" style="padding: 20px;">
                    <v-card style="
                        border-radius: 40px;
                        background-color: #f8f8ff;
                        height: 800px;
                        width: 100%;
                        border-radius: 40px;">
                        <v-col>
                            <v-row>
                                <v-col style="padding-bottom: 0;">
                                    <div class="profile">
                                        <div class="image-container">
                                            <img src="../../../../public/Guest/guest1.jpg" width="100%" height="100%"
                                                style="border-radius: 50%;" alt="">
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col
                                    style="padding-top: 0; display: flex; align-items: center; justify-content: center; ">
                                    <hr>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <div class="">
                                        <h1>{{ guest.guest_first_name }} {{ guest.guest_last_name }}</h1>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-card>
                </v-col>

                <v-col cols="7" style="padding:20px;">
                    <v-row>
                        <v-col>
                            <v-card style="height: 640px; border-radius: 40px 40px 0 0 ; 
                        background-color: #f8f8ff;">
                                <v-col style="padding: 70px">

                                    <v-row>
                                        <v-col>
                                            <h2>Profile Details</h2>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols=4>
                                            <h3>Name:</h3>
                                        </v-col>

                                        <v-col cols="8">
                                            <h3>{{ guest.guest_first_name }} {{ guest.guest_last_name }}</h3>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols=4>
                                            <h3>Email:</h3>
                                        </v-col>

                                        <v-col cols="8">
                                            <h3> {{ guest.guest_email }} </h3>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols=4>
                                            <h3>Contact Number:</h3>
                                        </v-col>

                                        <v-col cols="8">
                                            <h3> {{ guest.guest_contact_no }} </h3>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols=4>
                                            <h3>Address:</h3>
                                        </v-col>

                                        <v-col cols="8">
                                            <h3> {{ guest.guest_barangay }}, {{ guest.guest_municipality }}, {{ guest.guest_province }}</h3>
                                        </v-col>
                                    </v-row>

                                </v-col>


                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-card style="padding: 40px; height: 134px; border-radius: 0 0 40px 40px;
                        background-color: #f8f8ff;">
                                <v-row>
                                    <v-col>
                                        <v-btn color="black" style="height: 54px; border-radius: 20px;">CHANGE PASSWORD</v-btn>
                                    </v-col>

                                    <v-col>
                                        <v-btn color="#1E4E72" style="height: 54px; border-radius: 20px;">UPDATE ACCOUNT INFO</v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>


                    </v-row>


                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            guest: {},
        };
    },
    computed: {

    },
    methods: {
        fetchGuest() {
            const account_id = this.$route.params.account_id;
            axios
                .get(`http://127.0.0.1:8000/api/guest/${account_id}`)
                .then((response) => {
                    if (response.data.status === 200) {
                        this.guest = response.data.Guest;
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching guest:", error);
                });
        },
        calculateAge(birthdate) {
            const birthDate = new Date(birthdate);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
    },
    created() {
        this.fetchGuest();
    },
};
</script>


<style scoped>
.container {
    width: 100vw;
    min-height: 100vh;
    max-height: auto;
    background-color: #f8f8ff;
}

.v-card {}

.profile {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container {
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 10px solid #1e4e722c;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    text-align: center;
    color: #1E4E72;
}

h1 {
    font-size: 50px;
}

h2 {
    text-align: center;
    font-size: 40px;
    font-weight: 900;
}

h3 {
    text-align: left;
    font-size: 20px;
}

hr {
    width: 70%;
    border-width: 2px;
    opacity: 0.5;
}

.v-btn {
    width: 100%;
    border-radius: 20px;
}

.v-card {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
</style>
