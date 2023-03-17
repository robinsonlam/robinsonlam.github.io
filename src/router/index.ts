import { createWebHistory, createRouter } from "vue-router";
import MusicPlayer from "../components/pages/MusicPlayer/MusicPlayer.vue";

const routes = [
  {
    path: "/MusicPlayer",
    name: "MusicPlayer",
    component: MusicPlayer,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;