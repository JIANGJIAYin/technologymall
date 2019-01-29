<template>
    <div>
      <nav-header></nav-header>
      <div class="container-wrap">
        <section class="container clearfix">
          <aside class="filter-wrap">
            <div class="filter-container">
              <p class="filter-title"><i class="iconfont">&#xe627;</i><span class="text">相机价格</span></p>
              <div class="filter price-filter" v-on:click="priceFilter('All')" v-bind:class="{'on-click':priceChecked==='All'}">
                <i class="iconfont">&#xe60e;</i>All
              </div>
              <div v-for="(price,index) in priceList">
                <div class="filter price-filter" v-bind:class="{'on-click':priceChecked==index}" v-on:click="priceFilter(index)">
                  <i class="iconfont">&#xe60e;</i>{{price.gtPrice}}{{price.ltePrice}}
                </div>
              </div>
              <p class="filter-title"><i class="iconfont">&#xe623;</i><span class="text">相机类型</span></p>
              <div class="filter price-filter" v-on:click="typeFilter('All')" v-bind:class="{'on-click':typeChecked==='All'}">All</div>
              <div v-for="(type,index) in typeList">
                <div class="filter type-filter" v-bind:class="{'on-click':typeChecked==index}" v-on:click="typeFilter(index)">{{type}}</div>
              </div>
            </div>
          </aside>
          <article class="phone-list-wrap">
            <ul class="clearfix phones">
              <li class="phone-list" v-for="camera in cameraList">
                <img :src="'/static/img/cartImg/'+camera.productImage" :title="camera.productSummary">
                <p class="phone-name">{{camera.productName}}</p>
                <p class="phone-summary">{{camera.productSummary}}</p>
                <p class="phone-price">
                  <i class="iconfont">&#xe60e;</i>{{camera.salePrice}}
                  <i class="iconfont cart" @click="addCart(camera.productId)">&#xe69a;</i>
                </p>
              </li>
              <li class="empty-list" v-if="emptyShow">空空如也...看看其他的吧</li>
            </ul>
          </article>
        </section>

        <!--推荐商品-->
        <slide></slide>
      </div>
      <!--未登录全局模态框，父组件-->
      <modal v-bind:isShowModal="isShowModal" @close="closeModal">
        <p slot="message">您目前未登录，请先登录！</p>

        <div slot="btnGroup">
          <button class="submit-btn" @click="isShowModal=false">关闭</button>
        </div>
      </modal>
      <!--加入购物车成功全局模态框，父组件-->
      <modal v-bind:isShowModal="isShowSucAddModal" @close="closeSucAddModal">
        <p slot="message">成功加入购物车！</p>

        <div slot="btnGroup">
          <button class="submit-btn md-submit-btn" @click="isShowSucAddModal=false">继续购物</button>
          <router-link to="/cart">
            <button class="submit-btn md-submit-btn gotoCart-btn">前往购物车</button>
          </router-link>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import NavHeader from './../../components/NavHeader'
  import NavFooter from './../../components/NavFooter'
  import Modal from './../../components/Modal'
  import Slide from './../../components/Slide'
  import axios from 'axios'
    export default {
        name: "Camera",
        components: {
          NavHeader,
          NavFooter,
          Modal,
          Slide
        },
      data(){
          return {
            cameraList: [],
            priceList: [
              {
                gtPrice: '0 - ',
                ltePrice: '4000'
              },
              {
                gtPrice: '4000 - ',
                ltePrice: '8000'
              },
              {
                gtPrice: '8000 - ',
                ltePrice: '15000'
              },
              {
                gtPrice: '15000 - ',
                ltePrice: '20000'
              },
              {
                gtPrice: '20000以上'
              }
            ],
            typeList: ['佳能','尼康','索尼'],
            priceChecked: 'All',
            typeChecked: 'All',
            emptyShow: false,
            isShowModal: false,
            isShowSucAddModal: false
          }
      },
      mounted(){
        var camera=document.getElementById('camera');
        camera.style.color='#00c3f5';
        this.cameraShow();
      },
      methods: {
          cameraShow(){
            axios.get('/cameras/list',{
              params:{
                priceLevel: this.priceChecked,
                typeLevel: this.typeChecked
              }
            }).then((response)=>{
              let res=response.data;
              if (res.status == '0') {
                this.cameraList=res.result;
                if (this.cameraList == '') {
                  this.emptyShow=true;
                }else{
                  this.emptyShow=false;
                }
              }
            })
          },
        //价格过滤
          priceFilter(index){
            this.priceChecked=index;
            this.cameraShow();
          },
        //类型过滤
          typeFilter(index){
            this.typeChecked=index;
            this.cameraShow();
          },
        //加入购物车
          addCart(productId){
          axios.post('/cameras/addCart',{
            productId:productId
          }).then((response)=>{
            let res=response.data;
            if (res.status == '0') {
              this.isShowSucAddModal=true;
            }else{
              this.isShowModal=true;
            }
          });
        },
        // 关闭模态框
        closeModal(){
            this.isShowModal=false;
        },
        // 关闭加入购物车成功模态框
        closeSucAddModal(){
            this.isShowSucAddModal=false;
        }
      }
    }
</script>

<style>
  @media only screen and (max-width: 1415px){
    .container .phone-list-wrap .phone-list .phone-price>i, .container .phone-list-wrap .phone-list .phone-price,
    .container .phone-list-wrap .phone-list .phone-name{
      font-size: 14px;
    }
    .container .phone-list-wrap .phone-list .phone-summary{
      font-size: 12px;
    }
    .container .phone-list-wrap .phone-list{
      width: 203px;
      height: 330px;
    }
    .container .phone-list-wrap .phone-list>img{
      width: 160px;
      height: 160px;
    }
    .container .phone-list-wrap .phone-list .phone-price i.cart{
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 1283px){
    .container .phone-list-wrap{
      display: flex;
      justify-content: space-around;
    }
    .container .phone-list-wrap .phone-list {
      width: auto;
      height: auto;
      padding-bottom: 10px;
    }
    .container .phone-list-wrap .phone-list>img{
      padding: 10px;
    }
  }
  @media only screen and (max-width: 768px){
    .container-wrap {
      margin: 0 20px;
    }
    .container .filter-wrap {
      width: 22%;
    }
    .container .phone-list-wrap{
      width: 78%;
    }
    .container .phone-list-wrap .phone-list {
      width: 245px;
      height: 391px;
      margin-left: 20px;
    }
    .container .phone-list-wrap .phone-list>img {
      width: 210px;
      height: 210px;
    }
    .container .phone-list-wrap .phone-list .phone-name {
      font-size: 16px;
    }
    .container .phone-list-wrap .phone-list .phone-summary{
      font-size: 12px;
    }
    .container .phone-list-wrap .phone-list .phone-price {
      font-size: 20px;
    }
  }

  @media only screen and (max-width: 414px){
    .container-wrap {
      margin: 0 10px;
    }
    .container .filter-wrap {
      width: 38%;
    }
    .container .phone-list-wrap{
      width: 62%;
    }
    .container .phone-list-wrap .phone-list {
      width: 100%;
      height: 338px;
      margin-left: 10px;
    }
    .container .phone-list-wrap .phone-list {
      width: 100%;
      height: 338px;
      margin-left: 10px;
    }
    .container .phone-list-wrap .phone-list .phone-name{
      font-size: 12px;
    }
    .container .phone-list-wrap .phone-list>img {
      width: 186px;
      height: 186px;
    }


  }

  @media only screen and (max-width: 320px){
    .container-wrap {
      margin: 0 5px;
    }
    .container .filter-wrap .filter{
      font-size: 12px;
    }
    .container .filter-wrap .filter-title .text{
      font-size: 14px;
    }

    .container .filter-wrap {
      width: 43%;
    }
    .container .phone-list-wrap{
      width: 56%;
    }
    .container .phone-list-wrap .phone-list {
      width: 100%;
      height: 170px;
      margin-left: 5px;
    }
    .container .phone-list-wrap .phone-list>img {
      width: 50px;
      height: 50px;
    }
    .container .phone-list-wrap .phone-list .phone-price {
      font-size: 16px;
    }
    .container .phone-list-wrap .phone-list .phone-price i.cart{
      font-size: 18px;
    }
    .container .phone-list-wrap .phone-list .phone-name {
      font-size: 12px;
      font-weight: 400;
    }
    .container-wrap {
      padding: 0  0 0 20px;
    }
  }
</style>
