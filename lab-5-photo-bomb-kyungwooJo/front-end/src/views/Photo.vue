<template>
<body class="appbody">  
  <div class="home">
    <div class="photo-container">
      <img :src="photo.path">
      <div class="photoSummary">
        <p>Title: {{photo.title}}</p>
        <p>Uploader: {{photo.user.firstName}} {{photo.user.lastName}}</p>
        <p>{{formatDate(photo.created)}}</p>
        <p>Description: {{photo.description}}</p>
      </div>
    </div>

    <h2 class="commentTitle">Comment List</h2>
    <div v-for="comment in commentList" :key="comment._id">
      <p>{{comment.comment}} -{{comment.user.firstName}} {{comment.user.lastName}}-</p>
      <p class="photoDate">({{formatDate(comment.created)}})</p>
      <hr>
    </div>
    
    <h2 class="commentTitle">Add Comment</h2>
    <div v-if="this.$root.$data.user !== null">
      <textarea id="commentTextbox"></textarea><br>
      <button class="commentBtn" @click="postComment()">Post</button>
    </div>
    
  </div>
</body> 
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: "Photo",
  data() {
    return {
      photo: {},
      comments: [],
      error: '',
    }
  },

  created() {
    this.getPhotos();
    this.getComments();
  },
  computed: {
    commentList() {
      this.getComments();
      return this.comments;
    }
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/" + this.$route.params.id);
        this.photo = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },

    async postComment() {
      try {
        await axios.post('/api/comments/' + this.$route.params.id, {
          comment: document.getElementById('commentTextbox').value,
          user: this.$root.$data.user,
          photo: this.photo,
          userName: this.$root.$data.user.username
        })
      }catch (error) {
        this.error = error.response.data.message;
      }
    },

    async getComments() {
      try {
        let response = await axios.get('/api/comments/' + this.$route.params.id);
        this.comments = response.data;
      }catch(error) {
        this.error = error.response.data.message;
      }
    },

    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },    

  }
}
</script>

<style scoped>
  
  img {
    margin-top:150px;
    width:250px;
  }

  textarea {
    width:300px;
    height:80px;
  }

  .photo-container {
    
    display:flex;
  }

  .commentTitle {
    font-size:24px;
  }
  
  .commentBtn {
    margin-top:10px;
    margin-bottom:30px;
  }

  .photoSummary {
    margin-top:150px;
    margin-left: 30px;
  }


</style>
