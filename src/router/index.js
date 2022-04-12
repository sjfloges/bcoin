import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', redirect: '/cabinet' },

  {
    path: '/auth',
    redirect: '/auth/signin',
    name: 'Auth',
    component: () => import('../layouts/AppRouterView.vue'),
    children: [
      {
        path: '/auth/signin',
        name: 'SignIn',
        component: () => import('@/views/auth/SignIn.vue'),
        meta: {
          layout: 'AppLayoutFull',
          auth: false,
        },
      },
      {
        path: '/auth/verify',
        name: 'OtpVerification',
        component: () => import('@/views/auth/OtpVerification.vue'),
        meta: {
          layout: 'AppLayoutFull',
          auth: false,
        },
      },
      {
        path: '/auth/forgot',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPassword.vue'),
        meta: {
          layout: 'AppLayoutFull',
          auth: false,
        },
      },
      {
        path: '/auth/confirm',
        name: 'PasswordConfirm',
        component: () => import('@/views/auth/PasswordConfirm.vue'),
        meta: {
          layout: 'AppLayoutFull',
          auth: false,
        },
      },
      {
        path: '/auth/change',
        name: 'PasswordChange',
        component: () => import('@/views/auth/PasswordChange.vue'),
        meta: {
          layout: 'AppLayoutFull',
          auth: false,
        },
      },
    ],
  },

  {
    path: '/cabinet',
    redirect: '/cabinet/dashboard',
    name: 'Cabinet',
    component: () => import('../layouts/AppRouterView.vue'),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: {
          layout: 'AppLayoutDefault',
          auth: true,
        },
      },

      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/profile/Settings.vue'),
        meta: {
          layout: 'AppLayoutDefault',
          auth: true,
        },
      },

      {
        path: 'deposit',
        name: 'Deposit',
        redirect: 'deposit/list',
        component: () => import('../layouts/AppRouterView.vue'),
        children: [
          {
            path: 'list',
            name: 'DepositList',
            component: () => import('@/views/deposit/DepositList.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'new',
            name: 'DepositNew',
            component: () => import('@/views/deposit/DepositNew.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'instructions',
            name: 'DepositInstructions',
            component: () => import('@/views/deposit/DepositInstructions.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'confirmation',
            name: 'DepositConfirmation',
            component: () => import('@/views/deposit/DepositConfirmation.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'success',
            name: 'DepositSuccess',
            component: () => import('@/views/deposit/DepositSuccess.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
        ]
      },

      {
        path: 'withdraw',
        name: 'Withdraw',
        redirect: 'withdraw/list',
        component: () => import('../layouts/AppRouterView.vue'),
        children: [
          {
            path: 'list',
            name: 'WithdrawList',
            component: () => import('@/views/withdraw/WithdrawList.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'new',
            name: 'WithdrawNew',
            component: () => import('@/views/withdraw/WithdrawNew.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'confirm',
            name: 'WithdrawConfirm',
            component: () => import('@/views/withdraw/WithdrawConfirm.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'success',
            name: 'WithdrawSuccess',
            component: () => import('@/views/withdraw/WithdrawSuccess.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
        ]
      },

      {
        path: 'transfer',
        name: 'Transfer',
        redirect: 'transfer/list',
        component: () => import('../layouts/AppRouterView.vue'),
        children: [
          {
            path: 'list',
            name: 'TransferList',
            component: () => import('@/views/transfer/TransferList.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'beneficiary',
            name: 'TransferBeneficiary',
            component: () => import('@/views/transfer/TransferBeneficiary.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'amount',
            name: 'TransferAmount',
            component: () => import('@/views/transfer/TransferAmount.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'confirm',
            name: 'TransferConfirm',
            component: () => import('@/views/transfer/TransferConfirm.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
          {
            path: 'confirm',
            name: 'TransferSuccess',
            component: () => import('@/views/transfer/TransferSuccess.vue'),
            meta: {
              layout: 'AppLayoutDefault',
              auth: true,
            },
          },
        ]
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)

  if (store.state.config.menuOpened) {
    store.commit('config/TOGGLE_MENU', false)
    setTimeout(() => { next() }, 500)
  } else {
    next()
  }
})

export default router
