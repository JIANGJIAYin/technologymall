<template>
    <div>
      <nav-header></nav-header>
      <div class="address-container clearfix">
        <ul class="shipping-step clearfix">
          <li class="focus-list">确认地址</li>
          <li class="focus-list">提交订单</li>
          <li>付款结算</li>
          <li>订单信息</li>
        </ul>
      </div>
      <div class="cart-list-wrap">
        <p class="page-title">CHECK&nbsp;OUT</p>
        <div class="cart-list">
          <div class="cart-list-top">
            <ul class="clearfix">
              <li class="cart-list-item cart-list-title">ITEMS</li>
              <li class="cart-list-item cart-list-title">PRICE</li>
              <li class="cart-list-item cart-list-title">QUANTITY</li>
              <li class="cart-list-item cart-list-title">SUBTOTAL</li>
            </ul>
          </div>
          <div class="cart-list-container">
            <div class="bottom-line" v-for="order in orderList">
              <ul class="clearfix">
                <li class="cart-list-item cart-goods">
                  <div class="span-wrap">
                    <div class="cart-list-img"><img :src="'/static/img/cartImg/'+order.productImage" :alt="order.productName"></div>
                    <div class="cart-goods-name">{{order.productName}}</div>
                  </div>
                </li>
                <li class="cart-list-item cart-list-introduction">{{order.salePrice}}</li>
                <li class="cart-list-item cart-list-introduction">
                  <div class="cart-list-quantity">
                    <span class=""><i class="iconfont">&#xe619;</i>{{order.productNum}}</span>
                  </div>
                </li>
                <li class="cart-list-item cart-list-introduction cart-list-icon-price"><i class="iconfont">&#xe60e;</i>{{order.salePrice*order.productNum}}</li>
              </ul>
            </div>

          </div>
        </div>
        <div class="clearfix">
          <div class="order-total-price">
            <span class="font-color-gray">Order&nbsp;Total:&nbsp;&nbsp;</span><i class="iconfont">&#xe60e;</i><span>{{totalOrderPrice}}</span>
          </div>
        </div>
        <div class="check-all-box clearfix">
          <!--<router-link to="/orderSuccess" href="javascript:;" class="checkout-btn-link">-->
            <div class="checkout-btn" @click="createOrder">PROCEED TO PAYMENT</div>
          <!--</router-link>-->
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import axios from 'axios'
    export default {
        name: "OrderList",
        components: {
          NavHeader,
          NavFooter
        },
      data(){
        return {
          orderList: [],
          total: 0,
          orderId: ''
        }
      },
      mounted(){
        var cart=document.getElementById('cart');
        cart.style.color="#00c3f5";
        this.init();
      },
      computed: {
        totalOrderPrice(){
          let totalPrices=0;
          this.orderList.forEach((item)=>{
            totalPrices+=item.salePrice*item.productNum;
          });
          return totalPrices;
        }
      },
      methods: {
          init(){
            axios.get('/users/cartList').then((response)=>{
              let res=response.data;
              if (res.status == '0') {
                let cartList=res.result;
                cartList.forEach((item)=>{
                  if (item.checked == '1') {
                    this.orderList.push(item);
                  }
                });
              }
            });
          },

        // 创建订单号
        createOrder(){
            axios.post('/users/createOrder',{
              addressId: this.$route.query.addressId,
              orderPrices: this.totalOrderPrice
            }).then((response)=>{
              let res=response.data;
              if (res.status == '0') {
                this.orderId=res.result.orderId;
                this.$router.push({
                  path: '/orderSuccess?orderId='+this.orderId+'&orderTotal='+this.totalOrderPrice
                })
              }
            });

        }
      }
    }
</script>

<style scoped>
  .cart-list-wrap .page-title{
    letter-spacing: 3px;
    font-weight: 300;
  }
  .cart-list-wrap .cart-list-item{
    width: 16%;
  }
  .cart-list-wrap .cart-list-item:first-child{
    width: 52%;
  }
  .order-total-price{
    float: right;
    /*width: 30%;*/
    height: 40px;
    padding-top: 10px;
    line-height: 40px;
    text-align: right;
    color: #c00;
    font-size: 20px;
    font-weight: 700;
  }
  .order-total-price .font-color-gray{
    font-size: 16px;
    font-weight: 300;
    color: #666;
  }
  .check-all-box{
    margin-top: 0;
    padding: 10px 0;
    background: #f4f4f4;
  }
  .check-all-box .checkout-btn{
    margin-right: 0;
    width: 220px;
    font-size: 14px;
  }

  @media only screen and (max-width: 1024px){
    .cart-list-wrap{
      margin: 0 0 15px;
    }
    .cart-list-wrap .page-title{
      padding-left: 10px;
    }
    .order-total-price,
    .check-all-box .checkout-btn{
      margin-right: 10px;
    }
  }

  @media only screen and (max-width: 414px){
    .address-container {
      margin: 0 0 30px;
      font-size: 14px;
    }
    .address-container .shipping-step{
      margin-top: 10px;
    }
    .address-container .shipping-step li::after {
      width: 12px;
      height: 12px;
      bottom: -8px;
    }
    .cart-list-wrap .page-title,
    .cart-list-quantity .iconfont,
    .order-total-price .font-color-gray{
      font-size: 14px;
    }
    .cart-list-wrap .cart-list-top ul>li,
    .check-all-box .checkout-btn{
      font-size: 12px;
    }
    .cart-list-wrap .cart-list-item:first-child {
      width: 34%;
    }
    .cart-list-wrap .cart-list-item{
      width: 20%;
    }
    .cart-list-wrap .cart-list-item:nth-child(2){
      width: 16%;
    }
    .cart-list-wrap .cart-list-item:nth-child(3){
      width: 25%;
    }
    .cart-list-container .cart-goods .span-wrap{
      position: relative;
    }
    .cart-list-container .cart-goods-name {
      position: absolute;
      bottom: -20px;
      width: 100%;
      padding-left: 20px;
      overflow: visible;
    }
    .cart-list-container .cart-list-img,
    .cart-list-container .cart-list-img>img{
      width: 40px;
      height: 40px;
    }
    .cart-list-wrap .cart-list-introduction{
      height: 100px;
      line-height: 100px;
    }
    .cart-goods-name{
      font-size: 12px;
    }
    .cart-list-wrap .cart-list-icon-price>i, .cart-list-wrap .cart-list-icon-price,
    .order-total-price{
      font-size: 16px;
    }
    .cart-list-wrap .cart-list-container .bottom-line{
      height: 100px;
      padding: 5px 0;
    }
    .check-all-box .checkout-btn{

    }
  }
  @media only screen and (max-width: 320px){
    .check-all-box .checkout-btn {
      padding: 2px;
      width: 180px;
      margin-right: 0px;
    }

  }
</style>
