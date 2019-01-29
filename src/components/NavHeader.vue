<template>
  <div>
    <header class="layout-header clearfix">
      <div class="header-logo-wrap">
        <!--<img src="" alt="logo" class="header-logo">-->
        <router-link to="/" href="javascript:;" class="header-logo">TECHNOLOGY MALL</router-link>
      </div>
      <ul class="header-nav-wrap clearfix">
        <li class="header-nav-list"><router-link id="index" to="/" href="javascript:;">首页</router-link></li>
        <li class="header-nav-list"><router-link id="phone" to="/phone" href="javascript:;">手机</router-link></li>
        <li class="header-nav-list"><router-link id="earPhone" to="/earPhone" href="javascript:;">耳机</router-link></li>
        <li class="header-nav-list"><router-link id="camera" to="/camera" href="javascript:;">相机</router-link></li>
        <li class="header-nav-list"><router-link id="wearTech" to="/wearTech" href="javascript:;">智能设备</router-link></li>
        <li class="header-nav-list"><router-link id="noteBook" to="/noteBook" href="javascript:;">笔记本</router-link></li>
        <li class="header-login-wrap header-login-wrap-left">
          <span class="nick-name" v-text="nickName" v-if="nickName"></span>
          <a href="javascript:;" @click="overLayShow=true" v-if="!nickName">登录</a>
          <a href="javascript:;" v-if="nickName" @click="logout">退出</a>
        </li>
        <li class="header-login-wrap header-login-wrap-right">
          <!--<router-link to="/cart" href="javascript:;">&nbsp;&nbsp;-->
            <i id="cart" class="iconfont cart-pic" @click="enterCart">&#xe69a;</i>
          <!--</router-link>-->
        </li>
      </ul>
    </header>
    <!--登录遮罩-->
    <div class="overlay" v-show="overLayShow" @click="overLayShow=false"></div>
    <!--登录框-->
    <div class="login-overlay" v-show="overLayShow">
      <div class="login-in-wrap">
        <div class="login-in-first-line">
          <span class="login-in-title">Login in</span>
          <i class="iconfont close-btn" @click="overLayShow=false">&#xe629;</i>
        </div>
        <div class="login-in-second-line">
          <div class="login-input-wrap">
            <i class="iconfont login-input-icon">&#xe611;</i>
            <input class="login-input" placeholder="请输入'Jakey'" type="text" value="Jakey" v-model="userName">
          </div>
          <div class="login-input-wrap">
            <i class="iconfont login-input-icon">&#xe64e;</i>
            <input class="login-input" placeholder="请输入'123456'" type="password" value="123456" v-model="userPwd">
          </div>
        </div>
        <button class="submit-btn" @click="login()">登录</button>
      </div>
    </div>
    <!--未登录全局模态框，父组件-->
    <modal v-bind:isShowModal="isShowModal" @close="closeModal">
      <p slot="message">您目前未登录，请先登录！</p>

      <div slot="btnGroup">
        <button class="submit-btn" @click="isShowModal=false">关闭</button>
      </div>
    </modal>
  </div>
</template>

<script>
  import '../assets/css/modal.css'
  import Modal from './Modal'
  import axios from 'axios'
    export default {
        name: "NavHeader",
        components: {
          Modal
        },
        data(){
          return{
            userName: 'Jakey',
            userPwd: '123456',
            nickName: '',
            overLayShow: false,
            isShowModal: false
          }
        },
        mounted(){
          this.checkLogin();
        },
        methods: {
          // 登录
          login(){
            axios.post('/users/login',{
              userName: this.userName,
              userPwd: this.userPwd
            }).then((response)=>{
              let res=response.data;
              if (res.status == '0') {
                this.overLayShow=false;
                this.nickName=res.result;
                console.log(res.result);
              }else{
                this.overLayShow=true;
              }
            })
          },

          // 退出登录
          logout(){
            axios.post('/users/logout').then((response)=>{
              let res=response.data;
              if (res.status == '0') {
                this.nickName='';
              }
            });
          },

          // 检测登录
          checkLogin(){
            axios.post('/users/checkLogin').then((response)=>{
              let res=response.data;
              if (res.status == '0') {
                this.nickName=res.result;
              }
            });
          },

          closeModal(){
            this.isShowModal=false;
          },

          enterCart(){
            if (!this.nickName) {
              this.isShowModal=true;
            }else{
              this.$router.push({
                path: '/cart'
              })
            }
          }
        }
    }
</script>

