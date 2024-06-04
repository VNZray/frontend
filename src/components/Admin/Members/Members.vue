<template>
    <div class="members-container">
        <v-card class="member-card" v-for="member in members" :key="member.name" @click="selectMember(member)">
            <v-img height="150px" :src="member.image" cover></v-img>
            <v-divider></v-divider>
            <v-card-text>
                <h3>{{ member.name }}</h3>
                <p>{{ member.bio }}</p>
            </v-card-text>
        </v-card>

        <!-- Display selected member's information in a dialog -->
        <v-dialog v-model="dialog">
            <v-card>
                <div class="name-about-layout">
                    <div class="name-image-container">
                        <img :src="selectedMember.image" style="max-width: 280px; max-height: 200px;">
                        <div><b>{{ selectedMember.name }}</b></div>
                        <v-divider></v-divider>
                    </div>

                    <div class="about-layout">
                        <div><b>Member ID:</b> {{ selectedMember.memberID }}</div>
                        <div><b>Full Name:</b> {{ selectedMember.name }}</div>
                        <div><b>About me:</b> {{ selectedMember.bio }}</div>
                        <div><b>Accommodation Name:</b> {{ selectedMember.accommodationName }}</div>
                    </div>
                </div>
                <div class="parent-container">

                    <div class="information-container-left">
                        <v-card-text>
                            <b>Email:</b> {{ selectedMember.email }}
                        </v-card-text>

                        <v-card-text>
                            <b>Address:</b> {{ selectedMember.address }}
                        </v-card-text>

                        <v-card-text>
                            <b>Contact Number:</b> {{ selectedMember.number }}
                        </v-card-text>

                        <v-card-text>
                            <b>Gender:</b> {{ selectedMember.gender }}
                        </v-card-text>
                    </div>

                    <div class="information-container-right">
                        <v-card-text>
                            <b>Civil Status:</b> {{ selectedMember.civilstatus }}
                        </v-card-text>

                        <v-card-text>
                            <b>Birthdate:</b> {{ selectedMember.birthdate }}
                        </v-card-text>

                        <v-card-text>
                            <b>Status:</b> {{ selectedMember.status }}
                        </v-card-text>

                        <v-card-text>
                            <b>Age:</b> {{ selectedMember.age }}
                        </v-card-text>
                    </div>
                </div>

                <!-- Close button -->
                <v-container>
                    <v-row justify="end"> <!-- Align items to the right -->
                        <v-col cols="auto">
                            <v-btn height="40" min-width="100">Update</v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn height="40" min-width="100">Delete</v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn height="40" min-width="100" @click="closeDialog">Close</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>

    </div>
</template>

<style scoped>
.members-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.member-card {
    width: 220px;
    margin: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.member-card:hover {
    transform: translateY(10px);
}

.member-card v-img {
    border-radius: 5px 4px 0 0;
}

.member-card v-divider {
    margin: 10px 0;
    border-color: #ccc;
}

.member-card h3 {
    font-size: 20px;
    margin: 10px 0;
}

.member-card p {
    font-size: 14px;
    color: #777;
}

.name-about-layout {
    display: flex;
    align-items: flex-start;
    font-size: 20px;
}

.name-image-container {
    max-width: 400px;
    border: 4px solid #607683;
    background-color: #607683;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.name-about-container div {
    text-align: center;
}

.about-layout {
    border: 3px solid#607683;
    margin: 5px;
    width: 100%;
    padding: 18px;
    background-color: #ffffff;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

.parent-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}

.information-container-left,
.information-container-right {
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px
}

.information-container-left {
    height: 90%;
    align-items: flex-start;
    border: 3px solid #607683;
}

.information-container-right {
    height: 90%;
    align-items: flex-start;
    border: 3px solid #607683;
}

.v-card-text b {
    color: #333;
}

.v-card-text {
    font-size: 100px;
}

/* Custom styles for v-dialog */
.v-dialog {
    width: 52.5%;
    height: 90%;
    font-family: Arial, Helvetica, sans-serif;
}

/* Custom styles for v-card inside v-dialog */
.v-dialog .v-card {
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Custom styles for v-card-title inside v-dialog */
.v-dialog .v-card-title {
    color: #333333;
    font-size: 24px;
}

/* Custom styles for v-card-text inside v-dialog */
.v-dialog .v-card-text {
    color: #666666;
    font-size: 16px;
}

/* Custom styles for v-card-actions inside v-dialog */
.v-dialog .v-card-actions {
    justify-content: flex-end;
}

/* Custom styles for v-btn inside v-dialog */
.v-dialog .v-btn {
    background-color: #607683;
    color: rgb(255, 255, 255);
    border-radius: 4px;
    margin-left: 8px;
    transition: background-color 0.3s;
}

/* Custom styles for v-btn hover state */
.v-dialog .v-btn:hover {
    background-color: #7a9aac;
}
</style>

<script>
export default {
    data() {
        return {
            members: [
                {
                    name: "Voun Irish Florence Dejumo",
                    bio: "Passionate dreamer. Coffee addict. Nature lover. Adventure seeker. Music enthusiast. Foodie. Movie buff.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: "Brgy, Paniman Caramoan, Camarines Sur.",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Raiden Shogun",
                    bio: "Eternal optimist. Coffee aficionado. Nature enthusiast. Adventure seeker. Bookworm. Foodie. Music lover.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Eternity Hall",
                    email: "raiden@example.com",
                    memberID: "2",
                    address: "Caramoan, Camarines Sur.",
                    number: "09821123344",
                    gender: "Female",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Yae Miko",
                    bio: "Dreamer. Coffee addict. Nature lover. Bookworm. Adventure seeker. Foodie. Music enthusiast.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Fox Hall",
                    email: "YaeMiko@example.com",
                    memberID: "3",
                    address: " ",
                    number: "09821123344",
                    gender: "Female",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Wanderer",
                    bio: "Eternal wanderer. Coffee aficionado. Nature enthusiast. Adventure seeker. Foodie. Movie buff. Tech geek.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Anemo Archon Dormitory",
                    email: "WandererScara@example.com",
                    memberID: "4",
                    address: " ",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Shinobu Kocho",
                    bio: "Bookworm. Coffee addict. Adventure seeker. Amateur chef. DIY enthusiast. Yoga practitioner. Star-gazer.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Butterfly Hall",
                    email: "KochoShin@example.com",
                    memberID: "5",
                    address: " ",
                    number: "09821123344",
                    gender: "Female",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Kyojuro Rengoku",
                    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: " ",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Kyojuro Rengoku",
                    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: " ",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Kyojuro Rengoku",
                    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: " ",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Kyojuro Rengoku",
                    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: " ",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Kyojuro Rengoku",
                    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: " ",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Kyojuro Rengoku",
                    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: " ",
                    number: "09821123344",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Kyojuro Rengoku",
                    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: " ",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Kyojuro Rengoku",
                    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: " ",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
                {
                    name: "Kyojuro Rengoku",
                    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "../public/bussiness-man.png",
                    accommodationName: "Flame Hashira Dormitory",
                    email: "kyojuro@example.com",
                    memberID: "1",
                    address: " ",
                    number: "09821123344",
                    gender: "Male",
                    civilstatus: "Single",
                    status: "Active",
                    birthdate: "02/02/24",
                    age: "26"
                },
            ],
            selectedMember: null,
            dialog: false // Control dialog visibility
        };
    },
    methods: {
        selectMember(member) {
            this.selectedMember = member;
            this.dialog = true; // Open the dialog
        },
        closeDialog() {
            this.dialog = false; // Close the dialog
        }
    }
}
</script>
