<template>
  <v-carousel height="100vh" show-arrows="hover" cycle hide-delimiter-background>
    <div class="message">
      <h1>WELCOME TO CARAMOAN</h1>
    </div>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet>
        <img width="100%" :src="slide" alt="Slide {{ i }}" />
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        "/Carousel/1.png",
        "/Carousel/2.jpg",
        "/Carousel/3.png",
        "/Carousel/4.png",
        "/Carousel/5.png",
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  text-wrap: nowrap;
  position: absolute;
  z-index: 1000;
  color: white;
  font-size: 6em;
  text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.50);
  font-weight: 900;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>