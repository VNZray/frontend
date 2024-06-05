<template>

  <v-container>
    <v-row>
      <v-col cols="6" >
        <v-text-field v-model="searchQuery" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
          hide-details single-line @input="search"></v-text-field>
      </v-col>

      <v-col>
        <v-select label="Select Status" variant="outlined"></v-select>
      </v-col>

      <v-col>
        <v-select label="Select Owner" variant="outlined"></v-select>
      </v-col>

      <v-col>
        <v-select label="Establishment Type" variant="outlined"></v-select>
      </v-col>
    </v-row>

  </v-container>

  <v-container>
    <v-row align="center" justify="left">

      <v-col v-for="(card, index) in filteredCards" :key="index" cols="6" md="3" sm="4" lg="3">
        <v-card class="mx-auto" link="" to="/profile">
          <v-container
            :style="{ height: '250px', backgroundImage: 'url(' + card.image + ')', backgroundSize: 'cover', backgroundRepeat: 'repeat' }"></v-container>

          <v-card-title style="font-weight: 900; color: #1E4E72;">{{ card.accommodationName }}</v-card-title>

          <v-card-text>
            {{ card.address }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-btn class="add-card-btn" fab dark color="primary" @click="openDialog">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>

      <v-dialog v-model="dialog" max-width="700">
        <v-card>
          <v-card-actions>
            <AddAccommodation />
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      cards: [
        {
          accommodationName: 'Kim Angela Homestay',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/1.jpg',
          description: '',
        },
        {
          accommodationName: 'Isle de Bella Beach Hotel',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/2.jpg',
          description: '',

        },
        {
          accommodationName: 'Hannah Homestay',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/3.jpg',
          description: '',

        },
        {
          accommodationName: 'Father & Son Homestay',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/4.jpg',
          description: '',

        },
        {
          accommodationName: 'Honongan Cove Resort',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/5.jpg',
          description: '',

        },
        {
          accommodationName: 'Kim Angela Homestay',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/1.jpg',
          description: '',
        },
        {
          accommodationName: 'Isle de Bella Beach Hotel',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/2.jpg',
          description: '',

        },
        {
          accommodationName: 'Hannah Homestay',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/3.jpg',
          description: '',

        },
        {
          accommodationName: 'Father & Son Homestay',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/4.jpg',
          description: '',

        },
        {
          accommodationName: 'Honongan Cove Resort',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/5.jpg',
          description: '',

        }, {
          accommodationName: 'Kim Angela Homestay',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/1.jpg',
          description: '',
        },
        {
          accommodationName: 'Isle de Bella Beach Hotel',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/2.jpg',
          description: '',

        },
        {
          accommodationName: 'Hannah Homestay',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/3.jpg',
          description: '',

        },
        {
          accommodationName: 'Father & Son Homestay',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/4.jpg',
          description: '',

        },
        {
          accommodationName: 'Honongan Cove Resort',
          address: 'Paniman, Caramoan, Camarines Sur',
          image: '/5.jpg',
          description: '',

        },
      ],
      filteredCards: [],
      dialog: false // Initially dialog is closed
    }
  },
  created() {
    this.filteredCards = this.cards;
  },
  methods: {
    search() {
      if (this.searchQuery.trim() === '') {
        this.filteredCards = this.cards;
      } else {
        this.filteredCards = this.cards.filter(card => {
          return card.accommodationName.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }
    },
    openDialog() {
      this.dialog = true; // Open the dialog
    },
    closeDialog() {
      this.dialog = false; // Close the dialog
    },
    addCard() {
      this.closeDialog();
    }
  }
}
</script>

<style scoped>
.v-card {
  height: auto;
}

.add-card-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
