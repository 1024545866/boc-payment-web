<template>
  <div class="left-menuShow">
	<template v-for="item in routes.children">
	  
	  <template  v-if='item.children&&item.children.length>0'>
		  <el-submenu :key="item.id" :index="checkItem(item)" popper-class="subClass">
			  <template slot="title">
          <i class="fa" :class=item.icon></i>
          <span>{{item.title}}</span>
        </template>
			  <el-menu-item-group>
			  	<leftbar-item :routes="item"></leftbar-item>					
			  </el-menu-item-group>  
		  </el-submenu>
	  </template>

    <template v-else>
			<el-menu-item :index="checkItem(item)" :key="item.id" class="menu-show">
				<i class="fa" :class=item.icon></i>
				<span slot="title">{{item.title}}
					<!-- <router-link :to="item.href" class="menu-guide">
						<span>{{item.title}}</span>
					</router-link> -->
				</span>
			</el-menu-item>
	  </template>

	</template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'LeftbarItem',
    props: {
      routes: {
        type: Object
	  }
	},
	watch :{
	  routes : function(val){
		this.routes = val;
	  }
	},
	data(){
	  return {
			
	  }
	},
	computed: {

    },
	methods:{
			checkItem(item){
				if(item.component!=null&&item.component!=""&&item.component!=" "&&item.component!=undefined){
							var path = "/404";
							try {
								require('@/views/' + item.component + '.vue');
							} catch (error) {
								item.href = path;
							}
				}
				return item.href;
			}
	}
  }
</script>

<style scoped lang="scss">
  @import "src/styles/mixin.scss";
  $icon-width : 40px;
  $menu-height : 40px;
  .left-menuShow{

	.menu-show{
		font-size: 13px;
		// text-align: center;
	  .menu-clear{
		  display: inline-block;
		  width: 100%;
		  height: 100%;
		  padding-left: 3px;
		  a{
			  display: inline-block;
			  width: 100%;
			  height: 100%;
		  }
	  }
	}
	.faStyle{
	  color: #ffffff;
	}
  }
  .fa{
	  color: #ffffff;
  }

	
</style>

