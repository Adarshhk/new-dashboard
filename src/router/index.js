import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import MyStrategy from "../Views/MyStrategy.vue";
import Strategies from "../Views/Strategy.vue";
import Orders from "../Views/Orders.vue";

import Postition from "../Views/Positions.vue";
import Broker from "../components/Broker.vue";
import Profile from "../Views/Profile.vue";


 const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : "/profile",
            component : Profile
        },
        {
            path : "/",
            component : Dashboard
        },
        {
            path : "/my-strategy",
            component : MyStrategy
        },
        {
            path : "/strategies",
            component : Strategies
        },
        {
            path : "/orders",
            component : Orders
        },
        
        {
            path : "/brokers",
            component : Broker
        },
        {
            path : "/position",
            component : Postition
        },
        
    ]
})


export default router