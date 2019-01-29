<template>
    <div>
      <nav-header></nav-header>
      <div class="address-container clearfix">
        <ul class="shipping-step clearfix">
          <li class="focus-list">确认地址</li>
          <li class="focus-list">提交订单</li>
          <li class="focus-list">付款结算</li>
          <li class="focus-list">订单信息</li>
        </ul>
      </div>
      <div class="container-wrap">
        <div class="container">
          <p class="big-title">Congratulations!</p>
          <p class="small-title">Your order is under processing!</p>
        </div>
        <div class="order-confirmation" style="color: #00c3f5;">
          <span>Order&nbsp;ID：{{orderId}}</span><span>Order&nbsp;total：<i class="iconfont">&#xe60e;</i>{{orderTotal}}</span>
        </div>
        <div class="backwards-btn-wrap">
          <router-link to="/cart" href="javascript:;">
            <button class="backwards-btn">返回购物车</button>
          </router-link>
          <router-link to="/" href="javascript:;">
            <button class="backwards-btn">返回首页</button>
          </router-link>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import './../assets/css/orderSuccess.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
    export default {
        name: "OrderSuccess",
        components: {
          NavHeader,
          NavFooter
        },
      data(){
        return {
          orderId: '',
          orderTotal: 0
        }
      },
      mounted(){
        var cart=document.getElementById('cart');
        cart.style.color="#00c3f5";
        this.init();
      },
      methods: {
          init(){
            this.orderId=this.$route.query.orderId;
            this.orderTotal=this.$route.query.orderTotal;
          }
      }
    }
</script>

<style scoped>
  @media only screen and (max-width: 414px){
    .address-container{
      margin: 0 0 60px;
    }
    .container-wrap{
      margin: 0;
    }
    .container-wrap .order-confirmation span{
      display: block;
    }
    .container-wrap .order-confirmation span:first-child{
      margin-bottom: 20px;
    }
    .container-wrap .backwards-btn-wrap .backwards-btn{
      width: 80px;
      line-height: 20px;
      font-size: 12px;
    }
    .address-container .shipping-step li,
    .container-wrap .container .small-title,
    .container-wrap .order-confirmation{
      font-size: 12px;
    }
    .address-container .shipping-step li:after{
      width: 12px;
      height: 12px;
      bottom: -8px;
    }
    .container-wrap .container .big-title{
      font-size: 14px;
    }
  }
</style>
