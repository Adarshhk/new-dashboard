import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import MyStrategy from "../Views/MyStrategy.vue";
import Strategies from "../Views/Strategy.vue";
import Orders from "../Views/Orders.vue";
import Postition from "../Views/Positions.vue";
import Broker from "../components/Broker.vue";
import Profile from "../Views/ProfileView.vue";
import Login from "../Views/Login.vue";
import Signup from "../Views/Signup.vue";
import ForgotPassword from "../Views/ForgotPassword.vue";
import HomeLayout from "../layout/HomeLayout.vue";
import ProfileView from "../Views/ProfileView.vue";



const isAuthenticated = () => {
  // Replace with actual authentication check (e.g., check localStorage, Vuex, or a token)
  return localStorage.getItem("authToken") !== null;
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    
    {
      path: "/",
      component: HomeLayout,
      children : [
        {
          path : "/",
          component : Dashboard
        },
        {
          path: "/profile",
          component: ProfileView,
        },
        {
          path: "/my-strategy",
          component: MyStrategy,
        },
        {
          path: "/strategies",
          component: Strategies,
        },
        {
          path: "/orders",
          component: Orders,
        },
        {
          path: "/brokers",
          component: Broker,
        },
        {
          path: "/position",
          component: Postition,
        },
      ]
    },
    
    {
      path: "/login",
      component: Login,
    },
    {
        path : "/signup",
        component : Signup
    },
    {
        path : "/forgot-password",
        component : ForgotPassword
    }
  ],
});
export default router;
