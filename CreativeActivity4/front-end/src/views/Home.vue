<template>
  <div>
    <section id = "navbar">
      <div class = "nav-list">
          <ul class = "navbar-unlist">
              <li class = "nav-li current"><router-link to = "/">Home</router-link></li>
              <li class = "nav-li"> <router-link to = "/CategorizeScripture">Categorize</router-link></li>
              <li class = "nav-li"><router-link to = "/AddScripture">Add Scripture List</router-link></li>
          </ul>
      </div>   
    </section>    
    <div id="totalListNum" class="marginPlus">
      <span>Total number of scriptures in list: </span><span class="spanRed">{{Object.keys(scriptures).length}}</span>
    </div>
    <div id="btnWrap">
      <button class="expendBtn" v-if="!this.$root.$data.isExpend" @click="expendScriptureList()">Expend List</button>
      <button class="shrinkBtn" v-if="this.$root.$data.isExpend" @click="shirnkScriptureList()">Shrink List</button>
    </div>
    <div v-if="this.$root.$data.isExpend">  
      <ScriptureList :scriptures="scriptures" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ScriptureList from "../components/ScriptureList.vue"
export default {
  name: 'Home',
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
    expendScriptureList(){
      this.$root.$data.isExpend = true;
    },

    shirnkScriptureList(){
      this.$root.$data.isExpend = false;
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
    scriptures(){
      return this.$root.$data.myScriptureList;
    }
  }
}
</script>

<style>
  .marginPlus{
    margin-top:150px;
  }

  #btnWrap {
    display:flex;
    justify-content:center;
  }

  #btnWrap .expendBtn,
  .getBtn,
  .addBtn{
    padding:5px 5px;
    color: white;
    background: #4C8FFB;
    border: 1px #3079ED solid;
    box-shadow: inset 0 1px 0 #80B0FB;
    font-size:24px;
    margin-top:50px;
    margin-bottom:50px;
  }

  #btnWrap .shrinkBtn{
    padding:5px 5px;
    color: white;
    background: -webkit-linear-gradient(top, #DD4B39, #D14836); 
    border: 1px solid #DD4B39;
    box-shadow: inset 0 1px 0 #80B0FB;
    text-shadow: 0 1px 0 #C04131;
    font-size:24px;
    margin-top:50px;
    margin-bottom:50px;
  }

</style>

