import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategorizedScripture from '../views/CategorizedScripture.vue'
import AddScripture from '../views/AddScripture.vue'
import EditScripture from '../views/EditScripture.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CategorizeScripture',
    name: 'Categorize',
    component: CategorizedScripture
  },
  {
    path: '/AddScripture',
    neme: 'Addscripture',
    component: AddScripture
  },
  {
    path: '/EditScripture',
    name: 'EditScripture',
    component: EditScripture
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
