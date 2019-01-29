<template>
    <div>
      <nav-header></nav-header>
      <div class="wrap">
        <index-slide></index-slide>
        <div class="goods-show-wrap">
          <div class="goods-show phone-show">
            <p>手机</p>
            <router-link to="/phone" href="javascript:;">
              <div class="img-wrap" v-lazy-container="{ selector: 'img' }">
                <img data-src="/static/img/banner/手机海报 (1).png">
              </div>
            </router-link>
          </div>
          <div class="goods-show earPhone-show">
            <p>耳机</p>
            <router-link to="/earPhone" href="javascript:;">
              <div class="img-wrap" v-lazy-container="{ selector: 'img' }">
                <img data-src="/static/img/banner/耳机海报 (1).png">
              </div>
            </router-link>
          </div>
          <div class="goods-show camera-show">
            <p>相机</p>
            <router-link to="/camera" href="javascript:;">
              <div class="img-wrap" v-lazy-container="{ selector: 'img' }">
                <img data-src="/static/img/banner/相机1 (1).png">
              </div>
            </router-link>
          </div>
          <div class="goods-show wearTech-show">
            <p>智能设备</p>
            <router-link to="/wearTech" href="javascript:;">
              <div class="img-wrap" v-lazy-container="{ selector: 'img' }">
                <img data-src="/static/img/banner/穿戴设备海报.png">
              </div>
            </router-link>
          </div>
          <div class="goods-show noteBook-show">
            <p>笔记本</p>
            <router-link to="/noteBook" href="javascript:;">
              <div class="img-wrap" v-lazy-container="{ selector: 'img' }">
                <img data-src="/static/img/banner/笔记本海报.jpg">
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import './../assets/css/layout.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import IndexSlide from './../components/IndexSlide'
    export default {
        name: "Index",
        components: {
          NavHeader,
          NavFooter,
          IndexSlide
        },
      data(){
          return {

          }
      },
      mounted(){
          var index=document.getElementById('index');
          index.style.color="#00c3f5";
      }
    }
</script>

<style scoped>
  .goods-show-wrap .img-wrap{
    width: 100%;
    height: 600px;
    -webkit-background-size: cover;
    background-size: cover;
  }
  .wrap{
    margin: 0 5% 30px;
  }
  .goods-show-wrap{
    margin-top: 32px;
  }
  .goods-show-wrap .goods-show{
    margin-bottom: 50px;
  }
  .goods-show-wrap .goods-show:last-child{
    margin-bottom: 0;
  }
  .goods-show-wrap .goods-show>p{
    color: #666;
    font-size: 26px;
    height: 40px;
    letter-spacing: 10px;
    font-weight: 300;
    line-height: 40px;
    text-align: center;
    /*padding-bottom: 8px;*/
  }
  .goods-show-wrap .goods-show .img-wrap>img{
    display: block;
    width: 100%;
    height: 600px;
    -webkit-background-size: cover;
    background-size: cover;
  }
  @media only screen and (max-width: 1024px){
    .wrap{
      margin: 0 0 30px;
    }
    .goods-show-wrap .goods-show .img-wrap>img{
      height: 468px;
    }
    .goods-show-wrap .goods-show>p{
      padding-bottom: 5px;
    }
  }

  @media only screen and (max-width: 414px){
    .goods-show-wrap{
        margin-top: 10px;
    }
    .goods-show-wrap .goods-show .img-wrap>img{
      height: 188px;
    }
    .goods-show-wrap .goods-show>p[data-v-6626d874] {
      font-size: 16px;
    }
    .goods-show-wrap .goods-show{
      margin-bottom: 30px;
    }
  }
</style>
