<script type="text/javascript">
// import $ from 'jquery'
const axios = require("axios");
const current = new Date();
import en from "../en.js";
import kh from "../kh.js";
if (localStorage.lang) {
      localStorage.lang;
  }
  else{
    localStorage.lang ='kh';
  }
export default {
  mixins:[en,kh],
  name: 'HoMe',
  data() {
    return {
      lang: localStorage.lang,
      banner :'',
      articles :[],
      livescore :[],
      livestream :[],
      highlights :[],
      showlivescore:'',
      showlivestream: false,
      logo:'https://lsm-static-prod.livescore.com/medium/',
      notlogo:'https://www.livescore.com/ls-web-assets/svgs/common/badge-default-201a546527a7779845697b44be2a618a.svg',
    }
  },
  
  mounted() {
    this.gethighlight();
    this.getarticle();
    this.getlivescore();
    this.getlivestream();
    this.getbanner();

  //   $( document ).ready(function() {
  //     var slideIndex = 0;
  //     showSlides();
  //     function showSlides() {
  //       var i;
  //       var slides = document.getElementsByClassName("mySlides");
  //       var dots = document.getElementsByClassName("dot");
  //       for (i = 0; i < slides.length; i++) {
  //         slides[i].style.display = "none";  
  //       }
  //       slideIndex++;
  //       if (slideIndex > slides.length) {slideIndex = 1}    
  //       for (i = 0; i < dots.length; i++) {
  //         dots[i].className = dots[i].className.replace(" active", "");
  //       }
  //       slides[slideIndex-1].style.display = "block";  
  //       dots[slideIndex-1].className += " active";
  //       setTimeout(showSlides, 1500); 
  //     }
  //   });
  },
  methods:{
    goToGame(text){
      localStorage.lang = text;
      this.lang = text;
    },
    getFormattedDate(dateString) {
            const onlyNumbers = dateString.toString(); 
            const year = onlyNumbers.slice(0,4) 
            const month = onlyNumbers.slice(4,6)
            const day = onlyNumbers.slice(6,8)
            const time = onlyNumbers.slice(8,10)
            const min = onlyNumbers.slice(10,12)
            const sc = onlyNumbers.slice(12,14)
            const current = new Date(year, month - 1, day ,time,min,sc);
            const lastdate = `${current.getHours() }:00`;
            return  lastdate
      },
    //=====livestream=========
    getlivestream(){
      axios.get("https://share-sport.2m-sport.com/api/livestream").then((res)=>{
      // console.log(res.data);
      if(res.data.status == true){
        this.showlivestream= true;
        this.livestream = res.data.data;
      }
      console.log(res.data.data)
        // console.log(res.data);
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    //=====highlight=========
    gethighlight(){
      axios.get("https://share-sport.2m-sport.com/api/highlight").then((res)=>{
        this.highlights = res.data.data;
        // console.log(res.data);
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    //=====getLiveScore=========
    getlivescore(){
        const CurrentDate = `${current.getFullYear()}${current.getMonth()+1}${current.getDate()}`;
        const url ='https://livescore6.p.rapidapi.com/matches/v2/list-by-date';
        const LiveScore = {
            params: {Category: 'soccer', Date: CurrentDate, Timezone: '7'},
            headers: {
              'X-RapidAPI-Key': 'e40ec2eb49msh5f5d272513681fep12e198jsn79b7968a2635',
              'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
            }
          }
        axios.get(url, LiveScore).then((res)=>{
          res.data.Stages.forEach((value) => {
            value.Events.forEach((last) => {
             this.livescore.push(last);
            });
          });
        }).catch(function (error) {
            console.error(error);
        });

      },
    //=====the-end=========
    //=====getarticle=========
    getarticle(page = 1){
      axios.get(`https://share-sport.2m-sport.com/api/article?page=${page}`).then((res)=>{
        this.articles = res.data.data;
        console.log(res)
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    //=====getbanner=========
    getbanner(){
      fetch("https://share-sport.2m-sport.com/api/banner")
      .then(res => res.json())
      .then(data => this.banner=data[0].photo)
      .then(data => console.log(data))
    }
    //=====the-end=========
  }
}
</script>
<style>
  .mySlides {
    display: none;
  }
  img {
    vertical-align: middle;
  }
  .slideshow-container {
    position: relative;
    margin: auto;
  }
  .dot {
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }
  .fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
  }
</style>
<template>
    <!-- <div class="mySlides ">
        <img src="benner/sdPxIyRAHrbdPBiBWkHI.jpg" style="width:100%;">
    </div>
    <div class="mySlides">
        <img src="benner/70iVHhyLRbY5S0AXOQr9.jpg" style="width:100%;">
    </div>
    <div class="mySlides">
      <img src="benner/NHqZ7eIwwoXuOWmcPP49.jpg" style="width:100%;">
    </div>
    <div style="text-align:center" hidden>
        <span class="dot"></span> 
        <span class="dot"></span> 
        <span class="dot"></span>
    </div>
      <div class=" form-shadow lg:py-2 md:py-2 mx-auto py-2 sm:w-auto to-blue-500 xl:py-2 bg-fan-primary loyloy">
      <span class="flex"><svg class="svg-hihhen" viewBox="0 0 24 24" style="width: 20px; height: 20px; color: rgb(255, 255, 255);"><path fill="currentColor" d="M4 7V19H19V21H4C2 21 2 19 2 19V7H4M21 5V15H8V5H21M21.3 3H7.7C6.76 3 6 3.7 6 4.55V15.45C6 16.31 6.76 17 7.7 17H21.3C22.24 17 23 16.31 23 15.45V4.55C23 3.7 22.24 3 21.3 3M9 6H12V11H9V6M20 14H9V12H20V14M20 8H14V6H20V8M20 11H14V9H20V11Z"></path></svg>
        <marquee  behavior="scroll" direction="left" onmouseover="this.stop();" onmouseout="this.start();"> 
        <a href="/article/296" class="text-white">
            <span>
              Galtier មានភាពភ្ញាក់ផ្អើលចំពោះ Neymar ចាប់តាំងពីក្លាយជាគ្រូបង្វឹក PSG
            </span>
          </a>
          <a href="/article/270" class="text-white">
          <span>
          Mikel Arteta និយាយថា កីឡាកររបស់គាត់នៅមានចំនួនតិចណាស់
        </span>
        </a>
        <a href="/article/296" class="text-white">
          <span>
            Galtier មានភាពភ្ញាក់ផ្អើលចំពោះ Neymar ចាប់តាំងពីក្លាយជាគ្រូបង្វឹក PSG
          </span>
        </a>
      </marquee>
    </span>
    </div> -->
    <video :src="'https://share-sport.2m-sport.com/banner/'+banner" title="Cambodia's Premium Internet Provider" type="video/mp4" autoplay="autoplay" loop="loop" muted="muted" playsinline="" class="cursor-pointer" __idm_id__="4227073" style="width:100%;"></video>
  <!-- <div class="max-w-6xl mx-auto nean"> -->
    <div class="container-sm">
 
    <!-- text run -->
      <!-- Livescore header-->
      <div class="flex justify-between text-sm lg:pt-3 md:pt-3 lg:pb-3 md:pb-3 pt-2 pb-2 ">
          <div class="flex gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600">
            <div class="bg-gradient-to-r from-blue-900 form-shadow to-blue-300 flex items-center gap-x-2 px-7">
            <i class="fa fa-futbol-o text-white" aria-hidden="true"></i>
            <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white" v-if="lang == 'en'">
                 {{en.livescore}}
            </span>
            <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white" v-else>
              {{kh.livescore}}
            </span>
            </div>
          </div>  
          <a href="article" class="text-gray-600 flex items-center justify-end">
            <span class="lg:text-md md:text-md" v-if="lang == 'en'">
              {{en.morelivescore}}
            </span>
            <span class="lg:text-md md:text-md" v-else>
              {{kh.morelivescore}}
            </span>
          </a>
      </div>
    <div >
    <!-- End header-->
    <!-- Livescore -->
        <div class="rounded" >
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-1 gap-x-2">
              <!-- ======== -->
                <div class="ok sk" id="row" v-for="(team, key, index) in  livescore.slice(0,12) " :key="index">
                  <a class="Sj" :href="'/games/'+team.Eid" data-aos="fade-right">
                    <div class="Jk">
                      <span class="fr">
                        <span v-if="team.Eps == 'FT'" id="row__status-or-time" class="gr">
                        <span id="row__status-or-time" class="gr">
                          {{team.Eps}}
                        </span>
                        </span>
                        <span v-else-if="team.Eps == 'AP'" id="row__status-or-time" class="gr">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'Postp.'" id="row__status-or-time" class="gr">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'AET'" id="row__status-or-time" class="gr">
                          {{team.Eps}}
                        </span>
                        <span v-else id="row__status-or-time" class="gr">
                          {{getFormattedDate(team.Esd)}}
                        </span>
                      </span>
                      <div class="vk">
                        <div class="wk" v-for="(tm) in team.T1" :key="tm"> 
                            <div id="row__home-team-badge" class="Hk">
                              <span class="span1">
                                <span class="span1">
                                  <img alt="" v-bind:src="logo+ tm.Img"
                                  class="span2">
                                </span>
                                </span>
                            </div>
                          <div id="row__home-team-name" class="yk">{{ tm.Nm }}</div>
                        </div>
                        <div class="xk" v-for="(tm) in team.T2" :key="tm">
                            <div id="row__home-team-badge" class="Hk">
                              <span class="span4">
                                <span class="span1">
                                  <img alt="" v-bind:src="logo+ tm.Img" class="span3">
                                </span>
                              </span>
                            </div>
                          <div id="row__away-team-name" class="yk">{{ tm.Nm }}</div>
                        </div>
                      </div>
                      <div class="Ck">
                        <div id="row__home-team-score" class="Dk">{{team.Tr1}}</div>
                        <div id="row__away-team-score" class="Ek">{{team.Tr2}}</div>
                      </div>
                    </div>
                  </a>
                </div>
              <!-- ======== -->
          </div>
        </div>
    <!-- End -->
    <!-- end text run -->
    </div>
    <!-- ------------------------------>
    <!-- showlivestream-->
    <div class="flex justify-between text-sm lg:pt-3 md:pt-3 lg:pb-3 md:pb-3 pt-2 " v-if="showlivestream == true">
      <div class="flex gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600">
        <div class="bg-gradient-to-r from-blue-900 form-shadow to-blue-300 flex items-center gap-x-2 px-7">
          <i class="fa fa-video-camera text-white" aria-hidden="true"></i>
        <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white" v-if="lang == 'en'">
          {{en.livestream}}
        </span>
        <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white" v-else> 
          {{kh.livestream}}
        </span>
        </div>
      </div>  
      <a href="livestream" class="text-gray-600 flex items-center justify-end">
        <span class="lg:text-md md:text-md" v-if="lang == 'en'">
          {{en.morelivestream}}
        </span>
        <span class="lg:text-md md:text-md" v-else>
          {{kh.morelivestream}}
        </span>
      </a>
    </div>
    <div id="previews" data-aos="slide-up">
      <div class="row " >
        <div class="col-sm-4" v-for="(item) in livestream" :key="item">
          <div class="match-box">
            <a :href="'livestream/'+item.id">
              <div class="top-part flex">
                  <img v-bind:src="'https://share-sport.2m-sport.com/upload/'+item.photo" class="logo-iii" style="border-radius: 5px 5px 0px 0px;">
              </div>
              <div class="bottom-part">
                <div class="team-name get_name yearlo">
                  <span>{{ item.title }}</span> 
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- showlivestream End-->
    <!-- Livescore header-->
    <div class="flex justify-between text-sm lg:pt-3 md:pt-3 lg:pb-3 md:pb-3 pb-2 sila">
        <div class="flex gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600">
          <div class="bg-gradient-to-r from-blue-900 form-shadow to-blue-300 flex items-center gap-x-2 px-7">
            <i class="fa fa-list-alt text-white" aria-hidden="true"></i>
          <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white" v-if="lang == 'en'">
            {{en.article}}
          </span>
          <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white" v-else>
            {{kh.article}}
          </span>
          </div>
        </div>  
        <a href="article" class="text-gray-600 flex items-center justify-end">
          <span class="lg:text-md md:text-md" v-if="lang == 'en'">
            {{en.morearticle}}
           </span>
          <span class="lg:text-md md:text-md" v-else>       
            {{kh.morearticle}}
          </span>
        </a>
    </div>
    <!-- End header-->

    <!-- start wallpaper -->
    <div class="wrapper" hidden >
      <div data-aos="zoom-in" v-for="(value, key, index) in articles.slice(0,2)" :key="index">
        <div class="box ">
          <div class="relative">
              <a v-bind:href="'/article/'+value.id" class="">
                <div class="absolute bottom-0 left-0 md-p-10 p-6 from-black bg-gradient-to-t w-full">
                  <h2 class="md-text-lg lg:text-2xl font-bold text-white name" >
                      {{value.title}}
                  </h2> 
                  <p class="text-gray-400 media-415 text-detail-text limit-hidden">
                    {{value.detail}}
                  </p>
                </div>
                <img  v-bind:src="'https://share-sport.2m-sport.com/upload/'+ value.photo" 
                class="w-full sm-block h-64 object-cover v-lazy-image ">
                </a>
            </div> 
        </div>
      </div>
      <div>
      </div>
      <div data-aos="zoom-in" class="box b" v-for="(value, key, index) in articles.slice(2,3)" :key="index"> 
        <div class="relative">
          <a v-bind:href="'/article/'+value.id">
            <div class="absolute bottom-0 left-0 md-p-10 px-6 py-6 bg-gradient-to-t from-black w-full">
            <h2 class="mdd-text-lg lg:text-2xl font-bold text-white name" >
              {{value.title}}
            </h2> 
            <p class="text-gray-400 media-415 text-detail-text limit-hidden">
              {{value.detail}}
            </p>
            </div>
            <img v-bind:src="'https://share-sport.2m-sport.com/upload/'+ value.photo"
            class="w-full sd-block h-full object-top object-cover v-lazy-image " style="height: 522px;">
          </a> 
        </div>

      </div>
    </div>
    <!-- end wallpaper -->
    
    <!-- =======footer====== -->
    <div class="old-color  radis-sila" data-aos="zoom-in" style="background-color: white;">
    <div class="grid-footer ">
      <div class="box-footer box-sila radis-sila" v-for="(value, key, index) in articles.slice(3,4)" :key="index"> 
        <a v-bind:href="'/article/'+value.id">
          <img v-bind:src="'https://share-sport.2m-sport.com/upload/'+ value.photo" style="width:100%;" class="radis-sila article-one" >
          <div  class="text-footer text-detail yearlo">
            <span>
              {{value.title}}
            </span>
          </div>
        </a>
      </div>
      <div class="box-footer"> 
        <div class="wrapper-end radis-sila"  >
          <div  v-for="(value, key, index) in articles.slice(4,10)" :key="index">
            <div class="box-end a-end radis-sila">
              <a v-bind:href="'/article/'+value.id">
                <img v-bind:src="'https://share-sport.2m-sport.com/upload/'+ value.photo" style="width:100%;" class="article radis-sila"  >
                <div class="benner-text-xs text-text yearlo">
                  <span> 
                    {{value.title}}
                  </span> 
                </div>
              </a>
            </div>
          </div>
    
        </div>
      </div>
    </div>
      <!-- ===========Media============= -->
      <div class="grid-last">
        <div data-aos="slide-up" v-for="(value, key, index) in articles.slice(10,14)" :key="index">
          <a v-bind:href="'/article/'+value.id">
            <div class="box-last radis-sila">
            <img v-bind:src="'https://share-sport.2m-sport.com/upload/'+ value.photo" class="w-full new-height  radis-sila">
            <div class="yearlo text-text">
              {{value.title}}
            </div>
          </div>
        </a>
        </div>
      </div>
      <!-- ===========end-Media============= -->
    </div>
    <!-- +++++++++++++++++++++ -->
    <div class="flex justify-between text-sm lg:pt-3 md:pt-3 lg:pb-3 md:pb-3 pt-2 pb-2 ">
      <div class="flex gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600">
        <div class="bg-gradient-to-r from-blue-900 form-shadow to-blue-300 flex items-center gap-x-2 px-7">
        <i class="fa fa-television text-white" aria-hidden="true"></i>
        <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white" v-if="lang == 'en'"> 
          {{en.highligh}}
        </span>
        <span class="inline-block lg:text-lg md:text-lg text-lg font-medium text-white" v-else>
          {{kh.highligh}}
          </span>
        </div>
      </div>  
      <a href="highligh" class="text-gray-600 flex items-center justify-end">
        <span class="lg:text-md md:text-md" v-if="lang == 'en'"> 
          {{en.morehighligh}}
        </span>
        <span class="lg:text-md md:text-md" v-else> 
          {{kh.morehighligh}}
        </span>
      </a>
    </div>
    <!-------------------------------->

    <!--=======end-footer======-->
    <div class="wrapper-card radis-sila" style="margin-top: 0px;"  data-aos="zoom-in">
      <div class="grid-highligh">
        <div class="box-highligh" data-aos="fade-right" v-for="(value, key, index) in  highlights.slice(0,9) " :key="index">
          <div class="box-last">
            <img v-bind:src="'https://share-sport.2m-sport.com/upload/'+ value.photo" 
            class="w-full new-height  radis-sila"><div class="yearlo get_name">
            {{value.title}}
            </div>
          </div>
        </div>
        <div class="card card--lemix">
          <div class="card--view-all">
            <a class="card-view-all yearlo" href="/highligh" target="_blank">
              <span class="icn-arrow-right" v-if="lang == 'en'">
                {{en.Viewall}}
              </span>
              <span class="icn-arrow-right" v-else>
                {{kh.Viewall}}
              </span>
            </a>
          </div>
        </div>
    </div>
    </div>
</div>
</template>
<style scoped > 
.wrapper-score .match-box .team-name .spacer{
    width: 20px;
    display: inline-block;
}
.match-box a:hover span{
  color: #ffe500 !important;
}
.wrapper-score .match-box{
    margin: 20px auto;
    max-width: 230px;
}
.wrapper-score .match-box .top-part{
    background: #6f4b982b;
    height: 77px;
}
.wrapper-score .match-box .team-badge{
    float: left;
    width: 40%;
    text-align: center;
}
.wrapper-score .match-box .team-name{
    color: #fff;
    text-align: center;
    overflow: hidden;
    font-size: 15px;
}
.wrapper-score .match-box .bottom-part{
    background: #6f4b98;
    height: 27px;
    line-height: 27px;
    border-radius: 0 0 5px 5px;
}
.wrapper-score .match-box .vs{
    float: left;
    width: 20%;
    text-align: center;
    position: relative;
    top: 30px;
    font-size: 17px;
}
.wrapper-score {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
.box {
  color: #2f2151 !important;
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
}



.old-color{
  background: #6f4b98;
}
  .grid-highligh::-webkit-scrollbar {
      display: none !important;
  }
.new-height{
  height: 150px !important;
}

.article-one{
    height: 15rem;
}
.article{
  height: 6.4rem;
}
.span4{
  box-sizing: border-box; 
  display: inline-block; 
  overflow: hidden; 
  width: initial; 
  height: initial; 
  background: none; 
  opacity: 1; 
  border: 0px; 
  margin: 0px; 
  padding: 0px; 
  position: relative; 
  max-width: 100%;
}
.span3{
  display: block; 
  max-width: 100%; 
  width: initial; 
  height: initial; 
  background: none; 
  opacity: 1; 
  border: 0px; 
  margin: 0px; 
  padding: 0px;
}
.span2{
  display: block; 
  max-width: 100%; 
  width: initial; 
  height: initial; 
  background: none; 
  opacity: 1; 
  border: 0px; 
  margin: 0px; 
  padding: 0px;}
.span1{
  box-sizing: border-box;
  display: inline-block; 
  overflow: hidden; 
  width: initial;
  height: initial;
  background: none;
  opacity: 1;
  border: 0px; 
  margin: 0px; 
  padding: 0px; 
  position: relative; 
  max-width: 100%;
}
.nk, .ok, .pk, .qk {
    color: #aaa;
    cursor: default;
    padding-bottom: 5px;
    position: relative;
}
.nk a, .ok a, .pk a, .qk a {
    text-decoration: none;
}
.Sj {
    text-decoration: none;
    display: inherit;
    align-items: inherit;
}
.Jk {
    display: flex;
    align-items: center;
    font-size: 14px;
    position: relative;
    padding: 10px 0;
    flex: 1 1;
    text-decoration: none;
    color: #fff;
    background: #2f2151;
    /* border-radius: 7.5px; */
    border-radius:0px 0px 10px 10px !important;
    margin: 0 10px;
} 
.box-sila{
  background: #2f2151;
}

.box-end{
  background: #2f2151;
}
.ok a:hover span{
    color:rgb(255, 222, 74);
  }
.box-end a:hover span{
    color:rgb(255, 222, 74);
  }
.box-footer a:hover span{
    color:rgb(255, 222, 74);
  }
.box-end a:hover span{
    color:rgb(255, 222, 74);
  }
.fr, .gr {
    display: flex;
}
.fr {
    flex: 0 0 50px;
    flex-direction: column;
    position: relative;
    color: #fff;
    padding: 4px 0 0;
    font-size: 11px;
    justify-content: space-between;
    height: 40px;
}
.hr {
font-size: 9px;
}
.gr {
    justify-content: center;
}
.fr, .gr {
    display: flex;
}
.vk {
    flex: 1 1;
    min-width: 0;
}
.wk {
    margin-bottom: 5px;
}
.wk, .xk {
    display: flex;
    flex: 1 1;
    letter-spacing: .41px;
    position: relative;
}
.Hk, .Hk>div {
    display: flex;
}
.Hk {
    margin-right: 10px;
}
.Hk img {
    max-height: 20px;
    max-width: 20px;
}
.wk .yk, .xk .yk {
    align-self: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.wk, .xk {
    display: flex;
    flex: 1 1;
    letter-spacing: .41px;
    position: relative;
}

.Ck, .Dk, .Ek {
    display: flex;
}
.Ck {
    color: #fdfdfd;
    flex: 0 0 30px;
    flex-direction: column;
    font-weight: 700;
    position: relative;
    margin-right: 13px;
}
.Dk {
    margin-bottom: 5px;
}
.Dk, .Ek {
    align-self: flex-end;
    align-items: center;
    height: 20px;
}
.Lk {
    width: 35px;
    align-self: stretch;
}
.Kk>div, .Lk {
    display: flex;
    align-items: center;
}
.jj {
    display: flex;
    align-self: stretch;
    align-items: center;
    cursor: default;
}
.jj svg {
    width: 20px !important;
    height: 20px !important;
    fill: #666 !important;
}
/* [[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]] */
@media (max-width: 500px) {
  .grid-footer {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 1fr !important;
      /* padding: 20px; */
  }

}
.col-sm-4 {
      flex: 0 0 auto;
      width: 33.33333333%;
  }

@media (max-width: 740px) {
  .grid-wrap {
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr !important;
    grid-template-rows: auto;
    grid-template-areas:
        "head head head head"
        "main main2 . side";
    background: #6f4b98;
  }
  .item-2 {
    display: none !important;
  } 
}
.grid-wrap {
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    grid-template-areas:
        "head head head head"
        "main main2 . side";
    background: #6f4b98;
}
.item {
    margin: 2px;
    color: white;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    background: #6f4b98;

}
.item-1 {
    grid-area: head;
    background: #6f4b98;
}
.item-1-2 {
    grid-area: head2;
    background: #6f4b98;
}

.item-2 {
    grid-area: main;
    background: #6f4b98;
}

/* [[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]] */
    .text-detail{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        max-height: 70px;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    .text-text{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        max-height: 50px;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
.text-footer{
  font-size: 25px; 
  color: #2f2151;
}
.header-footer{
  padding-top: 30px !important;
}
.get_name {
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 286px;
    overflow: hidden;
}
.card--lemix {
    box-shadow: none;
    display: inline-block;
    float: none;
    white-space: normal;
    width: 286px;
    vertical-align: top;
    margin: 20px 0 0 20px;
    padding: 0;
    border: aliceblue;
}
.card--view-all {
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    height: 162px;
    background-color: #6f4b98;
}
.card-view-all {
    border: 1px solid;
    font-size: 20px;
    border-radius: 100px;
    padding: 22px;
}
.grid-highligh{
    cursor: grab;
    cursor: -webkit-grab;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    /* padding-bottom: 20px;
    margin-bottom: -20px; */
    -ms-overflow-style: none;
    background-color: #6f4b98;
    margin-bottom: -5px;
}
.box-highligh {
    box-shadow: none;
    display: inline-block;
    float: none;
    white-space: normal;
    width: 286px;
    vertical-align: top;
    margin: 0px 10px 0px 0px;
    padding: 0;
}
#previews .match-box {
    margin: 20px auto;
    max-width: 230px;
}
#previews .match-box .top-part {
    background: #6f4b982b;
    width: 100%;
}
#previews .match-box .team-badge {
    float: left;
    width: 40%;
    text-align: center;
}
#previews .match-box .vs {
    float: left;
    width: 20%;
    text-align: center;
    position: relative;
    top: 32px;
}
#previews .match-box .team-badge {
    float: left;
    width: 40%;
    text-align: center;
}
#previews .match-box .bottom-part {
    background: #2f2151;
    height: 27px;
    line-height: 27px;
    border-radius: 0 0 5px 5px;
}
#previews .match-box .team-name {
    color: #fff;
    text-align: center;
    overflow: hidden;
    font-size: 12px;
}
#previews .match-box .team-name .spacer {
    width: 20px;
    display: inline-block;
}
span a {
    color: white;
    -webkit-text-decoration: auto;
    text-decoration: auto;
}
.rounded-md {
    margin-top: 5px;
}
.wrapper-end {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100%;
    margin-right: -8px;
    margin-left: -6px;
  }

  .box-end {
    color: #2f2151;
    padding: 2px;
  }

  .a-end {
    grid-area: 1 / 2 / 2 / 3;
  }
  .b-end {
    grid-area: 2 / 2 / 3 / 3;
  }
  .c-end {
    grid-area: 2 / 3 / 3 / 4;
  }
  .d-end {
    grid-area: 1 / 1 / 2 / 2;
  }
  .e-end {
    grid-area: 2 / 1 / 3 / 2;
  }
  .f-end {
    grid-area: 1 / 3 / 2 / 4;
  }

.grid-footer {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 10px;
}
.box-footer {
  color: white;
  text-align: center;
  padding: 1px;
  margin-right: 2.2px;

}
.grid-last {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.box-last {
  background: #2f2151;
  color: white;
  text-align: center;
  padding: 1px;
  border-radius: 3px;
}
.media{
    position: relative;
    background-color: #6f4b98;
    padding: 20px;
    color: white;
}
.widget-headline:before {
    content: "";
    position: absolute;
    top: 50%;
    background-color: #a2aaad;
    margin-top: -1px;
    left: 0;
    right: 0;
}
@media (min-width: 580px){
.widget-media-group>h2 {
    margin: 40px 0 30px;
}
}
@media (min-width: 480px){

.widget-media-group>h2 {
    margin: 46px 0 26px;
}
.widget-media-group>h2 {
    color: #fff;
    margin: 36px 0 26px;
}
}
@media (min-width: 580px)
{
.widget-headline {
    font-size: 30px;
    margin: 40px 0 30px;
}
.widget-headline {
    font-weight: 600;
    position: relative;
    overflow: hidden;
    clear: both;
    text-align: center;
    text-transform: uppercase;
    color: #081f2c;
    padding: 0;
    line-height: 1;
}
}
h3{
    color:white;
    background-color: #2f2151;    
}
.wrapper-card{
  padding: 20px;
  background-color: #6f4b98 ;
}
.footer {
  background-color: #6f4b98 ;
  font-size: 17px;
  padding-left: 10px;
}
.footer a {
  text-decoration: none;
  color: white  ;
}
.card [data-side][href] {
    cursor: pointer;
}
.card [data-side] {
    display: block;
    position: relative;
    text-decoration: none;
    clear: both;
    -webkit-transition: opacity .3s ease,visibility .3s ease;
    transition: opacity .3s ease,visibility .3s ease;
    will-change: opacity,visibility;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    height: calc(100% - 45px);
}
.picture__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 1px;
    object-fit: cover;
}
img {
    border-style: none;
}
@media (min-width: 740px) and (max-width: 1579px)
{
  .news-card-5 .title {
      font-size: 14px;
      line-height: 17px;
      padding: 12px 12px 13px;
      background-color: #2f2151;
  }
}
@media (max-width: 1579px)
{
.news-card-5 .title {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 100%;
    position: relative;
    margin: 0 0 0 135px;
    overflow: hidden;
    word-wrap: break-word;
    min-height: 72px;
}
}

@media (max-width: 1579px)
{
.news-card-5 .picture {
    width: 135px;
    height: 100%;
    position: absolute;
    left: 0;
}
}
.picture {
    position: relative;
    height: 0;
    margin: 0;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 92px 40px;
    background-color: #fff;
    overflow: hidden;
}
/* ============ */
.wrapper-grid {
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(2, [col] 150px ) ;
    grid-template-rows: repeat(2, [row] auto  );
  }

  .box-grid {
    color: white;
    border-radius: unset;
    padding: 1px;
    font-size: 150%;

  }

  .box-grid .box-grid {
    background-color: white;
    color: #2f2151 ;
  }

  .a-grid {
    grid-column: col / span 2;
    grid-row: row;
  }

  .b-grid {
    grid-column: col 3 / span 2;
    grid-row: row;
  }

  .c-grid {
    grid-column: col / span 3;
    grid-row: row 2;
  }

  .d-grid{
    grid-column: col 3 / span 2;
    grid-row: row 2;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: 1fr 1fr;
  }

  .e-grid {
    grid-column: 1 / 3;
    grid-row: 1;
  }

  .f-grid {
    grid-column: 1/3;
    grid-row: 1;
  }

  .g-grid {
    grid-column: 1/3;
    grid-row: 2;
  }

  .h-grid {
    grid-column: 1/3;
    grid-row: 3;
  }
/* ============ */
.justify-end{
  text-decoration: none;
  color: #2f2151
}
div h2{
  font-family:'Roboto','Hanuman' !important;
}
div p{
  font-family:'Roboto','Hanuman' !important;
}
p {
    margin-top: 0;
    margin-bottom: -1rem;
}
.c-grid-c{
    display: none;
  }
@media (max-width: 900px) {
  .grid-last {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr 1fr ;
        padding-top: 30px;
    }
}
@media (max-width: 500px) {
  .grid-last {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr ;
        padding-top: 30px;
    }
}
@media (max-width: 416px) {
  .limit-hidden{
    display: none;
  }
  body::-webkit-scrollbar {
      display: none !important;
  }
  .grid-footer {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr;
    padding-top: 8px;
  }
  .max-w-6xl{
    max-width: 360px !important; 
  }
  .c-grid-c{
    display: block;
  }
  .title{
    background-color: #2f2151;
  }
  .wrapper-grid {
      display: grid;
      grid-gap: 25px;
      grid-template-columns: unset;
      grid-template-rows: repeat(2, [row] auto );
  }
  .d-grid {
      grid-column: unset;
      grid-row: row 2;
      display: grid;
      grid-gap: 25px;
      grid-template-columns: 1fr 1fr;
  }
  .c-grid{
    display: none;
  }
  .widget-headline{
    text-align: center;
  }
  .media{
    padding: 10px;
  }
  /* .widget-headline{
    display: none;
  } */
  .benner-text-xs{
    text-overflow: ellipsis;
    max-height : 40px;
    overflow: hidden;
    font-size: 10px; 
  }
  .svg-hihhen{
    display: none;
  }
  .text-footer{
    font-size: 15px; 
    color: #2f2151;
    text-overflow: ellipsis;
    max-height : 70px;
    overflow: hidden;
  }
#previews .match-box .team-name{
    color: #fff;
    text-align: center;
    overflow: hidden;
    font-size: 10px;
}
  #previews{
    padding: 0px 10px 0px 10px;
  }
  .sila{
    padding-top: 0px !important;
  }
  #previews .match-box .vs{
    float: left;
    width: 20%;
    text-align: center;
    position: relative;
    top: 13px;
}
#previews .match-box .top-part{
    background: #6f4b982b;
    height: 50px;
}
  .logo-iii{
    width: 100%;
  }
.col-sm-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
}
}
@media (max-width: 1000px) {
  .grid-footer{
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 1fr !important;
      padding-top: 8px;
  }
}

@media (max-width: 1250px) {
.wrapper {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr !important ;
    color: #444;
  }
  .b{
    grid-column: unset !important;
    grid-row: unset !important;
    display: none;
  }
  .h-64{
      height: 24rem !important;
  }
}
  @media (max-width: 415px) {
    .grid-last {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr ;
        padding-top: 30px;
    }
    .game-board-steam {
        display: grid;
        grid-template-columns: 380px;
        justify-content: center;
        padding-top: 5px;
    }
    .game-boarddd {
        display: grid;
        grid-template-columns: 380px;
        justify-content: center;
        padding-top: 5px;
    }
    .w-154{
      max-width:  115px; 
      height: 70px !important;
    }
    .grid-box {
        background-color: none;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .grid-img {
        width: 380px;
        display: grid;
        grid-template-columns: 100%;
        grid-row: auto auto;
    }
    .text-gray-600 {
        font-size: 15px;
    }
    .description{
      display: none;
    }
 
    a{
      text-decoration: none;
    }
    .game-boardddd {
        display: grid;
        grid-template-columns: none;
        justify-content: center;
    }
    .game-board-town {
        display: grid;
        grid-template-columns: 380px;
        justify-content: center;
    }
    .boxtown {
        display: flex;
        text-align: center;
        margin-bottom: -145%;
    }

    .p-6{
      padding: 0px !important;
    }
    .left-pf{
      display: none;
    }
    .px-6 {
        padding-left: 5px !important;
        padding-right: 0px !important;
        padding-top: 2.3rem !important;
    }
    .md-text-lg {
      padding-top: 60px;
      font-size:13px !important;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 90px;
      padding-left: 5px;
    }
    .mdd-text-lg {
      padding-top: 110px;
      font-size:13px !important;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 170px;

    }
    .text-xs-text{
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
      width: 100px !important;
    }
    .text-buttom{
      font-size: 9px
    }
    .text-gray-buttom{
      font-size: 9px;
      text-decoration: none;
    }
    .scorehome{
      padding: 0 0 0 240px !important;
    }
    .sm-block{
      height: 95px !important;
    }
    .sd-block{
      height: 200px !important;
    }
    .md-p-10{
      height: 100%;
    }
    .wrapper {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr;
    /* background-color: #fff; */
    color: #444;
    width: 99%;
    }

    .box {
      color: #fff;
      border-radius: 5px;
      font-size: 150%;

    }
    .a {
      grid-column: 1 / 2;
      grid-row: 1;
    }
    .b {
      grid-column: 2 ;
      grid-row: 1 / 3;
    }
    .c {
      grid-column: 1 /2 ;
      grid-row: 2 ;
    }
    .v-lazy-image-loaded{
      height: 20% !important;
    }
    .lg-text-2xl {
      display: none;
    }
  }
    /* position: relative; */

.wrapper2 {
  display: flex;
  grid-template-columns: 100%;
  grid-gap: 5px;
  background-color: #fff;
  color: #444;
}

.box2 {
  width: 16.7%;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  font-size: 150%;
}
.sila{
  padding-top: 14px;
}
.wrapper {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr;
    /* background-color: #fff; */
    color: #444;
    /* display:none */
  }

  .box {
    color: #fff;
    border-radius: 5px;
    font-size: 150%;

  }

  .a {
    grid-column: 1 / 2;
    grid-row: 1;
  }
  .b {
    grid-column: 2 ;
    grid-row: 1 / 3;
  }
  .c {
    grid-column: 1 /2 ;
    grid-row: 2 ;
  }

@media (min-width: 768px)
{
.md\:p-10 {
    padding: 2.5rem;
}
}

.py-6 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}
.px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}


@media (min-width: 640px)
{
.sm\:block {
    display: block;
}
}
.object-cover {
    -o-object-fit: cover;
    object-fit: cover;
}
.rounded {
    border-radius: 0.25rem;
}
.h-64 {
    height: 16rem;
}
@media (min-width: 640px)
{
.sm\:block {
    display: block;
}
}
.w-full {
    width: 100%;
}
.h-64 {
    height: 16rem;
}
.p-6 {
    padding: 1.5rem;
}

.from-black {
    --tw-gradient-from: #000;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 0, 0, 0));
}
.from-black-movie {
    --tw-gradient-from: #000;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 0, 0, 0.2));
    height: 100%;
}
.bg-gradient-to-t {
    background-image: linear-gradient(to top, var(--tw-gradient-stops));
}

.w-full {
    width: 100%;
}
.px-7 {
    padding-right: 0.5rem!important;
    padding-left: 0.5rem!important;
    padding-bottom: 0.5rem!important;
    padding-top: 0.5rem!important;
}
.left-0 {
    left: 0px;
}
.bottom-0 {
    bottom: 0px;
}
.absolute {
    position: absolute;
}
.relative {
    position: relative;
}
  .item2 { 
    grid-area: menu;
   }
  .item4 { grid-area: right; }
  .item5 { grid-area: footer; }

  .grid-container {
    display: grid;
    grid-template-areas:
      'header header'
      'menu right'
      'menu footer';
    gap: 10px;
  }

  .grid-container > div {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
  }
  .to-blue-300 {
      --tw-gradient-to: #6f4b98;
  }
  .loyloy a:hover span{
    color:rgb(255, 222, 74);
  }
  .scorehome{
      padding: 0 0 0 115px;
  }
  .py-py {
      padding-top: 0.5rem;
  }
  
  .gap-y-1 {
      row-gap: 0.25rem;
  }
  .gap-x-2 {
      -moz-column-gap: 0.5rem;
      column-gap: 0.5rem;
  }
  .grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid {
      display: grid;
  }
  @media (min-width: 1280px)
  {
    .xl\:grid-cols-4 {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
 
  .text-white {
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
  }

  .font-light {
      font-weight: 300;
  }
  .text-xs {
      font-size: 0.75rem;
      line-height: 1rem;
  }

  .font-light {
      font-weight: 300;
  }
  .flex-col {
    flex-direction: column;
  }
  .w-10 {
      width: 2.5rem;
  }
  .bg-fan-primary {
    background-color: #6f4b98;
  }

  .bg-fan-primaryy {
    background-color: #6f4b98;
  }
  .tot {
    height:20px;
    width: 20px;
  }
  .ease-in-out {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  .shadow {
      --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  .pl-1 {
      padding-left: 0.25rem;
  }
  .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
  }
  .px-2 {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
  }
  .rounded-md {
      border-radius: 0.375rem;
  }
  .gap-x-2 {
      -moz-column-gap: 0.5rem;
      column-gap: 0.5rem;
  }
  .items-center {
      align-items: center;
  }
  .cursor-pointer {
      cursor: pointer;
  }
  .flex {
      display: flex;
  }
  .ease-in-out {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  [xyz~=back-1] {
      --xyz-translate-z: -100px;
  }
  [xyz~=fade] {
      --xyz-opacity: calc(1 - var(--xyz-opacity-default));
  }
  [xyz~=perspective-2] {
      --xyz-perspective: 1000px;
  }
  [xyz~=stagger-2] {
      --xyz-stagger: 0.2s;
  }
  .rounded {
    border-radius: 0.25rem;
  }
 .justify-between a:hover{
    color:rgb(255, 222, 74);
  }

  .dot {
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }
  
  .active {
    background-color: #717171;
  }
  
  /* Fading animation */
  .fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
  }
  .max-w-6xl {
      max-width: 90%;
  }

  .mx-auto {
      margin-left: auto;
      margin-right: auto;
  }
</style>

