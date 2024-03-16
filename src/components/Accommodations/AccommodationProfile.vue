<template>
    <div class="accommodation-container">
        <div class="cover"
            :style="{ backgroundImage: 'url(' + profile.cover + ')', backgroundSize: 'cover', backgroundRepeat: 'repeat' }">
        </div>

        <v-container class="accommodation-profile">
            <v-profile class="profile"
                :style="{ backgroundImage: 'url(' + profile.image + ')', backgroundSize: 'cover', backgroundRepeat: 'repeat' }">

            </v-profile>

            <v-description class="description">
                <h1>{{ profile.accommodationName }}</h1>
                <p>{{ profile.description }}</p>

                <v-button-container class="check-in-btn">
                    <button @click="editProfile">Edit Profile</button>
                </v-button-container>
            </v-description>

            <!-- Form for editing profile -->
            <v-edit-profile v-if="editing" :profile="profile" @save="saveProfile" @cancel="cancelEdit" />
        </v-container>
    </div>

    <AccommodationRoom />
</template>

<script>
export default {
    data() {
        return {
            profile: {
                accommodationName: "Kim Angela Homestay",
                description: "Kim Angela Homestay, situated in close proximity to Paniman Elementary School in Caramoan, Camarines Sur, features seven well-appointed rooms, providing a welcoming retreat for guests seeking comfort and convenience in this stunning locale. In addition to the cozy accommodations, the homestay provides complimentary Wi-Fi access, ensuring that guests stay connected and informed throughout their stay. To enhance the experience, a karaoke setup is also available, adding a fun and lively dimension to their visit. With the perfect blend of comfort, modern amenities, and entertainment, Kim Angela Homestay is an ideal choice for those looking to make the most of their time in this beautiful area.",
                image: '/1.jpg',
                cover: '/Matukad-Island-Caramoan.webp',
            },
            editing: false, // Flag to indicate if editing mode is active
        };
    },
    methods: {
        editProfile() {
            this.editing = true; // Activate editing mode
        },
        saveProfile(updatedProfile) {
            // Save the updated profile data
            this.profile = updatedProfile;
            this.editing = false; // Deactivate editing mode
        },
        cancelEdit() {
            this.editing = false; // Cancel editing mode
        }
    }
};
</script>

<style scoped>
.accommodation-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 60px
}

.cover {
    width: 100%;
    height: 450px;
    background-color: #3174a8;
    background-repeat: no-repeat;
    background-size: cover;

}

h1 {
    color: #3174a8;
}

.accommodation-profile {
    position: relative;
    z-index: 1;
    margin-top: -150px;
    background-color: white;
    box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 70%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.profile {
    position: relative;
    border: 12px solid white;
    width: 300px;
    height: 300px;
    margin-bottom: 10px;
    margin-top: -160px;
    border-radius: 50%;
    background-color: #1E4E72;
    background-repeat: no-repeat;
    background-size: cover;
}

h1 {
    font-size: 35px;
    font-weight: bold;
}

p {
    padding: 15px 0;
    text-align: justify;
    font-size: 25px;
    font-weight: normal;
}

.description {
    padding: 0px 40px 40px 40px;
    text-align: center;
}

.check-in-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: left;
}

.check-in-btn button {
    background-color: #1E4E72;
    border-style: none;
    color: white;
    padding: 12px 40px;
    transition: ease-in-out all .2s;
}

.check-in-btn button:hover {
    background-color: #183e5b;
    transition: ease-in-out all .2s;
    cursor: pointer;
}
</style>