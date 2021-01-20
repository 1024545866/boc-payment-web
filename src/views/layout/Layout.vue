<template>
  <div class="app-wrapper">
    <menubar @get-menuId="getMenuIndex" :tabIndex="tabIndex"  id="top-menu"></menubar>
    <leftbar id="left-menu" :menuIndex="menuIndex" :defaultActive="defaultActive"></leftbar>
    <navbar id="nav-bar" :menuIndex="menuIndex" @set-menuId="setMenuIndex" @set-active="setDefaultActive"></navbar>
    <div id="main-container">    
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import Navbar from './Navbar';      //已打开的菜单栏
  import Menubar from './Menubar';    //顶部菜单栏
  import AppMain from './AppMain';    //中间内容区域
  import Leftbar from './Leftbar';    //左侧菜单

  export default {
    name: 'layout',
    components: {
      Navbar,
      Menubar,
      AppMain,
      Leftbar
    },
    data(){
      return {
        menuIndex: 0,
        styWidth: 200,
        tabIndex: 0,
        defaultActive: ""
      }
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar.opened;
      }
    },
    methods:{
      getMenuIndex(params){
        this.menuIndex = params;
        this.tabIndex = params;
      },
      setMenuIndex(param){
        this.tabIndex = param;
      },
      setDefaultActive(param){
        // console.log(param);
        this.defaultActive = param;
      }
    },
    watch: {
      // sidebar: function(val){
      //   if(val){
      //     this.styWidth = 200;
      //   }else{
      //     this.styWidth = 63;
      //   }
      // }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    transition: width 2s;
    transition: left 2s;
    transition: margin-left 2s;
    #main-container {
      min-height: 100%;
      transition: margin-left 0.28s ease-out;
      margin-left: $left-width;
      padding-top: $minContentPadding;
      z-index: -1;
      height: 100vh;
    }
    #top-menu{
      position: fixed;
      height: $top-height;
      top: 0;
      left: 0;
      width: 100%;
      background-color: $top-bagColor;
      z-index: 100;
      min-width:$min-width;
    }
    #left-menu{
      position: fixed;
      left: 0;
      top: $top-height;
      height: 100%;
      width: $left-width;
      background-color: #315780;
      z-index: 100;
    }
    #nav-bar{
      position: fixed;
      left:$left-width;
      top: $top-height;
      width: 100%;
      height: 35px;
      // border-bottom: 0.5px solid #42485b;
      z-index: 100;
      background-color: #F6F6F6;
      min-width:$min-width;
    }
  }
</style>
