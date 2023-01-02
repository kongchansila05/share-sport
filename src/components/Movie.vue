<script>
const axios = require("axios");
  export default {
    name: 'MoVie',
    data() {
      return {
        livestream:[]
      }
    },
    methods: {
    },
    mounted(){
    // =====the LiveScore=========
      axios.get("https://share-sport.2m-sport.com/api/livestream").then((res)=>{
        this.livestream = res.data.data;
          console.log(res.data.data);
      }).catch(function (error) {
          console.error(error);
      });
    // =====the-end=========

    }

  };


</script>

<template id="body">
<!-- <div class="max-w-6xl mx-auto lg:py-5 md:py-5">  -->
  <div class="container-sm">
  <div class="flex flex-col md:flex-row lg:flex-row justify-between lg:gap-x-2 md:gap-x-2">
    <div style="padding-bottom:56.25%;position:relative;margin:0 auto;"><iframe src="https://evt.live/membertsd5859/kongchansila/embedBare?autoplay=true" style="width:100%;height:100%;position:absolute;left:0px;top:0px;" width="100%" height="100%" allowfullscreen allow="autoplay" allowtransparency="true" frameborder="0"></iframe></div>
  </div>
</div>
</template>
<style scoped>
.px-7{
    padding-right: 0.5rem!important;
    padding-left: 0.5rem!important;
    padding-bottom: 0.5rem!important;
    padding-top: 0.5rem!important;
}
.to-blue-300{
    --tw-gradient-to: #6f4b98;
}

</style>