<template>
<div>
    <section id = "navbar">
      <div class = "nav-list">
          <ul class = "navbar-unlist">
              <li class = "nav-li"><router-link to = "/">Home</router-link></li>
              <li class = "nav-li"> <router-link to = "/CategorizeScripture">Categorize</router-link></li>
              <li class = "nav-li"><router-link to = "/AddScripture">Add Scripture List</router-link></li>
          </ul>
      </div>   
    </section> 
    <div id="totalListNum" class="marginPlus">
      <span>You are editing: </span><span class="spanRed">{{this.$root.$data.selectedBook}} {{this.$root.$data.selectedChapter}}:{{this.$root.$data.selectedVerse}}</span>
    </div>      
    <div id="addScriptureForm">
        <h1>Edit your scripure!</h1>
        <div class ="totalForm">
            <div class="topicCategory formContent">
                <label class="selectionTitle">Topic:</label>
                <select class="textBox">
                    <option value="" selected disabled hidden>{{this.$root.$data.selectedTopic}}</option>
                    <option value="2020">charity</option>
                    <option value="2021">sacrifice</option>
                    <option value="2019">faith</option>
                    <option value="2020">patience</option>
                    <option value="2021">atonement</option>
                </select>
            </div>
            <div class= "scriptureInfoContent">
                <div class = "bookCatagory formContent">
                    <label class="selectionTitle">Book:</label>
                    <select class="textBox">
                        <option value="" selected disabled hidden>{{this.$root.$data.selectedBook}}</option>
                        <option value="2010">1Nephi</option>
                        <option value="2011">2Nephi</option>
                        <option value="2012">Jacob</option>
                        <option value="2013">Enos</option>
                        <option value="2014">Jarom</option>
                        <option value="2015">Omni</option>
                        <option value="2016">Words of Mormon</option>
                        <option value="2017">Mosiah</option>
                        <option value="2018">Alma</option>
                        <option value="2019">Helaman</option>
                        <option value="2020">3Nephi</option>
                        <option value="2021">4Nehpi</option>
                        <option value="2019">Mormon</option>
                        <option value="2020">Ether</option>
                        <option value="2021">Moroni</option>
                    </select>
                </div>
                <div class ="chapter formContent">
                    <form>
                        <label class="selectionTitle">Chapter:</label>
                        <input id="chapterValue" class="textBox" type="text" v-model="chapter">
                    </form>
                </div>
                <div class ="verse formContent">
                    <form>
                        <label class="selectionTitle">Verse:</label>
                        <input id="verseValue" class="textBox" type="text" v-model="verse">
                    </form>
                </div>
            </div>

            <div class ="context formContent">
                <label>Context</label>
                <form>
                    <textarea id="contextValue" class="textBox" v-model="text"></textarea>
                </form>
            </div>  
        </div>    
        <button class="addBtn" @click="editScripture(id)">Edit</button>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EditScripture',
  props: {
      scripture: []
  },
  data() {
      return {
          book: this.$root.$data.selectedBook,
          topic: this.$root.$data.selectedTopic,
          chapter:this.$root.$data.selectedChapter,
          verse: this.$root.$data.selectedVerse,
          id: this.$root.$data.selectedId,
          text: this.$root.$data.selectedText
      }
  },

  methods: {
    async editScripture(id) {
      try {
        if(id == ""){
            alert("Choose the scripture you want to edit at the Home page");
        }
        await axios.put("/api/scripture/" + id, {
            _id: id,
            book: this.book,
            chapter: document.getElementById('chapterValue').value,
            verse: document.getElementById('verseValue').value,
            topic: this.topic,
            text: document.getElementById('contextValue').value
        });
        alert("You have successfully edited!");
        return true;
      } catch (error) {
        return 0;
      }
    }, 
      
    bookChange(e) {
        if(e.target.options.selectedIndex > -1){
            this.book = e.target.options[e.target.options.selectedIndex].text;
            }
        },
      
      topicChange(e) {
        if(e.target.options.selectedIndex > -1){
                this.topic = e.target.options[e.target.options.selectedIndex].text;
            }
        },
  },
  
}
  
</script>