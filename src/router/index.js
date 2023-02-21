import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    // {
    //   path: "/details",
    //   name: 'details',
    //   component: () => import("../views/PokeDetails.vue")
    // },
    {
      path: "/pokeId/:pokeIndex",
      name: 'single',
      props: true,
      component: () => import("../views/StatsView.vue")
    }
  ],
});

export default router;
