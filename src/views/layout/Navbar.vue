<template>
<div class="navbar" >
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
  <!-- 选项菜单 -->
  <div class="navbar-show">
    <ul>
      <li :class="{'choseBag' :isPageShow}">
        <router-link :to="page.path" class="menu_div">
          <span>{{page.name}}</span>
        </router-link>
      </li>
      <li v-for="(tag,index) in Array.from(visitedViews)" :key="tag.path" :class="{'choseBag' : tag.path==$route.path}">
        <router-link  :to="tag.path" class="menu_div" @click.native="chooseMenuShow(tag)">
          <span>{{tag.name}}</span>
           <i class="fa fa-close icon_style" @click.stop.prevent="closeViewTabs(tag,index)" ></i>
        </router-link>
      </li>
    </ul>
  </div>
  <el-dropdown class="closeTab" trigger="click">
    <span class="el-dropdown-link"> <i class="el-icon-caret-bottom"></i> </span>
    <el-dropdown-menu class="close-dropdown" slot="dropdown">
      <el-dropdown-item ><span style="display:block;" @click="closeCurTab">关闭当前</span></el-dropdown-item>
      <el-dropdown-item ><span style="display:block;" @click="closeOthTab">关闭其他</span></el-dropdown-item>
      <el-dropdown-item ><span style="display:block;" @click="closeAllTab">关闭所有</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import Hamburger from 'components/Hamburger';
import Screenfull from 'components/Screenfull';
import ErrorLog from 'components/ErrLog';
import errLogStore from 'store/errLog';
export default {
  components: {
    Hamburger,
    ErrorLog,
    Screenfull
  },
  data() {
    return {
      log: errLogStore.state.errLog,
      page : { name: '首页', path: '/dashboard' },
      nowPage : '/',
      isPageShow : true
    }
  },
  computed: { 
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ]),
    visitedViews() {
      return this.$store.state.app.visitedViews;
    }
  },
  props:{
    menuIndex : {
      type : Number,
      default : 0
    }
  },
  watch: {
    $route() {
      this.nowPage = this.$route.path;
      this.addViewTabs();
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    },
    closeViewTabs(view,index) { 
      //判断是否为当前界面，是则跳转到数组前一个页面
      if(!(this.$route.path == view.path)){
        this.$store.dispatch('delVisitedViews', view);
        return;
      }
      this.closeCurTab();
    },
    generateRoute() {
      var addData = {};
      if (this.$route.matched[this.$route.matched.length - 1].name) {
        addData.name = this.$route.matched[this.$route.matched.length - 1].name;
        addData.path = this.$route.matched[this.$route.matched.length - 1].path;
        addData.componentName = this.$route.matched[this.$route.matched.length - 1].meta.componentName;  
        addData.index = this.menuIndex;
        return addData;
      }
      this.$route.matched[0].path = '/';
      addData.name = this.$route.matched[0].name;
      addData.path = this.$route.matched[0].path;
      addData.componentName = this.$route.matched[this.$route.matched.length - 1].meta.componentName;      
      addData.index = this.menuIndex;
      
      return addData
    },
    addViewTabs() {
      if(this.$route.path == this.page.path){       
        this.isPageShow = true;
      }else{
        this.isPageShow = false;
        this.$store.dispatch('addVisitedViews', this.generateRoute());
      }  
    },
    closeAllTab(){
      this.$store.dispatch('delAllVisitedViews');
      // this.$store.dispatch('delAllCacheMenu');
      this.$emit("set-menuId",0);   
      this.$emit("set-active","");
      this.$router.push({ path : '/dashboard' });
    },
    closeCurTab(){
      var allShowMenu = this.visitedViews;
      var that = this;
      for(var i=0;i<allShowMenu.length;i++){
        if(allShowMenu[i].path == that.$route.path){
          this.$store.dispatch('delVisitedViews', allShowMenu[i]);  
          // this.$store.dispatch('delSingleCacheMenu', allShowMenu[i]);        
          if(i==0){
            this.$emit("set-menuId",0);   
            this.$emit("set-active","");
            that.$router.push({ path : '/dashboard' });
          }else{
            // this.chooseMenuShow(allShowMenu[i-1]);
            this.$emit("set-menuId",allShowMenu[i-1].index);   
            this.$emit("set-active",allShowMenu[i-1].path);
            that.$router.push({ path: allShowMenu[i-1].path });              
          }              
          break;
        }
      }
    },
    closeOthTab(){
      this.$store.dispatch('delOthVisitedViews',this.generateRoute()); 
    },
    chooseMenuShow(val){
      this.$emit("set-menuId",val.index);   
      this.$emit("set-active",val.path);
    }
  },
  created(){
    
  },
}
</script>

<style scoped lang="scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  $navbar-height : 35px;
  .router-link-exact-active > span{
    background: none; 
    color: #000000; 
  }
  .navbar {
    height: $navbar-height;
    line-height: $navbar-height;
    min-width: 998px;
    overflow: hidden;
    .hamburger-container {
        line-height: $navbar-height;
        height: $navbar-height;
        float: left;
        padding: 0 15px 0 20px;
    }
    .navbar-show{
      line-height: $navbar-height;
      height: $navbar-height;
      min-width: 900px;
      overflow: hidden;
      margin-right: 250px;
      ul{
        line-height: $navbar-height;
        height: $navbar-height;
        display: inline-block;
        padding: 0;
        margin: 0;
        min-width: 10000px;
        li{
          list-style:none;
          line-height: $navbar-height;
          height: $navbar-height;
          float: left;
          padding: 0 5px;
          color: #000000;
          text-align: center;
          font-size: 13px;
          cursor: pointer;
          border-top: 1px solid #F6F6F6;
          border-left: 1px solid #F6F6F6;
          border-right: 1px solid #F6F6F6;
          &:hover{
            background-color: #ffffff;
          }
        } 
        .menu_div{
          line-height: $navbar-height;
          height: $navbar-height;
          display: inline-block;
          min-width: 100px;
        } 
      }
      .icon_style{
          display: inline-block;
          line-height: $navbar-height;
          height: $navbar-height; 
          vertical-align: middle;
          font-size: 12px;
          padding-left: 5px;
          font-weight: 600;
          &:hover{
            color: #ff0000;
          }
        }
    }
    .choseBag{
      background-color: #ffffff;
      border-color: #000;
    }
    .closeTab{
      position: fixed;
      right: 0px;
      top: $top-height ;
      z-index: 10000;
      cursor: pointer;
      width: 30px;
      background: #F6F6F6;
    }
  }
  .close-dropdown{
    line-height: 20px;
    padding: 0 ;
    font-size: 12px;
    margin-top: 6px;
    li{
      font-size: 12px;
      line-height: 16px;
      
      border-top: 0;
      padding: 5px 15px;
      span{
        line-height: 20px;
      }
      &:hover{
        color: #5a5e66;
        background-color: #F6F6F6;
      }
    }
  }

</style>
