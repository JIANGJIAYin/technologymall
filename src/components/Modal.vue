<template>
    <div>
      <!--子组件-->
      <!--全局模态框遮罩-->
      <div class="overlay" v-show="isShowModal" @click="closeModal"></div>
      <!--全局模态框-->
      <div class="login-overlay" v-show="isShowModal">
        <div class="login-in-wrap">
          <div class="login-in-first-line">
            <i class="iconfont close-btn" @click="closeModal">&#xe629;</i>
          </div>
          <div class="login-in-second-line md-message" >
            <slot name="message"></slot>
          </div>
          <div class="md-btnGroup">
            <slot name="btnGroup"></slot>
          </div>

        </div>
      </div>
    </div>
</template>
<style>
  .md-message{
    text-align: center;
    font-size: 18px;
    font-weight: 300;
    margin-top: 80px;
  }
  .md-btnGroup{
    margin-top: 20px;
  }
</style>
<script>
  import './../assets/css/modal.css'
    export default {
        props: ['isShowModal'],
        name: "Modal",
        methods: {
          closeModal(){
            this.$emit('close');
          }
        }
    }
</script>

