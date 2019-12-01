import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes = [{
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    }
]

export default routes