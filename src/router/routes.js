// 登录
import Login from '../views/Login.vue'

// 后台
import Home from '../views/Home.vue'

// 会员中心
import Part from '../views/Member/Part.vue'
import Clerk from '../views/Member/Clerk.vue'

// 订单管理
import Record from '../views/Order/Record.vue'
import Appeal from '../views/Order/Appeal.vue'

import Data from '../views/Chart/Data.vue'

// 系统设置
import Capital from '../views/Financial/Capital.vue'
import Customer from '../views/Financial/Customer.vue'
import Withdrawal from '../views/Financial/Withdrawal.vue'

import Agent from '../views/Agency/Agent.vue'
import Create from '../views/Agency/Create.vue'

import SetPart from '../views/Set/Part.vue'
import SetClerk from '../views/Set/Clerk.vue'

const routes = [{
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
        path: '/members/part',
        name: 'part',
        component: Part
      },
      {
        path: '/members/clerk',
        name: 'clerk',
        component: Clerk
      },

      {
        path: '/orders/record',
        name: 'record',
        component: Record
      },
      {
        path: '/orders/appeal',
        name: 'appeal',
        component: Appeal
      },

      {
        path: '/charts/data',
        name: 'data',
        component: Data
      },

      {
        path: '/financial/capital',
        name: 'capital',
        component: Capital
      },
      {
        path: '/financial/customer',
        name: 'customer',
        component: Customer
      },
      {
        path: '/financial/withdrawal',
        name: 'withdrawal',
        component: Withdrawal
      },

      {
        path: '/agency/agent',
        name: 'agent',
        component: Agent
      },
      {
        path: '/agency/create',
        name: 'create',
        component: Create
      },

      {
        path: '/settings/part',
        name: 'setPart',
        component: SetPart
      },
      {
        path: '/settings/clerk',
        name: 'setClerk',
        component: SetClerk
      },
    ]
  }
]

export default routes