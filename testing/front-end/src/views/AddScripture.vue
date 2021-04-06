<template>
<div>
    <section id = "navbar">
      <div class = "nav-list">
          <ul class = "navbar-unlist">
              <li class = "nav-li"><router-link to = "/">Home</router-link></li>
              <li class = "nav-li"> <router-link to = "/CategorizeScripture">Categorize</router-link></li>
              <li class = "nav-li current"><router-link to = "/AddScripture">Add Scripture List</router-link></li>
          </ul>
      </div>   
    </section>   
    <div id="totalListNum" class="marginPlus">
      <span>Total number of scriptures in list: </span><span class="spanRed">{{Object.keys(this.$root.$data.myScriptureList).length}}</span>
    </div>
    <div id="addScriptureForm">
        <h1>Add more scripure!</h1>
        <div class ="totalForm">
            <div class="topicCategory formContent">
                <label class="selectionTitle">Topic:</label>
                <select @change = "topicChange" class="textBox">
                    <option value="" selected disabled hidden>Choose</option>
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
                    <select @change = "bookChange" class="textBox">
                        <option value="" selected disabled hidden>Choose</option>
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
                        <input id="chapterValue" class="textBox" type="text">
                    </form>
                </div>
                <div class ="verse formContent">
                    <form>
                        <label class="selectionTitle">Verse:</label>
                        <input id="verseValue" class="textBox" type="text">
                    </form>
                </div>
            </div>

            <div class ="context formContent">
                <label>Context</label>
                <form>
                    <textarea id="contextValue" class="textBox"></textarea>
                </form>
            </div>  
        </div>    
        <button class="addBtn" @click="addScripture()">Add</button>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddScripture',
  data() {
      return {
          id: '',
          book: '',
          chapter: '',
          verse: '',
          topic: '',
          content: ''
      }
  },


  methods: {
    async addItem() {
      try {
        await axios.post(`/api/projects/${this.project._id}/items`, {
          text: this.text,
          completed: false
        });
        this.text = "";
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },

    async addScripture() {
          try{  
            this.$root.$data.originalKeyVal++;
            this.chapter = document.getElementById('chapterValue').value;
            this.verse = document.getElementById('verseValue').value;
            this.content = document.getElementById('contextValue').value;

            if(Object.keys(this.$root.$data.myScriptureList.filter(scriptures => scriptures.book == this.book && scriptures.chapter == this.chapter && scriptures.verse == this.verse)).length == 0
                    && document.getElementById('chapterValue').value != ''
                    && document.getElementById('verseValue').value != ''
                    && document.getElementById('contextValue').value != ''
                    && this.topic != ''
                    && this.book != '' ) {            
                await axios.post('/api/scripture', {
                    book: this.book,
                    chapter: this.chapter,
                    verse: this.verse,
                    text: this.content,
                    topic: this.topic,
                });         
                this.$root.$data.myScriptureList.push({
                    book: this.book,
                    chapter: this.chapter,
                    verse: this.verse,
                    text: this.content,
                    topic: this.topic
            });
            alert("Added successfully!");
            }

            else if(Object.keys(this.$root.$data.myScriptureList.filter(scriptures => scriptures.book == this.book && scriptures.chapter == this.chapter && scriptures.verse == this.verse)).length !== 0){
                    alert("You already have that scripture in your list");
            }

            else{
                    alert("You have empty textfiled. Make sure fill them out all");
                }
       }catch(error){
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
        
  }
}
</script>

<style>
    #addScriptureForm{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        margin-top:30px;
        text-align:center;
    }

    #addScriptureForm h1{
        margin-bottom:20px;
    }
    
    #addScriptureForm .totalForm {
        width:280px;
    }

    #addScriptureForm .formContent{
        margin-bottom:10px;
        font-size:24px;
    }

    #addScriptureForm #chapterValue{
        margin-right:26px;
    }

    #addScriptureForm .textBox{
        width:150px;
        height:40px;
        font-size:18px;
    }

    #addScriptureForm .selectionTitle{
        margin-right:8px;
    }

    #addScriptureForm #contextValue{
        width:200px;
        height:100px;
    }

    #addScriptureForm button{
        width:150px;
        height:50px;
        font-size:20px;
        margin-top:15px;
    }

     @media screen and (min-width:1000px) {
         #addScriptureForm .totalForm{
             display:flex;
             width:1000px;
             margin:50px auto;
             justify-content:space-around;
         }

         #addScriptureForm .topicCategory{
             margin-top:50px;
         }
     }


</style>