import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/products/:page',
        name: 'Product',
        component: () => import('./components/product/ListProduct'),
        props: (route) => ({ search: route.query.search, page: route.params.page })
    },
    {
        path: '/category',
        name: 'Category',
        component: () => import('./components/category/ListCategory')
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: () => import('./components/product/ProductDetail')
    },
    {
        path: '**',
        name: 'NOT FOUND',
        component: () => import('./components/404')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
