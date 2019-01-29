<template>
    <div>
      <nav-header></nav-header>
      <div class="cart-list-wrap">
        <p class="page-title">M&nbsp;Y&nbsp;&nbsp;&nbsp;C&nbsp;A&nbsp;R&nbsp;T</p>
        <div class="cart-list">
          <div class="cart-list-top">
            <ul class="clearfix">
              <li class="cart-list-item cart-list-title">ITEMS</li>
              <li class="cart-list-item cart-list-title">PRICE</li>
              <li class="cart-list-item cart-list-title">QUANTITY</li>
              <li class="cart-list-item cart-list-title">SUBTOTAL</li>
              <li class="cart-list-item cart-list-title">EDIT</li>
            </ul>
          </div>
          <div class="cart-list-container">
            <div class="bottom-line" v-for="product in cartList">
              <ul class="clearfix">
                <li class="cart-list-item cart-goods">
                  <div class="span-wrap">
                    <div class="check-circle" :class="{'on-check':product.checked=='1'}" @click="updateCart('checked',product)"><i class="iconfont">&#xe70a;</i></div>
                    <div class="cart-list-img"><img :src="'/static/img/cartImg/'+product.productImage" :alt="product.productName"></div>
                    <div class="cart-goods-name">{{product.productName}}</div>
                  </div>
                </li>
                <li class="cart-list-item cart-list-introduction"><i class="iconfont">&#xe60e;</i>{{product.salePrice}}</li>
                <li class="cart-list-item cart-list-introduction">
                  <div class="cart-list-quantity">
                    <span class="btn"><i class="iconfont" @click="updateCart('reduce',product)">&#xe685;</i></span>
                    <span class="">&nbsp;{{product.productNum}}&nbsp;</span>
                    <span class="btn"><i class="iconfont" @click="updateCart('add',product)">&#xe684;</i></span>
                  </div>
                </li>
                <li class="cart-list-item cart-list-introduction cart-list-icon-price"><i class="iconfont">&#xe60e;</i>{{product.salePrice*product.productNum}}</li>
                <li class="cart-list-item cart-list-introduction"><i class="iconfont icon-trash" @click="delConfirm(product.productId)">&#xe60d;</i></li>
              </ul>
            </div>

          </div>
        </div>
        <div class="check-all-box clearfix">
          <div class="check-circle check-box-left" v-bind:class="{'on-check':checkAllFlag}" @click="selectAll"><i class="iconfont">&#xe70a;</i></div>
          <div class="check-box-right">
            <div class="subtotal">Item total: <i class="iconfont">&#xe60e;</i>{{totalPrice}}</div>
            <!--<router-link class="checkout-btn-link" to="/address" href="javascript:;">-->
              <div class="checkout-btn" v-bind:class="{'btn-dis':checkCount==0}" @click="next">CHECKOUT</div>
            <!--</router-link>-->
          </div>

        </div>
      </div>

      <!--删除确认框-->
      <modal v-bind:isShowModal="isShowConfirmDelModal" @close="closeDelModal">
        <p slot="message">确认要删除此商品吗？</p>

        <div slot="btnGroup">
          <button class="submit-btn md-submit-btn" @click="delCart">确认</button>
          <button class="submit-btn md-submit-btn gotoCart-btn" @click="isShowConfirmDelModal=false">关闭</button>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import './../assets/css/cart.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import Modal from './../components/Modal'
  import axios from 'axios'
    export default {
        name: "Cart",
        components: {
          NavHeader,
          NavFooter,
          Modal
        },
      data(){
          return {
            cartList: [],
            isShowConfirmDelModal: false,
            productId: ''
          }
      },
      mounted(){
          var cart=document.getElementById('cart');
          cart.style.color="#00c3f5";
          this.init();
      },
      computed: {
        checkAllFlag(){
          return this.cartList.length==this.checkCount;
        },
        checkCount(){
          let i=0;
          this.cartList.forEach((item)=>{
            if (item.checked == '1') {
              i++;
            }
          });
          return i;
        },
        totalPrice(){
          let allPrice=0;
          this.cartList.forEach((item)=>{
            if (item.checked == '1') {
              allPrice+=item.productNum*item.salePrice;
            }
          });
          return allPrice;
        }
      },
      methods: {
        // 购物车列表
        init(){
          axios.get('/users/cartList').then((response)=>{
            let res=response.data;
            if (res.status == '0') {
              this.cartList=res.result;
            }
          });
        },
        // 关闭删除模态框
        closeDelModal(){
          this.isShowConfirmDelModal=false;
        },
        // 删除商品
        delConfirm(productId){
          this.productId=productId;
          this.isShowConfirmDelModal=true;
        },
        delCart(){
          axios.post('/users/del',{
            productId: this.productId
          }).then((response)=>{
            let res=response.data;
            if (res.status == '0') {
              this.init();
              this.isShowConfirmDelModal=false;
            }
          });
        },

        // 修改购物车商品数量、选中状态
        updateCart(flag,product){
          if (flag=='reduce') {
            if (product.productNum <= 1) {
              return;
            }
            product.productNum--;
          } else if (flag == 'add') {
            product.productNum++;
          } else{
            product.checked= product.checked=='1'?'0':'1'
          }

          axios.post('/users/update',{
            productNum: product.productNum,
            productId: product.productId,
            checked: product.checked
          }).then((response)=>{
            let res=response.data;
            if (res.status == '0') {

            }
          });
        },

        // 选择所有商品
        selectAll(){
          var flag=!this.checkAllFlag;
          this.cartList.forEach((item)=>{
            item.checked=flag;
          });
          axios.post('/users/selectAll',{
            checkedAll: flag
          }).then((response)=>{
            let res=response.data;
            if (res.status == '0') {
            }
          })
        },
        next(){
          if (this.checkCount >= 1) {
            this.$router.push({
              path: '/address'
            });
          }
        }
      }
    }
</script>

<style scoped>
  @media only screen and (max-width: 768px){
    .checkout-btn {
      width: 130px;
    }
    .check-box-left {
      margin-left: 10px;
    }


    .cart-list-wrap {
      margin: 0 0px 30px;
    }
    .cart-list-wrap p.page-title {
      font-size: 16px;
      padding-left: 10px;
      line-height: 1.3em;
    }
    .cart-list-wrap .cart-list-item:first-child {
      width: 16%;
    }
    .cart-list-wrap .cart-list-item {
      width: 21%;
    }

    .check-circle {
      width: 12px;
      height: 12px;
      line-height: 12px;
    }
    .check-circle .iconfont{
      font-size: 12px !important;
    }
    .cart-list-container .cart-list-img {
      width: 40px;
      height: 40px;
      margin-left: 4px;
    }
    .cart-list-container .cart-list-img>img {
      width: 40px;
      height: 40px;
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
    .cart-list-wrap .cart-list-introduction {
      text-align: center;
      height: 80px;
      line-height: 80px;
    }
    .subtotal {
      margin: 10px 10px 0 0;
    }
    .checkout-btn {
      margin-right: 10px;
    }

      .cart-list-wrap .cart-list {
        font-size: 12px;
      }
      .cart-list-wrap .cart-list-icon-price>i, .cart-list-wrap .cart-list-icon-price{
        font-size: 14px;
      }
      i.iconfont.icon-trash{
        font-size: 14px;
      }
      .cart-list-quantity .iconfont{
        font-size: 12px;
      }
      .checkout-btn {
        width: 80px;
        line-height: 28px;
        font-size: 12px;
        padding: 3px 2px;
      }
      .subtotal{
        font-size: 14px;
      }
      .cart-list-wrap .cart-list-item:last-child {
        width: 10%;
        text-align: right;
        margin-left: 12px;
      }
      .cart-list-wrap .cart-list-item:nth-child(4){
        margin-left: 10px;
      }
      .cart-list-wrap .cart-list-item:first-child {
        padding-left: 8px;
      }
  }

</style>
