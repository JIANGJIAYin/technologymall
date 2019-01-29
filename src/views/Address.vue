<template>
    <div>
      <nav-header></nav-header>
      <div class="address-container clearfix">
        <ul class="shipping-step clearfix">
          <li class="focus-list">确认地址</li>
          <li>提交订单</li>
          <li>付款结算</li>
          <li>订单信息</li>
        </ul>
        <div class="shipping shipping-address">
          <p class="title">选择配送地址</p>
          <div class="address-list">
            <ul class="clearfix">
              <li v-for="address in addressListFilter" :class="{'on-focus-li':address.isDefault}">
                <p class="user-name">{{address.userName}}</p>
                <p class="user-address">{{address.streetName}}</p>
                <p class="user-tel">{{address.tel}}</p>
                <p class="set-address">
                  <span class="set" @click="setAddress(address.addressId)" v-if="address.isDefault" :class="{'on-focus':address.isDefault}">默认地址</span>
                  <span class="set" @click="setAddress(address.addressId)" v-if="!address.isDefault" :class="{'on-focus':address.isDefault}">设为地址</span>
                  <i class="iconfont" @click="confirmDelAddress(address.addressId)">&#xe60d;</i>
                </p>
              </li>
              <li>
                <div class="add-address-item">
                  <i class="iconfont add-address">&#xe7db;</i>
                  <p>添加新地址</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="more-address"><a href="javascript:;" @click="extend" v-if="limit==3">more <i class="iconfont">&#xe658;</i></a></div>
        <div class="more-address"><a href="javascript:;" @click="extend" v-if="limit>3">fold <i class="iconfont">&#xe657;</i></a></div>
        <div class="shipping shipping-methods">
          <p class="title">配送方式</p>
          <div class="methods-list">
            <div class="info-wrap">
              <p>标准配送</p>
              <p class="free-info">免邮</p>
              <p class="last-info">一但下单成功，货物将在1-7个工作日内发出</p>
            </div>
          </div>
        </div>
        <!--<router-link to="/order" href="javascript:;" class="next-btn-link">-->
          <div class="next-btn" @click="next">NEXT</div>
        <!--</router-link>-->
      </div>
      <!--删除确认框-->
      <modal v-bind:isShowModal="isShowConfirmDelModal" @close="closeDelModal">
        <p slot="message">确认要删除此地址吗？</p>

        <div slot="btnGroup">
          <button class="submit-btn md-submit-btn" @click="delAddress">确认</button>
          <button class="submit-btn md-submit-btn gotoCart-btn" @click="isShowConfirmDelModal=false">关闭</button>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import './../assets/css/address.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import Modal from './../components/Modal'
  import axios from 'axios'
    export default {
        name: "Address",
        components: {
          NavHeader,
          NavFooter,
          Modal
        },
      data(){
        return {
          addressList: [],
          limit: 3,
          isShowConfirmDelModal:false,
          addressId: ''
        }
      },
      mounted(){
        var cart=document.getElementById('cart');
        cart.style.color="#00c3f5";
        this.init();
      },
      computed: {
        addressListFilter(){
          return this.addressList.slice(0,this.limit);
        }
      },
      methods: {
          init(){
            axios.get('/users/addressList').then((response)=>{
              let res=response.data;
              if (res.status == '0') {
                this.addressList=res.result;
              }
            });
          },
         extend(){
            if (this.addressListFilter.length < this.addressList.length) {
              this.limit=this.addressList.length;
            }else{
              this.limit=3;
            }
         },

        // 设置地址
        setAddress(addressId){
            axios.post('/users/setAddress',{
              addressId: addressId
            }).then((response)=>{
              let res=response.data;
              if (res.status == '0') {
                this.init();
              }
            });
        },

        // 关闭模态框
        closeDelModal(){
            this.isShowConfirmDelModal=false;
        },

        // 删除确认框
        confirmDelAddress(addressId){
            this.addressId=addressId;
            this.isShowConfirmDelModal=true;
        },

        // 删除地址
        delAddress(){
            axios.post('/users/delAddress',{
              addressId: this.addressId
            }).then((response)=>{
              let res=response.data;
              if (res.status == '0') {
                this.isShowConfirmDelModal=false;
                this.init();
              } else{
                this.isShowConfirmDelModal=true;
              }
            });
        },

        next(){
            let subAddressId='';
            this.addressList.forEach((item)=>{
              if (item.isDefault) {
                subAddressId=item.addressId;
              }
            });
            this.$router.push({
              path: '/order?addressId='+subAddressId
            });
        }
      }
    }
</script>

<style scoped>
  @media only screen and (max-width: 1310px){
    .address-list li>p.set-address>.set{
      width: 72%;
    }
  }

  @media only screen and (max-width: 414px) {
    .address-container{
      margin: 0 0 60px;
    }
    .address-container .shipping-step li{
      font-size: 14px;
    }
    .address-container .shipping-step li:after{
      width: 12px;
      height: 12px;
      bottom: -8px;
    }
    .address-list li>p.set-address>.set {
      width: 85%;
    }
    .address-container .shipping-address .address-list li {
      width: 35%;
    }
    .address-container .shipping-address .address-list li {
      margin: 0 18px 20px;
    }
    .address-container .shipping-methods .methods-list {
      width: 45%;
      margin-left: 18px;
    }
    .address-container .next-btn{
      margin-right: 18px;
      width: 80px;
      line-height: 28px;
      font-size: 14px;
    }
    .address-container .shipping p.title{
      margin-left: 18px;
    }
  }
  @media only screen and (max-width: 375px){
    .address-container .shipping-address .address-list li{
      float: none;
      width: auto;
      margin: 0 18px 20px;
    }
    .address-container .shipping-methods .methods-list{
      width: 66%;
    }
  }
  @media only screen and (max-width: 320px){
    .address-container .shipping-address .address-list li{
      margin: 0 10px 20px;
    }
    .address-list li>p.set-address>.set{
      width: 78%;
    }
    .shipping-step,
    .address-list li>p.set-address>.set,
    .set-address .iconfont,
    .address-list li>p.user-address,
    .user-tel{
      font-size: 12px;
    }
    .address-container .shipping-step li::after {
      width: 12px;
      height: 12px;
      bottom: -8px;
    }
    .address-container .shipping p.title,
    .info-wrap{
      font-size: 14px;
    }
  }
</style>
