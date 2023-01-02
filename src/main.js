import { createApp } from 'vue'
import App from './App.vue'
import $ from 'jquery'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import moment from 'moment';
import VueAnimate from 'vue-animate-scroll'
import ProfileFB from "./components/ViewArticle.vue";
import { MotionPlugin } from '@vueuse/motion'
import VuePlyr from '@altinget/vue-plyr'
import '@altinget/vue-plyr/dist/vue-plyr.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

// import VueI18n from 'vue-i18n';
const app = createApp(App)
AOS.init({
    duration: 1200,
  })
createApp(App)
app.use(router)
// app.use(VueI18n)
app.use(ProfileFB)
app.use(VuePlyr, {
  plyr: {}
})
app.use(moment)
app.use(AOS)
app.use(VueAnimate)
app.use(MotionPlugin)
app.use($)
// router.replace('/home')
app.mount('#app')