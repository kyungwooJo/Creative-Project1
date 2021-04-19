<template>
<div id="mainDiv">
    <section id = "navbar">
      <div class = "nav-list">
          <ul class = "navbar-unlist">
              <li class = "nav-li"><router-link to = "/">Home</router-link></li>
              <li class = "nav-li current"> <router-link to = "/CategorizeScripture">Categorize</router-link></li>
              <li class = "nav-li"><router-link to = "/AddScripture">Add Scripture List</router-link></li>
          </ul>
      </div>   
    </section>     
    <h2 id="mainHeader" class="marginPlus">Classify your scripture list by its <span class="spanRed">book</span> and <span class="spanRed">topic</span></h2>
    <div id="selectionBoxes">
        <div class="bookCategory">
            <span class="slectionTitle">Book:</span>
            <select id="bookSelect">
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
        <div class="topicCategory">
            <span class="slectionTitle">Topic:</span>
            <select id="topicSelect">
                <option value="" selected disabled hidden>Choose</option>
                <option value="2020">charity</option>
                <option value="2021">sacrifice</option>
                <option value="2019">faith</option>
                <option value="2020">patience</option>
                <option value="2021">atonement</option>
            </select>
        </div>
        <button class="getBtn" @click="getScripture()">Get</button>
    </div>

    <p v-if="Object.keys(scriptures).length == 0" class="noMatchingIndicator">No matching Scripture</p>
    <p v-else class="numIndicator">There are total <span class ="spanRed">{{Object.keys(scriptures).length}}</span> matching scripture</p>    
    <ScriptureList :scriptures="scriptures" />
</div>
</template>

<script>
import axios from 'axios';
import ScriptureList from "../components/ScriptureList.vue"
export default {
    name: 'categorizedScripture',
    components: {
       ScriptureList
    },
    data() {
        return {
        scriptureList: [],
        scripture:null,
        book: "",
        topic: "",
       }
    }, 

    created() {
     this.getScriptureList();
    },

    methods: {
        getScripture(){
            let e1 = document.getElementById('bookSelect');
            let e2 = document.getElementById('topicSelect');
            this.book = e1.options[e1.selectedIndex].text;
            this.topic = e2.options[e2.selectedIndex].text;
        },

      async getScriptureList() {
         try{
            const response = await axios.get("/api/scripture");
            this.$root.$data.myScriptureList = response.data;
         }catch (error) {
            console.log(error);
         }	

      }
    },

    computed: {
        scriptures() {
            return this.$root.$data.myScriptureList.filter(scripture => scripture.book == this.book && scripture.topic == this.topic);
        }
    }    
}

</script>

<style>
    #selectionBoxes{
        display:flex;
        max-width:900px;
        margin: 0 auto;
        flex-direction:column;
        justify-content:space-around;
        align-items:cetner;
        height:200px;
        margin-top:25px;
    }

    #selectionBoxes .topicCategory,
    #selectionBoxes .bookCategory {
        width:fit-content;
        margin:0 auto;
    }

    #selectionBoxes .slectionTitle{
        margin-right:10px;
        font-size:20px;
    }

    #selectionBoxes button{
        width:150px;
        height:40px;
        font-size:18px;
        margin:0 auto;
    }

    #selectionBoxes #bookSelect,
    #selectionBoxes #topicSelect {
        width:150px;
        height:40px;
        font-size:18px;
    }

    #mainHeader{
        text-align:center;
        font-size:20px;
    }

    .numIndicator{
        margin-top:20px;
        margin-bottom:20px;
        text-align:center;
        font-size:22px;
    }

    .noMatchingIndicator{
        text-align:center;
        margin-top:20px;
        font-size:24px;
        color:red;
    }

    @media screen and (min-width:768px) {
        #selectionBoxes {
            margin-top:120px;
            flex-direction:row;
        }

        #selectionBoxes{
            height:100px;
        }
    }

 
</style>