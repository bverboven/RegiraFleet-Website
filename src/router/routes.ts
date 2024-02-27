import type { RouteRecordRaw } from 'vue-router'
import Permissions from '@/infrastructure/permissions'
import HomeView from '@/views/HomeView.vue'
import Dummy from '@/views/Dummy.vue'

import Login from '@/views/Login.vue'
import AccountView from '@/views/AccountView.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Unauthorized from '@/views/Unauthorized.vue'
import Forbidden from '@/views/Forbidden.vue'

import Statistics from '@/views/Statistics.vue'
import StatsPerCarType from '@/views/Dummy.vue'
import StatsPerCarPerType from '@/views/Dummy.vue'
import StatsPerCar from '@/views/Dummy.vue'
import StatsPerSupplier from '@/views/Dummy.vue'
import StatsPerInterventionType from '@/views/Dummy.vue'
import StatsPerInterventionTypePerCarType from '@/views/Dummy.vue'

import NotFound from '@/views/NotFound.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('../views/Icons.vue')
  },
  // account
  {
    name: 'account',
    path: '/account',
    component: AccountView,
    redirect: { name: 'accountHome' },
    children: [
      {
        name: 'login',
        path: 'login',
        component: Login,
        props: (to) => ({
          username: to.query?.username
        }),
        meta: {
          allowAnonymous: true
        }
      },
      // {
      //   name: "invoiceTemplate-home",
      //   path: "my-defaults",
      //   component: InvoiceTemplateOverview,
      // },
      {
        name: 'forgotPassword',
        path: 'forgot-password',
        component: ForgotPassword,
        props: (to) => ({
          username: to.query?.username
        }),
        meta: {
          allowAnonymous: true
        }
      },
      {
        name: 'resetPassword',
        path: 'reset-password',
        component: ResetPassword,
        meta: {
          allowAnonymous: true
        }
      }
    ]
  },
  {
    name: 'unauthorized',
    path: '/401',
    component: Unauthorized,
    props: (to) => ({ url: to.query.url }),
    meta: {
      allowAnonymous: true
    }
  },
  {
    name: 'forbidden',
    path: '/403',
    component: Forbidden,
    props: (to) => ({ url: to.query.url })
  },
  // statistics
  {
    name: 'statistics',
    path: '/statistieken',
    component: Statistics,
    props: true,
    meta: {
      permissions: [Permissions.CAN_READ],
      fullWidth: true
    },
    children: [
      {
        name: 'stats-per-car',
        path: 'per-wagen',
        component: StatsPerCar,
        meta: {
          title: 'Totalen per wagen'
        }
      },
      {
        name: 'stats-per-carType',
        path: 'per-wagentype',
        component: StatsPerCarType,
        meta: {
          title: 'Totalen per wagentype'
        }
      },
      {
        name: 'stats-per-car-per-type',
        path: 'per-wagen-per-type',
        component: StatsPerCarPerType,
        meta: {
          title: 'Totalen per wagen per type'
        }
      },
      {
        name: 'stats-per-intervention',
        path: 'per-interventie',
        component: StatsPerInterventionType,
        meta: {
          title: 'Totalen per interventie'
        }
      },
      {
        name: 'stats-per-intervention-and-carType',
        path: 'per-interventie-en-wagentype',
        component: StatsPerInterventionTypePerCarType,
        meta: {
          title: 'Totalen per interventie & wagentype'
        }
      },
      {
        name: 'stats-per-supplier',
        path: 'per-leverancier',
        component: StatsPerSupplier,
        meta: {
          title: 'Totalen per leverancier'
        }
      }
    ]
  },
  // default routes
  {
    path: '/404',
    name: 'notFound',
    component: NotFound,
    props: (to) => ({ url: to.query.url }),
    meta: {
      allowAnonymous: true
    }
  },
  {
    name: 'catchAll',
    path: '/:pathMatch(.*)*',
    redirect: (from) => ({ name: 'notFound', query: { url: from.fullPath } }),
    meta: {
      allowAnonymous: true
    }
  }
]

export default routes
