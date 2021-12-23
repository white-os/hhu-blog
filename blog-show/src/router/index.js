import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogList from '../views/bloglist.vue'
import BlogEdit from '../views/blogedit.vue'
import Login from '../views/login.vue'
import BlogItem from '../views/blogitem.vue'
import Register from '../views/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'bloglist' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/bloglist',
    name: 'bloglist',
    component: BlogList
  },
  // {
  //   path: '/blogitem',
  //   name: 'blogitems',
  //   component: BlogItem,
  // },
  {
    path: '/blogitem/:id',
    name: 'blogitem',
    component: BlogItem,
  },
  {
    path: '/blogedit',
    name: 'blogedit',
    component: BlogEdit,
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem('phoneNumber')
      if(!token){
        next('/login')
      } else {
        next()
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 不需要下面这些来配置全局前置守卫来进行登录校验,只要在写文章的部分完成校验即可
// router.beforeEach((to, from, next) => {
//   if(to.path === '/login') {
//     next()
//   } else {
//     let token = localStorage.getItem('Authorization')
//     if(token === null || token === ''){
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })

export default router
