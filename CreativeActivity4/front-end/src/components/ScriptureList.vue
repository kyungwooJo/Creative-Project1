<template>
<div class = "wrapper">   
    <div class = "scripture">
        <div class = scripture v-for="scripture in scriptures" :key="scripture._id">
            <div class ="scriptureInfo">
                <div class="scriprueContainer">
                  <div class="scriptureTitleSection">
                    <h1>{{scripture.book}} {{scripture.chapter}} : {{scripture.verse}}</h1>
                    <h3>({{scripture.topic}})</h3>
                  </div>
                  <div class="scriptureBodySection">
                    <p>{{scripture.text}}</p>
                    <button @click="removeFromList(scripture)" class="removeBtn">Remove</button>
                    <router-link to = "/EditScripture"><button @click="editScripture(scripture)" class="editBtn">Edit</button></router-link>
                  </div>
                </div>
                <hr>
            </div>    
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ScriptureList',
  props: {
    scriptures: Array,
  },

  methods: {
  async removeFromList(item) {
    try {
      console.log(item._id);
      await axios.delete("api/scripture/" + item._id);
      this.$root.$data.myScriptureList = this.$root.$data.myScriptureList.filter(scripture => scripture._id !== item._id);    
    }catch(error) {
      console.log(error);
    }
 },

 editScripture(scripture) {
   this.$root.$data.selectedBook = scripture.book;
   this.$root.$data.selectedVerse = scripture.verse;
   this.$root.$data.selectedChapter = scripture.chapter;
   this.$root.$data.selectedTopic = scripture.topic;
   this.$root.$data.selectedText = scripture.text;
   this.$root.$data.selectedId = scripture._id;  
 }
  
 }
}
</script>

<style>
  .scriptureInfo{
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    width:90%;
    margin:0 auto;
    text-align:center;
  }

  .scriptureInfo button{
    width:70px;
    padding:5px 0;
    margin:0 auto;
   }

   .scriptureInfo h1,
   .scriptureInfo h3,
   .scriptureInfo p,
   .scriptureInfo button {
     margin-bottom: 15px;
   }

   .scriptureInfo .removeBtn{
    padding:8px 8px;
    color: white;
    background:#ff4a20; 
    border: 1px solid #DD4B39;
    font-size:14px;
    border-radius:10px;
   }

   .scriptureInfo .editBtn{
    padding:8px 8px;
    color: white;
    background: #4C8FFB;
    border: 1px #3079ED solid;
    font-size:14px;
    border-radius:10px;

   }

   .scriptureInfo p{
    font-family: sans-serif;
    max-width:800px;
    margin:0 auto;
    margin-bottom:20px;
   }

    @media screen and (min-width:1200px){
      
      .scriptureInfo .scriprueContainer {
        width:100%;
        display:flex;
        justify-content:flex-start;
        margin:0 auto;
        padding-top:20px;
      }
      .scriptureInfo .scriprueContainer p{
        margin-left:20px;
        margin-top:10px;
      }

      .scriptureInfo h1{
        font-size: 22px;
      }

      .scriptureInfo .scriptureBodySection{
        display:flex;
      }

      .scriptureInfo .scriptureBodySection button{
        height:40px;
        margin-top:30px;
        margin-left:10px;
      }

    }

</style>
