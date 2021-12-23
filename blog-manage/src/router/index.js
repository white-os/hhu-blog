import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login.vue'
import Manage from '../views/Manage/Manage.vue'
import UserInfoManage from '../views/Manage/UserInfoManage/UserInfoManage.vue'
import BlogInfoManage from '../views/Manage/BlogInfoManage/BlogInfoManage.vue'
import CommentInfoManage from '../views/Manage/CommentInfoManage/CommentInfoManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'userinfomanage',
        name: 'userinfomanage',
        component: UserInfoManage,
        meta: { requiresAuth: true }
      },
      {
        path: 'bloginfomanage',
        name: 'bloginfomanage',
        component: BlogInfoManage,
        meta: { requiresAuth: true }
      },
      {
        path: 'commentinfomanage',
        name: 'commentinfomanage',
        component: CommentInfoManage,
        meta: { requiresAuth: true }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

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
