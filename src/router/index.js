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

// Global navigation guard
router.beforeEach((to, from, next) => {
    // Define routes that don't require authentication (e.g., Login, Signup)
    const publicPages = ["/login", "/signup" , "/forgot-password"];
    const authRequired = !publicPages.includes(to.path);
    const isLoggedIn = isAuthenticated(); // Simulated authentication check
    
    // If the user is not authenticated and trying to access a protected page
    if (authRequired && !isLoggedIn) {
      // Redirect to login page if not authenticated
      next("/login");
    } 
    // If the user is already logged in, prevent access to login/signup
    else if (isLoggedIn && publicPages.includes(to.path)) {
      // Redirect logged-in users away from login or signup pages
      next("/");
    } 
    else {
      // Allow access
      next();
    }
  });
  

export default router;
