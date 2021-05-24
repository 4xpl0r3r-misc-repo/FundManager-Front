import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/Login'
import PosInfo from './components/PosInfo'
import TransactionRecord from './components/TransactionRecord'
import LatestFund from './components/LatestFund'
import PerformanceRanking from './components/PerformanceRanking'
import ValuationRanking from './components/ValuationRanking'
import DebateFund from './components/DebateFund'
import StockFund from './components/StockFund'
import MyFund from './components/MyFund'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        doNotShowFrame: true
      }
    },
    {
      path: '/PosInfo',
      name: 'PosInfo',
      component: PosInfo,
    },
    {
      path: '/TransactionRecord',
      name: 'TransactionRecord',
      component: TransactionRecord,
    },
    {
      path: '/LatestFund',
      name: 'LatestFund',
      component: LatestFund,
    },
    {
      path: '/PerformanceRanking',
      name: 'PerformanceRanking',
      component: PerformanceRanking,
    },
    {
      path: '/ValuationRanking',
      name: 'ValuationRanking',
      component: ValuationRanking,
    },
    {
      path: '/DebateFund',
      name: 'DebateFund',
      component: DebateFund,
    },
    {
      path: '/StockFund',
      name: 'StockFund',
      component: StockFund,
    },
    {
      path: '/MyFund',
      name: 'MyFund',
      component: MyFund,
    }
  ]
})

