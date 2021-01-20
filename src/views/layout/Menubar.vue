<template>
  <div>
    <el-row>
      <el-col>
        <div id="top-logo">中银支付</div>       
        <ul  id="top-menu-style" >                               
          <li :class="{ menuHoverStyle: menuHover[index]}"  v-for="(item,index) in permissionMenus[0].children" :key="item.id"   @click="selectIndex(index)" v-if="index < 6"><i class="fa" :class=item.icon></i>{{item.title}}</li>             
          <li id="smartMenu" :class="{ menuHoverStyle: menuHover[7]}" v-if="permissionMenus[0].children.length > 6">
            <el-dropdown trigger="click" placement="bottom" @command="enterMenu">
              <span class="el-dropdown-link">
                <i class="fa fa-ellipsis-v smartMenu_icon" ></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="user_center" show-timeout="0" style="top:50px;">
                <el-dropdown-item v-for="(item,index) in permissionMenus[0].children" :key="item.id"    v-if="index > 5" :command="index"><span style="display:block;" >{{item.title}}</span></el-dropdown-item>          
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
        
        <div class="right-icon">
            <!-- 用户头像 -->
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link">
                <i class="fa fa-user-o user_icon" ></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="user_center" show-timeout="0">
                <el-dropdown-item ><span style="display:block;" >个人中心</span></el-dropdown-item>
                <el-dropdown-item ><span style="display:block;" @click="logout">退出登陆</span></el-dropdown-item>                
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 放大按钮 -->
            <screenfull class='screenfull'></screenfull>
        </div>    
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex';
  import Screenfull from 'components/Screenfull';
  import Leftbar from './Leftbar';
  export default {
    data() {
      return {
        menuIndex : 0,
        menuHover:[],
      }
    },
    props:{
      tabIndex : {
        type : Number,
        default : 0
      }
    },
    watch:{
      tabIndex(val){
        this.selectIndex(val);
      }
    },
    created(){
      for(let i=0;i<this.permissionMenus[0].children.length;i++){
        this.menuHover.push(false);
      }
      this.menuHover[0] = true;
    },
    components: { Leftbar,Screenfull },
    computed: {
      ...mapGetters([
        'sidebar',
        'permissionMenus'
      ])
    },
    methods:{
      selectIndex(params){
        this.$emit("get-menuId",parseInt(params));    
         let changeHover = [];
         for(let i=0;i<this.permissionMenus[0].children.length;i++){
          changeHover.push(false);
        }
        changeHover[params] = true;
        this.menuHover = changeHover;
      },
      logout(){
        this.$store.dispatch('FedLogOut')
        .then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      },
      enterMenu(params){
        this.$emit("get-menuId",parseInt(params));
        let changeHover = [];
         for(let i=0;i<this.permissionMenus[0].children.length;i++){
          changeHover.push(false);
        }
        changeHover[7] = true;
        this.menuHover = changeHover;
      }
    }
  }

</script>

<style scoped lang="scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .menuHoverStyle{
    background-color: $top-bagHover;
  }
  //顶部导航样式
  #top-menu{
    #top-logo{
      display: inline-block;
      float: left;
      width: $left-width;
      color: #fff;
      height: $top-height;
      line-height: $top-height;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      // border-right: 1px solid $top-bagHover;
    }

    ul{
      display: inline-block;
      padding: 0;
      margin: 0;
      li{
        list-style:none;
        float: left;
        height:  $top-height;
        line-height: $top-height;
        font-weight: 550;
        font-size: 13px;
        min-width: 120px;
        color: #fff;
        text-align: center;
        padding: 0 5px;
        cursor: pointer;
        // border-right: 1px solid $top-bagHover;
        &:hover{
          background-color: $top-bagHover;
        }
        i{
          padding: 5px;
        }
      }
      #smartMenu{
        min-width: 60px;
        span{
          display: inline-block;
          width: 50px;
          height: 60px;
          .smartMenu_icon{
            width: 50px;
            color: #fff;
          }
        }
      }
    }

    .moreMenu{
      display: inline-block;
      ul{
        position: absolute;
        top: $top-height;
        left: -60px;
        // width: 120px;
        li{
          width: 120px;
          height: $top-height;
          background-color: #ffffff;
          color: #000000;
          z-index: 10000;
        }
      }
    }

    .right-icon{
      float: right;
      height: $top-height;
      line-height: $top-height;
      // padding: 0 20px;
        .user_icon{
          display: inline-block;
          font-size: 20px;
          color: #fff;
          padding: 0 10px;
          vertical-align: middle;
          cursor: pointer;
        }
    } 
  }
  .user_center{
    line-height: 20px;
    padding: 0 ;
    font-size: 13px;
    margin-top: 6px;
    li{
      font-size: 13px;
      line-height: 16px;
      margin-top:0;
      border-top: 0;
      padding: 10px 20px;
      font-weight: bold;
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
