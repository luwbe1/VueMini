import Vue from 'vue'
import Router from 'vue-router'
import TodoPage from '@/components/TodoPage'
import EmployeePage from '@/components/EmployeePage'
import GamePage from '@/components/GamePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoPage',
      component: TodoPage
    },
    {
      path: '/employee',
      name: 'EmployeePage',
      component: EmployeePage
    },
    {
      path: '/game',
      name: 'GamePage',
      component: GamePage
    }

  ]
})
