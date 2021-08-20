<template>
<body class="appbody">  
  <div class="home">
    <image-gallery :photos="photos" />
    <p v-if="error">{{error}}</p>
  </div>
</body>
</template>
<script>
// @ is an alias to /src
import axios from 'axios';
import ImageGallery from '@/components/ImageGallery.vue';
export default {
  name: "Home",
  data() {
    return {
      photos: [],
      error: '',
    }
  },
  components: {
     ImageGallery,
  },
  created() {
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/all");
        this.photos = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }

};
</script>

<style>
 .appbody{ 
  length:100%;
  min-height:calc(100vh - 10vh);
}
</style>