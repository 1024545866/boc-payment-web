<template>  
    <div>
      <leftbar-item :routes="showMenu" ></leftbar-item>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import LeftbarItem from './LeftbarItem';
  import Hamburger from 'components/Hamburger';
  export default {
    components: { LeftbarItem,Hamburger },
    computed: {
      ...mapGetters([
        'sidebar',
        'permissionMenus'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      },
      //计算要左侧要渲染的导航栏菜单
      showMenu :{
        get : function(){
          return this.permissionMenus[0].children[this.menuIndex];
        }    
      }
    },
    created(){
      
    },
    props:{
      menuIndex : {
        type : Number,
        default : 0
      }
    },
    watch:{
      menuIndex(val){
        
      }
    },
    data(){
      return {
        isActive : false,
        showMenuList : {},
        menuData : {}
      }
    },
    methods:{
      showIcon(){
        this.isActive = !this.isActive;
      },
    }
  }
</script>

<style scoped lang="scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  $icon-width : 40px;
  $menu-height : 40px;
  .first-menu{
    background-color: $top-bagColor;
    border-top: 1px solid $top-bagHover; 
    .icon-div{
      display: inline-block;
      width: $left-width;
      line-height: $menu-height;
      height:  $menu-height; 
      vertical-align: middle;
      .icon_style{
        display: inline-block;
        width: $left-width;
        line-height: $menu-height;
        height:  $menu-height; 
        color: #ffffff;
        font-size: 25px;
        vertical-align: middle;
        text-align: center;
        transform: rotate(0deg);
        transition: 0.5s;
        transform-origin: 50% 50%;
      }
      .is-active{
        transform: rotate(-90deg);
      }
    }
    
  }
</style>
<template> 
    <div>
      <el-menu mode="vertical"  class="menu_style" :router="true" :default-active="defaultLater"
          background-color="#315780" menu-trigger="click" text-color="#ffffff" active-text-color="#ffd04b">
        <leftbar-item :routes="showMenu" ></leftbar-item>
      </el-menu>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import LeftbarItem from './LeftbarItem';
  import Hamburger from 'components/Hamburger';
  export default {
    components: { LeftbarItem,Hamburger },
    computed: {
      ...mapGetters([
        'sidebar',
        'permissionMenus'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      },
      //计算要左侧要渲染的导航栏菜单
      showMenu :{
        get : function(){
          return this.permissionMenus[0].children[this.menuIndex];
        }    
      }
    },
    created(){
      
    },
    props:{
      menuIndex : {
        type : Number,
        default : 0
      },
      defaultActive : {
        type : String,
        default : ""
      }
    },
    watch:{
      menuIndex(val){
      },
      defaultActive(val){
        setTimeout(() => {
          this.defaultLater = this.defaultActive;
        }, 100);
      }
    },
    data(){
      return {
        isActive : false,
        showMenuList : {},
        menuData : {},
        defaultLater: ""
      }
    },
    methods:{
      showIcon(){
        this.isActive = !this.isActive;
      },
    },
    updated(){
      
    }
  }
</script>

<style scoped lang="scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  $icon-width : 40px;
  $menu-height : 40px;
  .menu_style{
    height: 100%;
  }
</style>
