<template>
    <div class="cover"></div>
    <v-container class="main-container">
        <v-container class="accommodation-profile">
            <div class="circle-adjustment">
                <div class="profile" @click="editProfileImage"
                    :style="{ backgroundImage: 'url(' + profileImage + ')' }">
                </div>
            </div>

            <div class="content-title">
                <h1 class="AccommodationTitle" @click="editEstablishmentName">{{ establishmentName }}</h1>
                <div>
                    <h2>Add your rooms</h2>
                    <v-btn fixed bottom right @click="openDialog(null)" color="primary" fab>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <div class="search-bar">
                        <v-text-field v-model="searchQuery" label="Search by Room Number"
                            @input="filterRooms"></v-text-field>
                    </div>
                </div>
            </div>
        </v-container>

        <section>
            <div class="room-row" v-for="(roomPair, index) in filteredRoomPairs" :key="index">
                <article v-for="(room, rIndex) in roomPair" :key="rIndex" class="room-article">
                    <div class="room-card">
                        <div class="room-image"></div>
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
                            <div class="room-actions">
                                <v-btn @click="openDialog(room.id, room)" color="blue">Update</v-btn>
                                <v-btn @click="deleteRoom(room.id)" color="red">Delete</v-btn>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ isEditing ? 'Update Room' : 'Add New Room' }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="saveRoom">
                        <v-text-field v-model="newRoom.number" label="Room Number" required></v-text-field>
                        <v-text-field v-model="newRoom.price" label="Room Price" type="number" required></v-text-field>
                        <v-text-field v-model="newRoom.details[0].text" label="Capacity" type="number"
                            required></v-text-field>
                        <v-text-field v-model="newRoom.details[1].text" label="Number of Beds" type="number"
                            required></v-text-field>
                        <v-text-field v-model="newRoom.details[2].text" label="Amenities (comma separated)"
                            required></v-text-field>
                        <input type="file" @change="handleImageUpload" />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="saveRoom">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/room';

const dialog = ref(false);
const isEditing = ref(false);
const editIndex = ref(null);
const rooms = ref([]);
const newRoom = ref({
    id: null,
    number: '',
    price: '',
    details: [
        { alt: 'Capacity', text: '' },
        { alt: 'Number of Beds', text: '' },
        { alt: 'Amenities', text: '' }
    ],
    image: ''
});

const searchQuery = ref('');

const filteredRooms = computed(() => {
    if (!searchQuery.value) {
        return rooms.value;
    }
    return rooms.value.filter(room => room.number.includes(searchQuery.value));
});

const roomPairs = computed(() => {
    const pairs = [];
    for (let i = 0; i < rooms.value.length; i += 2) {
        pairs.push(rooms.value.slice(i, i + 2));
    }
    return pairs;
});

const filteredRoomPairs = computed(() => {
    const pairs = [];
    for (let i = 0; i < filteredRooms.value.length; i += 2) {
        pairs.push(filteredRooms.value.slice(i, i + 2));
    }
    return pairs;
});

const openDialog = (index, room = null) => {
    if (index !== null) {
        isEditing.value = true;
        editIndex.value = index;
        newRoom.value = { ...room, id: room.id }; // Copy room data including id
    } else {
        isEditing.value = false;
        newRoom.value = {
            id: null,
            number: '',
            price: '',
            details: [
                { alt: 'Capacity', text: '' },
                { alt: 'Number of Beds', text: '' },
                { alt: 'Amenities', text: '' }
            ],
            image: ''
        };
    }
    dialog.value = true;
};

const saveRoom = async () => {
    if (isEditing.value) {
        await updateRoom();
    } else {
        await createRoom();
    }
    dialog.value = false;
};

const createRoom = async () => {
    try {
        const response = await axios.post('/', {
            Room_Number: newRoom.value.number,
            Room_Price: newRoom.value.price,
            Room_Capacity: newRoom.value.details[0].text,
            Number_Of_Beds: newRoom.value.details[1].text,
            Room_Amenities: newRoom.value.details[2].text
        });
        if (response.status === 200) {
            console.log('Room created successfully');
            fetchRooms();
        } else {
            console.error('Failed to create room');
        }
    } catch (error) {
        console.error('Error creating room:', error);
    }
};

const updateRoom = async () => {
    try {
        const response = await axios.put(`/${newRoom.value.id}/edit`, {
            Room_Number: newRoom.value.number,
            Room_Price: newRoom.value.price,
            Room_Capacity: newRoom.value.details[0].text,
            Number_Of_Beds: newRoom.value.details[1].text,
            Room_Amenities: newRoom.value.details[2].text
        });
        if (response.status === 200) {
            console.log('Room updated successfully');
            fetchRooms();
        } else {
            console.error('Failed to update room');
        }
    } catch (error) {
        console.error('Error updating room:', error);
    }
};

const deleteRoom = async (roomId) => {
    try {
        const response = await axios.delete(`/${roomId}/delete`);
        if (response.status === 200) {
            console.log('Room deleted successfully');
            fetchRooms();
        } else {
            console.error('Failed to delete room');
        }
    } catch (error) {
        console.error('Error deleting room:', error);
    }
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            newRoom.value.image = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const establishmentName = ref("Name of Establishment");
const profileImage = ref(null);

const editEstablishmentName = () => {
    const newName = prompt("Enter new name:");
    if (newName) {
        establishmentName.value = newName;
    }
};

const editProfileImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    input.click();
};

const fetchRooms = async () => {
    try {
        const response = await axios.get('/');
        if (response.data.status === 200) {
            rooms.value = response.data.rooms.map(room => ({
                id: room.id, // Include id from backend response
                number: room.Room_Number,
                price: room.Room_Price,
                details: [
                    { alt: 'Capacity', text: room.Room_Capacity },
                    { alt: 'Number of Beds', text: room.Number_Of_Beds },
                    ...room.Room_Amenities.split(',').map(amenity => ({ alt: 'Amenity', text: amenity.trim() }))
                ],
                image: '' // Placeholder for image URL or path
            }));
        } else {
            console.error('Failed to fetch rooms:', response.data.message);
        }
    } catch (error) {
        console.error('Failed to fetch rooms:', error);
    }
};

onMounted(() => {
    fetchRooms();
});
</script>

<style scoped>
h1 {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    color: #1e4e72;
}

h2 {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    color: #1e4e72;
}

.cover {
    width: 100%;
    height: 450px;
    background-image: url('https://cctravel.dk/wp-content/uploads/2020/05/shutterstock_1073973050-min.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.circle-adjustment {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -160px;
    margin-bottom: -80px;
}

.profile {
    border: 12px solid white;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-position: center;
    background-color: #1e4e72;
    background-repeat: no-repeat;
    background-size: cover;
}

.profile:hover {
    background-color: #183f5d;
    cursor: pointer;
}

.accommodation-profile {
    position: relative;
    z-index: 1;
    margin-top: -100px;
    margin-bottom: 50px;
    background-color: white;
    box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 70%;
    height: auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.content-title {
    padding: 80px;
    text-align: center;
}

.search-bar {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.AccommodationTitle {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.AccommodationTitle:hover {
    color: #1e4e72;
    cursor: pointer;
}

.description {
    font-size: 16px;
    color: #1e4e72;
    margin-top: 10px;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.room-row {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 1px;
}

.room-article {
    flex: 1;
    display: flex;
    justify-content: center;
    max-width: 35%;
    margin: 20px 20px;
}

.room-card {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 600px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
}

.room-image {
    width: 50%;
    height: 280px;
    background-image: url('Room.jpg');
    background-size: cover;
    background-position: center;
}

.room-info {
    width: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.room-no {
    font-size: 24px;
    font-weight: bold;
    color: #1e4e72;
    text-align: center;
    margin-bottom: 15px;
}

.room-details {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.room-details p {
    font-size: 16px;
    color: #1e4e72;
    font-weight: 700;
}

.room-price {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #1e4e72;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 10px;
}

.room-actions {
    display: flex;
    justify-content: space-between;
}

@media (max-width: 768px) {
    .accommodation-profile {
        width: 90%;
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 20px;
    }

    .content-title {
        padding: 20px;
    }

    .profile {
        width: 150px;
        height: 150px;
        margin-top: -80px;
        margin-bottom: -40px;
    }

    .room-card {
        flex-direction: column;
        width: 100%;
        max-width: none;
    }

    .room-image {
        width: 100%;
        height: 200px;
    }

    .room-info {
        width: 100%;
        padding: 10px;
    }

    .room-article {
        max-width: 100%;
        margin: 10px 0;
    }

    .room-no {
        font-size: 20px;
    }

    .room-details p {
        font-size: 14px;
    }

    .room-price {
        font-size: 16px;
    }
}

@media (max-width: 480px) {
    .profile {
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-bottom: -20px;
    }

    .room-image {
        height: 150px;
    }

    .room-no {
        font-size: 18px;
    }

    .room-details p {
        font-size: 12px;
    }

    .room-price {
        font-size: 14px;
    }
}
</style>
