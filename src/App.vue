<template>
  <div id="nav">
    <nav class=" navbar navbar-expand-lg navbar-light bg-fan-primary">
        <div class="container-sm">
          <router-link to="/" class="nav-item nav-link ">
            <img src="/benner/logo.jpg" alt="Nature" class="responsive" width="40" style="border-radius: 50px;">
          </router-link>
          <form class="nav-item bg-whit nav-link search-type" style="background-color: white;border-radius:10px">
            <input class="dark:placeholder-gray-300 px-1 py-1 rounded-full text-gray-600 text-sm" placeholder="Search" type="text" style="padding: revert;border: aliceblue;margin-left: 5px;" />
            <button class="btn search-btn" type="submit">
              <img class="search-icon" src="/icon/search.svg" />
            </button>
          </form>
          
          <div class="new-mumu example" v-if="lang == 'en'">
            <router-link to="/livescore"  class="nav-link-example">Livescore</router-link>
            <router-link to="/livestream"  class="nav-link-example">Livestream</router-link>
            <router-link to="/article"  class="nav-link-example">Article</router-link>
            <router-link to="/highligh"  class="nav-link-example">HighLight</router-link>
            <div class=" nav-link-example dropdown change_lang_min">
                <button class="dropbtn popup-lang"  @click="popup_lang()"><img v-bind:src="'/icon/'+ this.lang+'.png'" alt=""></button>
              </div>
          </div>
          <div class="new-mumu example" v-if="lang == 'kh'">
            <router-link to="/livescore"  class="nav-link-example">ពិន្ទុបាល់</router-link>
            <router-link to="/livestream"  class="nav-link-example">ផ្សាយផ្ទាល់</router-link>
            <router-link to="/article"  class="nav-link-example">ព័ត៌មានកីឡា</router-link>
            <router-link to="/highligh"  class="nav-link-example">ហាយឡាយ</router-link>
            <div class=" nav-link-example dropdown change_lang_min">
                <button class="dropbtn popup-lang"  @click="popup_lang()"><img v-bind:src="'/icon/'+ this.lang+'.png'" alt=""></button>
              </div>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent" >
            <div class="navbar-nav mr-auto" v-if="lang == 'en'">
                <span><router-link to="/livescore" class="nav-item nav-link">Livescore</router-link></span>
                <router-link to="/livestream" class="nav-item nav-link">Livestream</router-link>
                <router-link to="/article" class="nav-item nav-link">Article</router-link>
                <router-link to="/highligh" class="nav-link">HighLight</router-link>
                <!-- <router-link to="/movie" class="nav-link">test</router-link> -->
            </div>
            <div class="navbar-nav mr-auto" v-else>
                <span><router-link to="/livescore" class="nav-item nav-link">ពិន្ទុបាល់</router-link></span>
                <router-link to="/livestream" class="nav-item nav-link">ផ្សាយផ្ទាល់</router-link>
                <router-link to="/article" class="nav-item nav-link">ព័ត៌មានកីឡា</router-link>
                <router-link to="/highligh" class="nav-link">ហាយឡាយ</router-link>
                <!-- <router-link to="/movie" class="nav-link">test</router-link> -->
            </div>
        </div>
        <div style="padding: 5px;" class="change_lang">  
          <div class="dropdown">
            <button class="dropbtn"><img v-bind:src="'/icon/'+ this.lang+'.png'" alt=""></button>
            <div class="dropdown-content" @click="reloadPage">
              <button>
                <a @click="goToGame('kh')">
                  <div>
                    <div class="flex items-center gap-x-2 px-7">
                      <img src="/icon/kh.png" alt="">
                      <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white"> ភាសាខ្មែរ</span>
                      <img src="/icon/active.png" alt="" v-if="lang == 'kh'">
                    </div>
                  </div>
                </a>
              </button>
              <button>
                <a @click="goToGame('en')">
                  <div>
                    <div class="flex items-center gap-x-2 px-7">
                      <img src="/icon/en.png" alt="">
                      <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white">English</span>
                      <img src="/icon/active.png" alt="" v-if="lang == 'en'">
                    </div>
                  </div>
                </a>
              </button>
              
            </div>
          </div>
        </div>
        <form class="d-flex flexby">
            <input class="form-control search " type="search" placeholder="Search" style="padding: revert;border: aliceblue;">
            <button class="btn " type="submit">
              <img class="search-icon" src="/icon/search.svg" />
            </button>
        </form>
        </div>
    </nav>
  </div>  
  <router-view/>
  <div class="bg-blue-900 mt-2">
    <div class="mx-auto flex flex-col items-center justify-center bg-fan-primary">
      <div class="flex flex-col py-3 gap-y-5 md:py-3 lg:py-3 md:flex-row lg:flex-row items-center md:gap-x-10 lg:gap-x-10">
        <ul class="nav-footer-text nav-footer justify-content-end">
          <li class="nav-item">
            <a href="https://www.creative-tim.com" target="_blank" rel="noopener" class="nav-link text-white">
              <img src="/icon/fb1.png" alt="" width="25px">
            </a>
          </li>
          <li class="nav-item">
            <a href="https://www.creative-tim.com" target="_blank" rel="noopener" class="nav-link text-white">
                <img src="/icon/tik-tok.png" alt="" width="25px">
            </a>
          </li>
          <li class="nav-item">
            <a href="https://www.creative-tim.com/presentation" target="_blank" rel="noopener" class="nav-link text-white">
              <img src="/icon/telegram.png" alt="" width="25px">
            </a>
          </li>
          <li class="nav-item">
            <a href="http://blog.creative-tim.com" target="_blank" rel="noopener" class="nav-link text-white text-buttom">
              ©2022 Copyright ShareSport
            </a>
          </li>
        </ul>
      
      </div>
    </div>
  </div>

  <div v-if="showModal == true" >
        <div class="h-full w-full fixed top-0 left-0 z-20"></div>
        <div class="bg-white radis-sila rounded-lg text-lg pt-6 shadow-lg w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <div class="px-6 pb-6 text-center ">
                <div class="text-gray-600 font-light" style="margin: 10px;"  v-if="lang == 'en'">{{ en.you_can_change_language }}</div>
                <div class="text-gray-600 font-light" style="margin: 10px;" v-if="lang == 'kh'">{{ kh.you_can_change_language }}</div>
            </div>
            <ul class="cursor-pointer border-t border-gray-100">
                <li class="border-b text-blue-500 border-gray-100 w-full px-6 py-3 hover:bg-gray-100">
                  <button>
                    <a @click="goToGame('kh')">
                      <div>
                        <div class="flex items-center gap-x-2 px-7">
                          <img src="/icon/kh.png" alt="">
                          <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-black"> ភាសាខ្មែរ</span>
                          <img src="/icon/active.png" alt="" v-if="lang == 'kh'">
                        </div>
                      </div>
                    </a>
                  </button>
                </li>
                <li class="border-b text-blue-500 border-gray-100 w-full px-6 py-3 hover:bg-gray-100">
                  <button>
                    <a @click="goToGame('en')">
                      <div>
                        <div class="flex items-center gap-x-2 px-7">
                          <img src="/icon/en.png" alt="">
                          <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-back text-black">English</span>
                          <img src="/icon/active.png" alt="" v-if="lang == 'en'">
                        </div>
                      </div>
                    </a>
                  </button>
                </li>
            </ul>
        </div>
  </div>

</template>
<script>
  // import router from "./router";
import en from "./en.js";
  import kh from "./kh.js";
  if (localStorage.lang) {
    localStorage.lang;
  }
  else{
    localStorage.lang ='kh';
  }

export default {
  mixins:[en,kh],
  data() {
    return { 
      lang: localStorage.lang,
      show: false,
      showModal:false
     }
  },
  computed:{
     routePath(){
       return this.$route.path 
    },
    routeName(){
       return this.$route.name
    },
    
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    goToGame(text){
      localStorage.lang = text;
      this.lang = text;
      this.showModal = false
    },
    display() {
      console.log("clicked")
      this.show = !this.show
    },
    popup_lang(){
      this.showModal = true
      console.log('sila');
    }
  }
}

</script>

<style scoped>
.text-black{
  color: black;
}
.transform ul {
    padding-left: unset !important;
}
.bounce-enter-active {
    animation: bounce-in .5s ease-out both;
}

.bounce-leave-active {
    animation: bounce-in .5s reverse ease-in both;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.10);
    }
    100% {
        transform: scale(1);
    }
}
@media (max-width: 999px) {
  .change_lang{
    display: none
    ;
  }
  .change_lang_min{
    display: block;
  }

}

.dropbtn {
  background-color:white;
  color: #2e2151;
  padding: 5px;
  font-size: 16px;
  border: none;
  border-radius: 50px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #2e2151;
  /* margin-right: 180px; */
  min-width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  
}

.dropdown-content a:hover {
  background-color: #262230;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #2e2151;
  border-radius: 50px;
  color: white;

}






  .flexby .form-control {
    border-radius: 10px !important;
  }
  .search-icon{
    padding-bottom: 10px;
  }
  .search-type{
    display: none;
  }
  .example {
    display: none;
  }
  .box-highligh::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 999px) {
    .search-btn{
      height: 32px;
      padding-bottom: 10px;
    }
    .search-type .btn {
    /* background-color:rgb(255, 222, 74); */
    border-radius: 0px;color: white;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
  input:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
    .search-icon{
      padding-bottom: 8px;
    }
    .search-type{
      display: block;
    }
    .nav-link-example {
        padding-right: var(--bs-navbar-nav-link-padding-x);
        padding-left: var(--bs-navbar-nav-link-padding-x);
    }

    .new-mumu{
      display: block;
    }
    .example {
      width: 400px;
      overflow-x: scroll;
      padding: 10px;
    }

  .example::-webkit-scrollbar {
      display: none;
  }

  .example {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    white-space: nowrap;
  }
}
.nav-link{
margin: 5px;
}

.nav-footer{
  text-align: center;
}
li a{
  color: white !important;
}
.justify-content-end {
    -webkit-box-pack: end !important;
    -ms-flex-pack: end !important;
    justify-content: flex-end !important;
}
.nav-footer-text {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    list-style: none;
    align-items: center;
}
ol, ul, dl {
    margin-top: 0;
    margin-bottom: 1rem;
}
  .secondary {
      background-color: #2e2151 !important;
      border-color: #2e2151 !important;
  }
  div a {
      color: black;
      text-decoration: auto;
  } 
  .from-blue-900 {
      --tw-gradient-from: #2f2151;
      --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(30, 58, 138, 0));
  }
  .bg-blue-900 {
      --tw-bg-opacity: 1;
      background-color: rgba(30, 58, 138, var(--tw-bg-opacity));
  }

  .mt-2 {
      margin-top: 0.5rem;
  }
  .bg-blue-900 {
      --tw-bg-opacity: 1;
      background-color: rgba(30, 58, 138, var(--tw-bg-opacity));
  }
  .mt-2 {
      margin-top: 0.5rem;
  }
  .justify-center {
      justify-content: center;
  }

  .items-center {
      align-items: center;
  }
  @media (max-width: 1000px) {
        .flexby .search {
            display: none;
          }
          .flexby .btn {
            display: none;
          }
    }
  @import url('https://fonts.googleapis.com/css2?family=Hanuman&display=swap');
  #nav a:hover{
    color:rgb(255, 222, 74);
    }
  .flexby{
    background-color:white;
    border-radius: 10px;
    max-height: 30px;
    max-width: 220px;
  }
  .flexby .btn {
    /* background-color:rgb(255, 222, 74); */
    /* border-radius: 0px;color: white; */
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
  .form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .responsive {
    max-width: 100%;
    height: auto;
  }
  #nav a {
    color: white;
    font-size: 17px;
  }

  #nav a.router-link-exact-active {
    color:rgb(255, 222, 74);
  }
  #nav a.router-link-exact-active {
    color:rgb(255, 222, 74);
  }
  .bg-fan-primary {
      background-color: #6f4b98;
  }
</style>

