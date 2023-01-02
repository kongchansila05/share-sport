import { createRouter, createWebHistory } from 'vue-router'
import Livestream from '../components/Livestream.vue'
import Highligh from '../components/Highligh.vue'
import Article from '../components/Article.vue'
import Homevue from '../components/Home.vue'
import Livescore from '../components/Livescore.vue'
import Movie from '../components/Movie.vue'
import GameDetails from "../components/GameDetails.vue";
import ViewArticle from "../components/ViewArticle.vue";
import ViewPopular from "../components/ViewPopular.vue";
import ViewLive from "../components/ViewLive.vue";
import ViewVideo from "../components/ViewVideo.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
   
    {
      path: '/',
      name: 'home',
      component: Homevue
    },
    {
      path: '/livescore',
      name: 'livescore',
      component: Livescore
    },
    {
      path: '/livescore',
      name: 'livescore',
      component: Livescore
    },
    {
      path: '/livestream',
      name: 'livestream',
      component: Livestream
     
    },
    {
      path: '/article',
      name: 'article',
      component: Article 
     
    },
    {
      path: '/highligh',
      name: 'highligh',
      component: Highligh 
     
    },
    {
      path: '/movie',
      name: 'movie',
      component: Movie 
    },
    {
      path: '/livestream/:id',
      name: 'WatchLive',
      component: ViewLive
     
    },
    {
      path: "/games/:id",
      name: "Game Details",
      component: GameDetails,
    },
    {
      path: "/article/:id",
      name: "Article Details",
      component: ViewArticle,
    },
    {
      path: "/popular/:id",
      name: "Popular Details",
      component: ViewPopular,
    },
    {
      path: "/highligh/:id",
      name: "Video Details",
      component: ViewVideo,
    },
    
  ]
})

export default router
