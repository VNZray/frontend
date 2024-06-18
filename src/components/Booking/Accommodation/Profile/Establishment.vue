<template>
  <div v-if="establishment" style="min-height: 100vh; max-height: auto;">
    <div class="accommodation-container">
      <div class="cover"></div>

      <div class="accommodation-profile">
        <div class="profile">
          <img :src="establishment.accommodation_image" width="100%" height="100%"
            style="border-radius: 50%; background-color: #1e4e72" alt="" />
        </div>
        <div v-if="account.id" class="description" style="color: #1e4e72; width: 100%;">
          <h1>{{ establishment.establishment_name }}</h1>
          <p class="accommodation-description" v-if="establishment.establishment_description">
            {{ establishment.establishment_description }}
          </p>
          <p class="accommodation-description" v-else>
            Loading...
          </p>

          <v-dialog v-model="dialog" max-width="600" style="height: auto">
            <v-card>
              <v-card-actions>
                <BookingForm :selectedRoom="selectedRoom" @closeDialog="closeDialog" />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <div v-else class="description" style="color: #1e4e72">
          <h1>{{ establishment.establishment_name }}</h1>
          <p class="accommodation-description">
            {{ establishment.establishment_description }}
          </p>

          <v-dialog v-model="showSignInDialog" max-width="400">
            <v-card style="padding: 10px;">
              <v-card-text>
                <v-row>
                  <v-col>
                    <h2 style="font-size: 20px; text-align: center">You're not signed-in!</h2>
                    <h2 style="font-size: 20px; text-align: center">Sign in to proceed</h2>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn elevation="6" @click="closeSignInDialog" style="width: 100%;">Cancel</v-btn>
                  </v-col>

                  <v-col>
                    <v-btn elevation="6" to="/login" style="width: 100%;" color="primary">Sign In</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>

    <div style="
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
      <v-card class="content-title" elevation="0" style="width: 72%">
        <v-card-title class="grey--text text--darken-2">
          <h2 style="text-align: left; font-weight: 900; color: #1e4e72">
            Accommodation Rooms
          </h2>
        </v-card-title>
      </v-card>
    </div>

    <!-- Room -->

    <section v-if="filteredRooms.length > 0 && account.id">
      <article v-for="(room, index) in filteredRooms" :key="index" @click="openDialog(room)">
        <div :class="['room-image', 'image' + (index + 1)]">
          <h4 class="room-type">{{ room.room_type }}</h4>
        </div>

        <div class="room-info">
          <div class="details">
            <h3 class="room-no">{{ "Room " + room.room_number }}</h3>
            <div class="room-details">
              <div v-for="(detail, index) in room.details" :key="index" :class="'rd-' + (index + 1)">
                <component :is="getIconComponent(detail.alt)" />
                <p>{{ detail.text }}</p>
              </div>
            </div>
          </div>
          <h4 class="room-price">{{ room.room_price + " PHP" }}</h4>
        </div>
      </article>
    </section>

    <section v-else-if="filteredRooms.length > 0 && !account.id">
      <article v-for="(room, index) in filteredRooms" :key="index" @click.prevent="openSignInDialog">
        <div :class="['room-image', 'image' + (index + 1)]">
          <h4 class="room-type">{{ room.room_type }}</h4>
        </div>

        <div class="room-info">
          <div class="details">
            <h3 class="room-no">{{ "Room " + room.room_number }}</h3>
            <div class="room-details">
              <div v-for="(detail, index) in room.details" :key="index" :class="'rd-' + (index + 1)">
                <component :is="getIconComponent(detail.alt)" />
                <p>{{ detail.text }}</p>
              </div>
            </div>
          </div>
          <h4 class="room-price">{{ room.room_price + " PHP" }}</h4>
        </div>
      </article>
    </section>

    <section v-else-if="loading">
      <h1>Loading...</h1>
    </section>

    <section v-else>
      <h1>No room available</h1>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import BookingForm from "./BookingForm.vue";
import CapacityIcon from "./icons/CapacityIcon.vue";
import Amenities from "./icons/Amenities.vue";
import BedIcon from "./icons/BedIcon.vue";

export default {
  components: {
    BookingForm,
    CapacityIcon,
    Amenities,
    BedIcon,
  },
  data() {
    return {
      dialog: false,
      establishment: {},
      account: {},
      rooms: [],
      loading: true,
      showSignInDialog: false,
      selectedRoom: null,
    };
  },
  created() {
    this.fetchAccount();
    this.fetchEstablishment();
    this.fetchRooms();
  },
  mounted() {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  },
  computed: {
    filteredRooms() {
      if (this.establishment) {
        return this.rooms.filter(
          (room) => room.establishment_id === this.establishment.id
        );
      }
      return [];
    },
  },
  methods: {
    openSignInDialog() {
      this.showSignInDialog = true;
    },
    closeSignInDialog() {
      this.showSignInDialog = false;
    },
    fetchEstablishment() {
      const establishment_id = this.$route.params.establishment_id;
      axios
        .get(`http://127.0.0.1:8000/api/establishment/${establishment_id}`)
        .then((response) => {
          const imageUrls = {
            1: "/Accommodation/1.jpg",
            2: "/Accommodation/2.jpg",
            3: "/Accommodation/3.jpg",
            4: "/Accommodation/4.jpg",
            5: "/Accommodation/5.jpg",
          };

          const establishment = response.data.Establishment;
          establishment.accommodation_image =
            imageUrls[establishment.id] || "/default-image.jpg";

          this.establishment = establishment;
        })
        .catch((error) => {
          console.error("Error fetching establishment:", error);
        });
    },
    fetchAccount() {
      const account_id = this.$route.params.account_id;
      if (account_id) {
        axios
          .get(`http://127.0.0.1:8000/api/guest_account/${account_id}`)
          .then((response) => {
            this.account = response.data.Account;
          })
          .catch((error) => {
            console.error("Error fetching account:", error);
          });
      } else {
        console.error("Account ID is undefined");
      }
    },
    fetchRooms() {
      axios
        .get(`http://127.0.0.1:8000/api/room/available`)
        .then((response) => {
          const roomData = response.data.Room;

          roomData.forEach((roomItem) => {
            const roomDetails = [
              {
                alt: "Capacity",
                text: `Capacity: ${roomItem.room_capacity}-${roomItem.room_capacity + 2
                  } Person.`,
              },
              {
                alt: "Bed",
                text: `${roomItem.number_of_bed} beds 1 extra bed.`,
              },
              { alt: "Amenities", text: roomItem.room_amenities },
            ];

            const room = {
              id: roomItem.id,
              establishment_id: roomItem.establishment_id,
              room_type: roomItem.room_type,
              room_number: roomItem.room_number,
              room_price: roomItem.room_price,
              details: roomDetails,
            };

            this.rooms.push(room);
          });
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
          this.loading = false;
        });
    },
    openDialog(room) {
      this.selectedRoom = room;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    getIconComponent(alt) {
      switch (alt) {
        case "Capacity":
          return CapacityIcon;
        case "Bed":
          return BedIcon;
        case "Amenities":
          return Amenities;
        default:
          return null;
      }
    },
  },
};
</script>


<style scoped>
.accommodation-wrapper {
  width: 100%;
}

.accommodation-container,
.room-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.cover {
  width: 100%;
  height: 450px;
  background-image: url("/Islands/Matukad-Island-Caramoan.webp");
  background-repeat: no-repeat;
  background-size: cover;
}

.accommodation-profile {
  position: relative;
  z-index: 1;
  margin-top: -150px;
  background-color: white;
  border-radius: 10px;
  width: 70%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.accommodation-profile:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.profile {
  position: relative;
  border: 12px solid white;
  width: 300px;
  height: 300px;
  margin-bottom: 10px;
  margin-top: -160px;
  border-radius: 50%;
}

h1 {
  font-size: 35px;
  font-weight: bold;
}

.accommodation-description {
  padding: 15px 0;
  text-align: justify;
  font-size: 25px;
  font-weight: normal;
}

.description {
  padding: 0px 40px 40px 40px;
  text-align: center;
  width: 100%;
}

.check-in-btn {
  display: flex;
  align-items: center;
  justify-content: left;
}

.v-btn {
  height: 40px;
}

.check-in-btn button {
  background-color: #1e4e72;
  border-style: none;
  color: white;
  padding: 0 40px;
  transition: ease-in-out all 0.2s;
}

h2 {
  font-size: 30px;
  font-weight: 900;
  color: #1e4e72;
}

/* Room Style */
.room-card-container {
  width: 70%;
  background-color: #1e4e72;
  height: auto;
}

.room-cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 25px;
}

.room-card {
  box-shadow: 0px 0px 5px 5px #1e4e72;
  background-color: white;
}

.room-image.image1 {
  background-image: url("./rooms/1.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.room-image.image2 {
  background-image: url("./rooms/2.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.room-image.image3 {
  background-image: url("./rooms/3.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.room-image.image4 {
  background-image: url("./rooms/4.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.room-image.image5 {
  background-image: url("./rooms/5.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.room-image.image6 {
  background-image: url("./rooms/6.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.room-image.image7 {
  background-image: url("./rooms/7.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.details {
  width: 100%;
  height: 83%;
}

section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

section article {
  display: flex;
  width: 610px;
  height: 320px;
  flex-shrink: 0;
  margin: 50px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border-radius: 10px;
  cursor: pointer;
}

section article:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

[class^="room-image"],
[class^="room-info"] {
  width: 50%;
  height: 100%;
}

[class^="room-type"],
[class^="room-price"] {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 0 0 0 10px;
}

.room-price {
  border-radius: 0 0 10px 0;
  background-color: #1e4e72;
}

.room-no {
  color: #1e4e72;
  text-align: center;
  margin: 15px;
}

[class^="room-image"] {
  border-radius: 10px 0 0 10px;
  background-color: #1e4e72;
  display: flex;
  align-items: end;
}

[class^="room-info"] {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  border-radius: 0 10px 10px 0;
}

[class^="rd-"] {
  padding-left: 20px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
}

[class^="rd-"] p {
  font-size: 16px;
  margin: 0;
  color: #1e4e72;
  font-weight: 700;
}
</style>