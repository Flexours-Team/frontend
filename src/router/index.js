import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/UserProfile.vue";
import Tables from "../views/Tables.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import firebase from 'firebase';

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      {
        path: "/tables",
        name: "tables",
        components: { default: Tables },
      },
    ],
    meta: {
      authRequired: true,
    },

  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
      if (firebase.auth().currentUser) {
          next();
      } else {
                    alert('You must be logged in to see this page');

          next({
              path: '/login',
          });
      }
  } else {
      next();
  }
});


export default router;









// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
// import firebase from 'firebase';

// Vue.use(VueRouter);

// const routes = [
//     {
//         path: '/',
//         name: 'Home',
//         component: Home,
//     },
//     {
//         path: '/register',
//         name: 'Register',
//         component: () =>
//             import(/* webpackChunkName: "about" */ '../views/About.vue'),
//     },
//     {
//         path: '/dashboard',
//         name: 'Dashboard',
//         component: () =>
//             import(
//                 /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'
//             ),
//         meta: {
//             authRequired: true,
//         },
//     },
// ];

// const router = new VueRouter({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes,
// });

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.authRequired)) {
//         if (firebase.auth().currentUser) {
//             next();
//         } else {
//             alert('You must be logged in to see this page');
//             next({
//                 path: '/',
//             });
//         }
//     } else {
//         next();
//     }
// });

// export default router;