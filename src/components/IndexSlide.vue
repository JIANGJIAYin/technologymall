<template>
  <section class="spacial-list-wrap clearfix">
    <article class="spacial-container-wrap">
      <div class="spacial-goods-list">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-slide-wrap">
          <!-- slides -->
          <swiper-slide>
            <div class="slide-img-wrap">
              <img class="slide-img" src="/static/img/cartImg/99m2.jpg" alt="99m2"/>
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="slide-img-wrap">
              <img class="slide-img" src="/static/img/cartImg/mi8青春版.jpg" alt="mi8青春版">
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="slide-img-wrap">
              <img class="slide-img" src="/static/img/cartImg/魅族ep52蓝牙耳机.jpg" alt="魅族ep52蓝牙耳机">
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="slide-img-wrap">
              <img class="slide-img" src="/static/img/cartImg/车载空气净化器滤芯.png" alt="车载空气净化器滤芯">
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="slide-img-wrap">
              <img class="slide-img" src="/static/img/cartImg/小米蓝牙耳机Air.jpg" alt="小米蓝牙耳机Air">
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="slide-img-wrap">
              <img class="slide-img" src="/static/img/cartImg/魅族15.jpg" alt="魅族15">
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="slide-img-wrap">
              <img class="slide-img" src="/static/img/cartImg/eos6dmark2.jpg" alt="eos6dmark2">
            </div>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
    </article>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "Slide",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          loop: true,
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows : true
          }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      console.log('this is current swiper instance object', this.swiper);
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style scoped>
  .spacial-container-wrap{
    width: 100%;
  }
  .spacial-goods-list{
    margin: 10px 0 24px;
  }
  .swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
    text-align: center;
  }

  .slide-img-wrap{
    width: 280px;
    height: 280px;
  }
  .slide-img-wrap .slide-img{
    width: 280px;
    height: 280px;
  }

  @media only screen and (max-width: 414px){
    .swiper-slide {
      width: 120px;
      height: 120px;
    }
    .slide-img-wrap,
    .slide-img-wrap .slide-img{
      width: 100px;
      height: 100px;
    }
    .spacial-goods-list{
      height: 120px;
    }
  }
</style>
