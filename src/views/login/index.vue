<template>
  <div class="container">

    <!--页头-->
    <div class="header">
      <div>
        <a href="http://www.boc.cn/"><img src="~static/images/login_images/logo.jpg" alt=""></a>
        <span class="fup">中银支付</span>
      </div>
    </div>

    <div class="center-container">

      <!--中间内容-->
      <div class="overlapAll">

          <!--banner图-->
          <div class="banner">
            <div class="carousel">
                <img src="~static/images/login_images/1.jpg" alt="">
                <img src="~static/images/login_images/2.jpg" alt="">
                <img src="~static/images/login_images/3.jpg" alt="">
                <img src="~static/images/login_images/1.jpg" alt="">
            </div>
          </div>

          <div class="transition" style="float: right;position: relative;width: 300px; height: 500px;">

              <!--动态加载组件-->
            <transition  name="el-zoom-in-center" mode="out-in">
              <component :is="view" @reversalPage="changeView"></component>
            </transition>

          </div>
      </div>

    </div>

    <!--页脚-->
    <div class="footer">
      <div>
        版权所有:粤ICP备17075384号
      </div>
    </div>
  </div>
</template>

<script>
import socialSign from './socialsignin';
import register from './register';
import psdFind from './psdFind';
import entry from './entry'

export default {
  name: 'login',
  data(){
    return{
      view:'entry'
    }
  },
  components: {
    socialSign,
    register,
    psdFind,
    entry
    },
  mounted() {
    this.carousel();
  },
  methods:{
    //子组件传值data
    changeView(data){
      this.view = data
    },
    carousel() {
      var carousel = document.querySelector('.carousel');
      if(carousel !== null){
        var i = 0;
        var offsetLeft = -605;
        setInterval(()=>{
        var imgCount = document.querySelectorAll('.carousel img');
        i++;
        carousel.style.left= offsetLeft*i + 'px';
        carousel.style.transition= 'left 0.5s linear';
        if(i === imgCount.length) {
            i=0;
            carousel.style.left= -4+ 'px';
            carousel.style.transition= 'left 0s linear';
          };
        },2000);
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .container{
    height: 100vh;
    @include clearfix;

    //中间banner图表单部分
    .center-container {
      position: absolute;
      top: 20%;
      width: 100%;
      .overlapAll {
        width: 65%;
        margin: 0 auto;
        min-width: 1000px;
        @include clearfix;
        .banner {
          float: left;
          overflow: hidden;
          width: 595px;
          height: 360px;
          position: relative;
          div{
            width: 10000px;
            position: absolute;
            left: 0px;
          }
        }
      }
    }
    //页头
    .header{
      position: absolute;
      width: 100%;
      z-index: 20;
      padding: 5px 0;
      background: #fffad12b;
      border-bottom: 1px solid #f09c1657;
      div{
        height: 60px;
        line-height: 60px;
        width: 80%;
        margin: 0 auto;
        a{
          display: inline-block;
        }
        .fup{
          display: inline-block;
          font-size: 20px;
          vertical-align: top;
          border-left: 1px solid #fa9900;
          color: #140c0a;
          padding-left: 5px;
        }
      }
    }
    //页脚
    .footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #fffad12b;
      border-top: 1px solid #f09c1657;
      div{
        height: 70px;
        line-height: 70px;
        text-align: center;
      }
    }
  }

</style>
