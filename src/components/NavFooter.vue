<template>
    <footer class="layout-footer">
      <div class="footer-wrap">
        <div class="footer-float-wrap top-footer-float-wrap clearfix">
          <div class="footer-float-left footer-float-left-wrap">
            <ul class="clearfix display-center">
              <li class="footer-float-left left-list">
                <div class="icon-wrap">
                  <i class="iconfont">&#xece8;</i>
                </div>
                <p class="icon-text">满500免运费</p>
              </li>
              <li class="footer-float-left left-list">
                <div class="icon-wrap">
                  <i class="iconfont">&#xeed6;</i>
                </div>
                <p class="icon-text">次日送达</p>
              </li>
              <li class="footer-float-left left-list">
                <div class="icon-wrap">
                  <i class="iconfont">&#xe60f;</i>
                </div>
                <p class="icon-text">7天无理由退货</p>
              </li>
              <li class="footer-float-left left-list">
                <div class="icon-wrap">
                  <i class="iconfont">&#xe653;</i>
                </div>
                <p class="icon-text">15天换货保障</p>
              </li>
              <li class="footer-float-left left-list">
                <div class="icon-wrap">
                  <i class="iconfont">&#xe65b;</i>
                </div>
                <p class="icon-text">1年免费保修</p>
              </li>
              <li class="footer-float-left left-list">
                <div class="icon-wrap">
                  <i class="iconfont">&#xe600;</i>
                </div>
                <p class="icon-text">上门快修</p>
              </li>
            </ul>
          </div>
          <div class="footer-float-right">
            <div class="open-time">周一至周日 7:30-24:00</div>
            <div class="tel-number">020-668-8333</div>
            <div class="inline-serve">在线客服</div>
          </div>
        </div>
        <div class="footer-float-wrap clearfix">
          <div class="footer-float-left below-list">
            <ul class="clearfix">
              <li class="footer-float-left more-info">了解我们</li>
              <li class="footer-float-left more-info">加入我们</li>
              <li class="footer-float-left more-info">联系我们</li>
              <li class="footer-float-left more-info">论坛社区</li>
              <li class="footer-float-left more-info">旗舰店</li>
              <li class="footer-float-left more-info">问题反馈</li>
            </ul>
            <div class="extra-info">
              <p>@www.technologymall.cn:3232 | 2019 | 网站内容不存在商业性 只作个人项目演示 | @图片来源 小米商城 魅族商城 华为商城 京东商城 佳能官网</p>
            </div>
          </div>
        </div>
      </div>

    </footer>
</template>

<script>
    export default {
        name: "NavFooter"
    }
</script>

<style scoped>
  .layout-footer .footer-wrap{
    margin: 0 100px;
  }
  .top-footer-float-wrap{
    border-bottom: 1px solid rgba(0,0,0,.05);
  }
  .footer-float-left>ul{
    width: 100%;
    display: flex;
  }
  .footer-float-left>ul.display-center{
    height: 120px;

    align-items: center;
  }
  .footer-float-left{
    float: left;
    width: 78%;
    color: #666;
    font-weight: 300;
  }
  .footer-float-left>ul .left-list{
    width: 15%;
    text-align: center;
    margin-right: 1%;
  }
  .footer-float-left>ul .left-list .iconfont{
    font-size: 30px;
  }
  .footer-float-left>ul .left-list .icon-text{
    padding-top: 5px;
    font-size: 12px;
  }
  .footer-float-right{
    width: 22%;
    height: 120px;
    float: right;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 300;
  }
  .footer-float-right .open-time{
    font-size: 12px;
    color: #666;
  }
  .footer-float-right .tel-number{
    font-size: 24px;
    color: #00c3f5;
    padding: 3px 0;
  }
  .footer-float-right .inline-serve{
    background: #00c3f5;
    color: #fff;
    font-size: 14px;
    letter-spacing: 1px;
    width: 90px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin-left: 182px;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
  }
  .footer-wrap .footer-float-wrap .more-info{
    width: 180px;
    font-size: 12px;
    text-align: center;
    border-right: 1px solid #ccc;
    margin-top: 20px;

  }
  .footer-wrap .footer-float-wrap .more-info:hover{
    color: #00c3f5;
    cursor: pointer;
  }
  .footer-wrap .footer-float-wrap .more-info:last-child{
    border-right: 0px;
  }
  .footer-float-wrap .below-list{
    padding: 20px 0 30px;
    float: none;
    margin: 0 auto;
  }
  .footer-float-wrap .below-list .extra-info{
    font-size: 12px;
    text-align: center;
    margin-top: 30px;
  }

  /*适配移动端、iPad、iPad Pro*/
  @media only screen and (max-width: 1024px){

    .footer-float-right .tel-number{
      font-size: 14px;
    }
    .footer-float-right .inline-serve{
      font-size: 12px;
    }
    .footer-float-right .open-time,
    .footer-float-right .tel-number,
    .footer-float-right .inline-serve{
      margin: 0 auto;
    }
    .footer-float-left>ul .left-list{
      margin-left: 15px;
    }
    .layout-footer .footer-wrap{
      margin: 0;
    }
    .footer-float-wrap .below-list{
      padding: 10px 0 30px;
      float: none;
      margin: 0 auto;
    }
    .footer-float-wrap .below-list .extra-info{
      margin-top: 20px;
    }
    .layout-footer{
      height: auto;
    }
  }

  @media only screen and (max-width: 414px){
    .footer-float-left,
    .footer-float-right{
      float: none;
    }
    .footer-float-left{
      width: 100%;
    }
    .footer-float-left-wrap,
    .footer-float-right{
      border-bottom: 1px solid rgba(0,0,0,.05);
    }
    .footer-float-wrap{
      border-bottom: 0px;
    }
    .footer-float-right{
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      flex-direction: row;
      height: 77px;
    }
    .footer-float-left>ul .left-list .iconfont{
      font-size: 14px;
    }
    .footer-float-left>ul .left-list .icon-text{
      font-size: 12px;
    }
    .footer-float-right .tel-number {
      font-size: 12px;
    }
    .footer-float-right .inline-serve{
      width: 70px;
      height: 30px;
      line-height: 30px;
    }
    .footer-float-wrap .below-list .extra-info{
      padding: 0 10px;
      line-height: 2em;
    }
    .footer-float-wrap .below-list{
      padding-bottom: 15px;
    }
  }
</style>
