<template>

  <div>
    <v-container>
      <v-row justify="left">
        <v-col cols="12" md="8">
          <v-card class="content-title" elevation="0">
            <v-card-title>
              <h2 style="text-align: left; margin-left: 60px; font-weight: 900">
                OTHER DESTINATIONS IN CARAMOAN
              </h2>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>


      <v-slide-group v-model="model" center-active show-arrows style="padding: 0 5px;">
        <v-slide-group-item v-for="(n, index) in 5" :key="n" >
          <v-card :elevation="6" class="card ma-4" height="400" width="520" @click="toggle"
            style="border-radius: 5px;" >
            <v-container class="card-image" :style="{ backgroundImage: 'url(' + getImage(n) + ')' }">
            </v-container>

            <v-card-title class="card-title">
              <h4>{{ getTitle(index) }}</h4>
            </v-card-title>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-container>
  </div>


</template>

<script>
export default {
  data: () => ({
    model: null,
  }),
  methods: {
    getImage(n) {
      const imageUrls = [
        "/OtherDestination/1.jpg",
        "/OtherDestination/2.jpg",
        "/OtherDestination/3.jpg",
        "/OtherDestination/4.jpg",
        "/OtherDestination/5.jpg",
      ];
      return imageUrls[n % imageUrls.length];
    },
    getTitle(index) {
      // Different titles based on the index
      const titles = [
        "St. Michael The Arcangel Parish Church",
        "Gota-Village Resort",
        "Caramoan La Playa Camp and Picnic Grounds",
        "Our Lady of Peace Grotto",
        "Bulangbugang Water Falls",
      ];
      return titles[index];
    },
  },
};
</script>

<style scoped>
.card-image {
  height: 83%;
  width: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
}

.card-title {
  margin: 10px 0 0 0;
  text-align: center;
}

h2, h4 {
  color: #1E4E72;
}

.card {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

</style>
