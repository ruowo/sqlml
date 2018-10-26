import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import ProjectList from './pages/ProjectList.vue'
import ConnList from './pages/ConnList.vue'
import PackageList from './pages/PackageList.vue'

let padDate = (va) => va < 10 ? '0' + va : va

Vue.filter('formatDate', (val) => {
  let value = new Date(val)
  return `${value.getFullYear()}`
    + `-${padDate(value.getMonth()+1)}`
    + `-${padDate(value.getDate())}`
    + ` ${padDate(value.getHours())}`
    + `:${padDate(value.getMinutes())}`
    + `:${padDate(value.getSeconds())}`
})

Vue.use(VueRouter)
let router = new VueRouter({
  routes: [
    { path: '/projects', component: ProjectList, name: 'projects' },
    { path: '/connections', component: ConnList, name: 'conns' },
    { path: '/packages', component: PackageList, name: 'packages' },
  ]
})

let vm = new Vue({
  router,
  render: h => h(App)
})

vm.$mount('#sqlml')
