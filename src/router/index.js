import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../Views/Dashboard/Dashboard.vue";

import MyStrategy from "../Views/MyStrategy/MyStrategy.vue";
import Strategy from "../Views/Strategy/Strategy.vue";
import Order from "../Views/Orders/Order.vue";
import Videos from "../Views/Videos/Videos.vue";
import Broker from "../Views/Broker/Broker.vue";
import Position from "../Views/Positions/Position.vue";

 const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : "/",
            component : Dashboard
        },
        {
            path : "/my-strategies",
            component : MyStrategy
        },
        {
            path : "/strategies",
            component : Strategy
        },
        {
            path : "/orders",
            component : Order
        },
        {
            path : "/videos",
            component : Videos
        },
        {
            path : "/brokers",
            component : Broker
        },
        {
            path : "/positions",
            component : Position
        },
        
    ]
})


export default router