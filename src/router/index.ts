

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';



const routerMode = import.meta.env.VITE_ROUTER_MODE
const baseUrl = import.meta.env.BASE_URL


export const routeList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ROUTE_HOME',
    redirect: {
      name: 'ROUTE_EXAMPLE_NINESIZEBOX'
    }
  },
  {
    path: '/Example',
    name: 'ROUTE_EXAMPLE',
    component: () => import("@/views/Example/index.vue"),
    children: [
      
    ]
  }
]

const router = createRouter({
  strict: true,
  history: routerMode === 'history' ? createWebHistory(baseUrl) : createWebHashHistory(),
  routes: routeList
});


export default router