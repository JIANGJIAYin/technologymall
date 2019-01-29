import Vue from 'vue'
import Router from 'vue-router'
import IndexList from '../views/IndexList'
import Phone from '../views/techProducts/Phone'
import EarPhone from '../views/techProducts/EarPhone'
import Camera from '../views/techProducts/Camera'
import WearTech from '../views/techProducts/WearTech'
import NoteBook from '../views/techProducts/NoteBook'
import Cart from '../views/Cart'
import Address from '../views/Address'
import OrderList from '../views/OrderList'
import OrderSuccess from '../views/OrderSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexList',
      component: IndexList
    },
    {
      path: '/phone',
      name: 'Phone',
      component: Phone
    },
    {
      path: '/earPhone',
      name: 'EarPhone',
      component: EarPhone
    },
    {
      path: '/camera',
      name: 'Camera',
      component: Camera
    },
    {
      path: '/wearTech',
      name: 'WearTech',
      component: WearTech
    },
    {
      path: '/noteBook',
      name: 'NoteBook',
      component: NoteBook
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/order',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
