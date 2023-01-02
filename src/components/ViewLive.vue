<script>
    import ProfileFB from '../components/ProfileFB.vue'
    import { useRoute } from 'vue-router';
    const axios = require("axios");
    import moment from 'moment'

    export default {

        components: {
            ProfileFB
        },
        data() {
            return {
            livestream:[],
            id:{},
            }
        },
        mounted(){
            this.getsetup();
            this.getlivestream();
        },
        methods: {
            FormDate(value) {
                if (value) {
                    return moment(String(value)).format('MMMM-DD-YYYY')
                }
            },
            getsetup(){
                const route = useRoute()
                this.id = route.params.id;
            },
            //=====livestream=========
            getlivestream(){
            axios.get("https://share-sport.2m-sport.com/api/livestream/"+this.id).then((res)=>{
                this.livestream = res.data;
            }).catch(function (error) {
                console.error(error);
            });
            },
            //=====the-end=========

        }
    }
</script>

<template>
    <div class="lg:px-0 md:px-0">
        <div class="max-w-6xl mx-auto">
            <div class="flex flex-col gap-x-2 gap-y-2 md:gap-x-5 md:gap-y-4 lg:gap-x-5 lg:gap-y-4 items-start justify-between lg:py-3 md:flex-row md:py-3 mx-auto">
                <div class="w-full md:w-7/12 lg:w-9/12" v-for="(value, key, index) in  livestream " :key="index">
                    <div class=" flex flex-col from-gray-100 gap-y-4 lg:gap-y-4 md:gap-y-4 rounded-md">
                        <div class="bg-transparent rounded px-2">
                            <div class="w-full mx-auto lg:px-0">
                                <div class="content text-gray-200 lg:leading-8 md:leading-8 lg:text-lg md:text-lg text-lg">
                                        <div style="position:relative;padding-bottom:56.25%;overflow:hidden;height:0;max-width:100%;"><iframe :id="value.live_id" :src="'https://iframe.dacast.com/live/'+value.server_id+'/'+value.live_id" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay;encrypted-media" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen style="position:absolute;top:0;left:0;"></iframe></div>
                                </div>
                            </div>
                            <div class="lg:px-0 md:flex-row mx-auto w-full">
                                <div class="items-start justify-start lg:px-0">
                                    <div class="flex items-center">
                                        <h2 class="capitalize font-medium lg:leading-10 lg:text-2xl md:leading-8 md:text-md md:pt-3 lg:pt-3 text-2xl leading-10 py-3">
                                            {{value.title}}
                                        </h2>
                                    </div> 
                                    <div class="flex items-center justify-between">
                                        <div class="group flex gap-x-5"><div>
                                                <p class="flex font-medium gap-x-1 items-center leading-none lg:text-base text-gray-600 text-sm">
                                                <span class="font-semibold md:font-medium">                   
                                                         {{FormDate(value.date)}}
                                                </span>
                                                </p>
                                            </div> 
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                            
                    <iframe name="f6aedf7d4e55f8" width="1000px" height="100px" data-testid="fb:comments Facebook Social Plugin" title="fb:comments Facebook Social Plugin" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v7.0/plugins/comments.php?app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df3f6b569f15ad34%26domain%3Dkh88bet.net%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Fkh88bet.net%252Ff3acf98711934d8%26relation%3Dparent.parent&amp;container_width=810&amp;height=100&amp;href=http%3A%2F%2Fkh88bet.net%2Fnews%2Fsport-news%2Fbenzema&amp;locale=en_US&amp;numposts=5&amp;sdk=joey&amp;version=v7.0&amp;width=" style="border: none; visibility: visible; width: 100%; height: 263px;" class=""></iframe>

                </div>
                <div class="sidebar w-full md:w-6/12 lg:w-4/12">
                    <ProfileFB />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped> 
.max-w-6xl {
    max-width: 90% !important;
}
</style>