import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'

Vue.config.productionTip = false

let data = {
    scriptures: mock,
    myScriptureList: [],
    isExpend: false,
    totalNum: 20,
    originalKeyVal:20,
    selectedBook: "",
    selectedChapter: "",
    selectedVerse: "",
    selectedText: "",
    selectedTopic: "",
    selectedId: ""
}

new Vue({
    router,
    data,
    render: h => h(App)
  }).$mount('#app')