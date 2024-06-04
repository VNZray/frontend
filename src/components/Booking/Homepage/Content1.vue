<template>
  <div>
    <v-container>
      <v-row justify="left">
        <v-col cols="12" md="8">
          <v-card class="content-title" elevation="0">
            <v-card-title class="grey--text text--darken-2">
              <h2 style="text-align: left; margin-left: 60px; font-weight: 900">
                ISLANDS IN CARAMOAN
              </h2>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" style="padding: 0 60px">
        <v-col v-for="(island, index) in islands" :key="index" cols="12" md="6">
          <v-card class="container" style="padding: 16px">
            <v-container class="image-container" :style="{ 'background-image': 'url(' + island.image + ')' }"
              alt="Island Image"></v-container>
            <v-card-title class="title">
              <h4>{{ island.name }}</h4>
            </v-card-title>
            <v-card-text class="description">
              <p :class="{ expanded: island.show }">{{ island.description }}</p>
              <p v-if="island.show">{{ island.more }}</p>
            </v-card-text>
            <v-card-actions style="padding: 0;">
              <v-btn @click="toggleDescription(index)" style="padding: 0;">
                {{ island.show ? "View less" : "View more" }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      islands: [
        {
          name: "Matukad Island",
          image: "/Islands/Matukad-Island-Caramoan.webp",
          description:
            "This island features a large rock feature which can be climbed to give a beautiful view of the beach front and surrounding area. There is also plenty of shade on the island, for a picnic or to escape the scorching sun. The beach is very fine white sand with beautiful turquoise water.",
          more: "Matukad Lagoon, a small lake surrounded by a intriguing mythical tale. There’s a “giant milkfish” swimming around the water, and it is said to have just appeared magically in the lagoon. Legend has it that years ago there used to be two of them here, but a family caught one for dinner. The entire family died because of it. No one touched the fish since. Tourists can see the lagoon and the fish (if you’re lucky) by climbing the sharp cliffs.",
          show: false,
        },
        {
          name: "Gota Beach",
          image: "/Islands/gota-beach.jpg",
          description:
            "Gota Beach is part of a national nature reserve. A stretch of soft sand by the sea is located in a secluded bay, among the hills covered with dense thickets of tropical vegetation. It has a convenient entry into the water, a flat and safe bottom. It is possible to relax by the water in the natural shade of coastal plants.",
          more: "Bungalow type beach hotel allows guests to visit the restaurant and rent beach equipment, kayaks and diving equipment. In the nearby province of Camarines Sur, you can find other rental properties.",
          show: false,
        },
        {
          name: "Lahos Island",
          image: "/Islands/lahos.jpg",
          description:
            "Explore Lahos Island in Caramoan, a rare pearl among the coastline and islands. Its white sandy beach vanishes with the tide, adding to its allure and mystique. A trip to Caramoan is not complete without experiencing the beauty of Lahos.",
          more: "Lahos Island boasts of spectacular stretches of white sand beaches amongst striking and unique rock formations that partition areas of the island. Lush vegetation can be seen of various parts of the island. The aquamarine waters around the island are picturesque and ideal for swimming, snorkelling and scuba diving. Many tourists stop over at Lahos Island during their island hopping at Caramoan.",
          show: false,
        },
        {
          name: "Cagbanilad Island",
          image: "/Islands/Cagbanilad.jpg",
          description:
            "Cagbanilad Island, nestled between Matukad and Minilahos Islands in Caramoan, offers pristine beauty. With beaches on its eastern and southern shores, it's a haven of untouched nature. At its center, a massive rock sits on a small sandy beach, perfect for stunning photographs. Towering rock formations dot the landscape, adventurous exploration.",
          more: "",
          show: false,
        },
      ],
    };
  },
  methods: {
    toggleDescription(index) {
      this.islands[index].show = !this.islands[index].show;
    },
  },
};
</script>

<style scoped>
.content-title {
  text-align: center;
}

.title {
  padding: 10px 0;
}

.image-container {
  height: 400px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

.container {
  margin: 20px;
}

.description {
  height: 110px;
  overflow: hidden;
  padding: 0;
}

.description p.expanded {
  height: auto;
  overflow: auto;
}

.card-actions {
  text-align: right;
}

h2, h4, p {
  color: #1E4E72;
}

.container {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.container:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}
</style>
