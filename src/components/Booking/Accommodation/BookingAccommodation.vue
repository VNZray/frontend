<template>
    <div style="min-height: 100vh; max-height: auto;">
        <div class="accommodation-home-container">
            <v-container class="message">
                <v-row justify="center">
                    <v-col cols="12" class="text-center">
                        <h1>FIND A PLACE TO STAY WITH YOUR</h1>
                        <h1>FRIENDS AND FAMILY</h1>
                    </v-col>
                </v-row>
            </v-container>

            <v-container class="search-container" fluid style="padding: 0">
                <v-row style="margin: 5.5% 12.5% 0 12.5%; position: relative; width: 75%">
                    <v-col cols="9" class="search-field">
                        <v-text-field class="search-input" v-model="searchQuery" label="Search here" variant="outlined"
                            hide-details single-line></v-text-field>
                    </v-col>

                    <v-col cols="1.5" class="search-btn" style="padding: 0 0 0 10px">
                        <v-btn @click="search" color="#1E4E72" style="width: 100%; height: 52px">Search</v-btn>
                    </v-col>

                    <v-col cols="1.5" class="filter-btn" style="padding: 0 0 0 10px">
                        <v-menu transition="scale-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn style="height: 52px; width: 100%;" color="#1E4E72" v-bind="props">
                                    Filter
                                </v-btn>
                            </template>

                            <v-list style="max-height: 200px; overflow-y: auto;">
                                <v-list-item v-for="(item, i) in items" :key="i" @click="filter(item.title)">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>

                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div class="content">
            <div class="content-title">
                <h2>ACCOMMODATIONS</h2>
            </div>

            <v-container class="d-flex justify-center align-center" fluid style="padding: 10px 12.5% 20px 12.5%">
                <v-row align="center" justify="start">
                    <template v-if="filteredCards.length > 0">
                        <v-col v-for="(accommodation, index) in filteredCards" :key="index" cols="12" md="6" sm="12"
                            lg="4">
                            <v-card 
                                :to="account.id ? `/booking/establishment/profile/${accommodation.id}/account/${account.guest_id}` : `/booking/establishment/profile/${accommodation.id}`">
                                <v-container :style="{
                                    height: '250px',
                                    backgroundImage: 'url(' + accommodation.accommodation_image + ')',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }"></v-container>

                                <v-card-title class="title">{{ accommodation.establishment_name }}</v-card-title>

                                <v-card-text>
                                    {{ accommodation.establishment_address + ", Caramoan, Camarines Sur" }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </template>
                    <template v-else>
                        <v-col cols="12" class="text-center">
                            <h2>Loading...</h2>
                        </v-col>
                    </template>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            items: [
                { title: "Agaas" },
                { title: "Antolon" },
                { title: "Bacgong" },
                { title: "Bahay" },
                { title: "Binanuahan" },
                { title: "Cabacongan" },
                { title: "Cadong" },
                { title: "Colongcogong" },
                { title: "Canatuan" },
                { title: "Caputatan" },
                { title: "Gogon" },
                { title: "Daraga" },
                { title: "Gata" },
                { title: "Gibgos" },
                { title: "Guijalo" },
                { title: "Hanopol" },
                { title: "Hanoy" },
                { title: "Haponan" },
                { title: "Ilawod" },
                { title: "Ili-Centro" },
                { title: "Lidong" },
                { title: "Lubas" },
                { title: "Malabog" },
                { title: "Maligaya" },
                { title: "Mampirao" },
                { title: "Mandiclum" },
                { title: "Maqueda" },
                { title: "Minalaba" },
                { title: "Oring" },
                { title: "Oroc-Osoc" },
                { title: "Pagolinan" },
                { title: "Pandanan" },
                { title: "Paniman" },
                { title: "Patag-Belen" },
                { title: "Pili-Centro" },
                { title: "Pili-Tabiguian" },
                { title: "Poloan" },
                { title: "Salvacion" },
                { title: "San Roque" },
                { title: "San Vicente" },
                { title: "Santa Cruz" },
                { title: "Solnopan" },
                { title: "Tabgon" },
                { title: "Tabiguian" },
                { title: "Tabog" },
                { title: "Tawog" },
                { title: "Toboan" },
                { title: "Terogo" },
            ],
            searchQuery: "",
            accommodations: [],
            account: {},
            filteredCards: [],
        };
    },
    created() {
        this.fetchAccommodations();
        this.fetchAccount();
        this.fetchAccountId();
    },
    methods: {
        fetchAccommodations() {
            axios
                .get("http://127.0.0.1:8000/api/establishment")
                .then((response) => {
                    const imageUrls = [
                        "/Accommodation/1.jpg",
                        "/Accommodation/2.jpg",
                        "/Accommodation/3.jpg",
                        "/Accommodation/4.jpg",
                        "/Accommodation/5.jpg",
                    ];

                    // Combine the fetched data with the hardcoded image URLs
                    this.accommodations = response.data.Establishment.map(
                        (establishment, index) => {
                            return {
                                ...establishment,
                                accommodation_image: imageUrls[index % imageUrls.length],
                            };
                        }
                    );
                    this.filteredCards = this.accommodations;
                })
                .catch((error) => {
                    console.error("Error fetching accommodations:", error);
                });
        },
        fetchAccount() {
            axios
                .get("http://127.0.0.1:8000/api/account")
                .then((response) => {
                    console.log("Account data:", response.data); // Log the response
                    this.account = response.data.Account;
                })
                .catch((error) => {
                    console.error("Error fetching account:", error);
                });
        },
        fetchAccountId() {
            const account_id = this.$route.params.account_id;
            if (account_id) {
                axios.get(`http://127.0.0.1:8000/api/guest_account/${account_id}`)
                    .then(response => {
                        this.account = response.data.Account;
                        console.log('Account data:', this.account);
                    })
                    .catch(error => {
                        console.error('Error fetching account:', error);
                    });
            } else {
                console.error('Account ID is undefined');
            }
        },
        search() {
            if (this.searchQuery.trim() === "") {
                this.filteredCards = this.accommodations;
            } else {
                this.filteredCards = this.accommodations.filter((accommodation) => {
                    return accommodation.establishment_name
                        .toLowerCase()
                        .includes(this.searchQuery.toLowerCase());
                });
            }
        },
        filter(barangay) {
            console.log(barangay)
            if (barangay.trim() === "") {
                this.filteredCards = this.accommodations;
            } else {
                this.filteredCards = this.accommodations.filter((accommodation) => {
                    return accommodation.establishment_barangay
                        .includes(barangay.toLowerCase());
                });
            }
        },

    }
};
</script>


<style scoped>
h1 {
    font-size: 60px;
    font-weight: 900;
}

.accommodation-home-container {
    width: 100%;
    height: 50vh;
    background-color: #1e4e72;
    background-image: url("../../../../public/Accommodation/tugawe.png");
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 40px;
}

.message {
    width: 100%;
    height: 70%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 0 20px 0;
    color: white;
    text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.5);
}

.text-center {
    text-align: center;
}

h2 {
    font-size: 30px;
    font-weight: 900;
    color: #1e4e72;
}

.content-title {
    padding: 0 0 10px 12.5%;
}

.v-card {
    height: auto;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.v-card:hover {
    height: auto;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);

}

.title {
    font-weight: 900;
    color: #1e4e72;
}

.search-field,
.search-btn,
.filter-btn {
    height: 62px;
    padding: 0;
}

.search-input {
    background-color: white;
}
</style>
