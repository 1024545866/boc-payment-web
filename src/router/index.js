import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

//路由表中的白名单
var whitelistRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('error/404'),
    hidden: true
  },

  {
    path: '/401',
    component: _import('error/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
];


// //开发过程中临时添加的路由表
// var devRouterMap = [
//   {
//     path: '/sys',
//     component: Layout,
//     redirect: 'sys/menu/menu',
//     icon: 'form',
//     noDropdown: true,
//      children: [
//       {
//         path: '/sys/menu/menu',
//         component: _import('modules/system/menuManage/index'),
//         name: '菜单管理'
//       },
//       {
//         path: '/sys/user/index',
//         component: _import('modules/system/userManage/index'),
//         name: '用户管理'
//       },
//       {
//         path:'/sys/office/',
//         component:_import('modules/system/officeManage/index'),
//         name:'部门管理'
//       },
//       {
//         path:'/sys/corp/',
//         component:_import('modules/system/corpManage/index'),
//         name:'机构管理'
//       },
//       {
//         path:'/sys/role/',
//         component:_import('modules/system/roleManage/index'),
//         name:'角色信息'
//       },
//       {
//         path:'/sys/area/',
//         component:_import('modules/system/areaManage/index'),
//         name:'区域管理'
//       },
//       {
//         path:'/sys/dict/',
//         component:_import('modules/system/dictManage/index'),
//         name:'字典管理'
//       },
//       {
//         path:'/sys/refer/',
//         component:_import('modules/system/referManage/index'),
//         name:'参照管理'
//       },
//       {
//         path:'/sys/tree/',
//         component:_import('modules/system/treeManage/index'),
//         name:'树表管理'
//       }, 
//       {
//         path:'/sys/api/',
//         component:_import('modules/system/apiManage/index'),
//         name:'api管理'
//       },  
//       {
//         path:'/test/onetomany/main/testMain',
//         component:_import('modules/test/testMain/index'),
//         name:'主子测试表'
//       },
//       {
//         path:'/test/testDict',
//         component:_import('modules/test/testDict/index'),
//         name:'测试字典'
//       },
//       {
//         path:'/test/testGoods',
//         component:_import('modules/test/testGoods/index'),
//         name:'商品'
//       },
//       {
//         path:'/test/testGoodsSingle',
//         component:_import('modules/test/testGoodsSingle/index'),
//         name:'商品信息'
//       },
//       {
//         path:'/test/testGoodsType',
//         component:_import('modules/test/testGoodsType/index'),
//         name:'商品类型'
//       },
//       {
//         path:'/gen/genTable',
//         component:_import('modules/code_generation/genTable/index'),
//         name:'表单配置'
//       },
//       {
//         path:'/genSchemen/index',
//         component:_import('modules/code_generation/genSchemen/index'),
//         name:'生成方案'
//       },
//       {
//         path:'/dev/index',
//         component:_import('modules/dev_module/dev'),
//         name:'测试页面'
//       },
//       {
//         path:'/test/goods/ms',
//         component:_import('modules/test/goods/ms/index'),
//         name:'测试树主子表'
//       },
//       {
//         path:'/test/goods/single',
//         component:_import('modules/test/goods/single/index'),
//         name:'测试树主表'
//       },
//       {
//         path:'/test/goods/type',
//         component:_import('modules/test/goods/type/index'),
//         name:'测试树表'
//       },
//       {
//         path:'/test/ms',
//         component:_import('modules/test/ms/index'),
//         name:'测试主子表'
//       },
//       {
//         path:'/test/single',
//         component:_import('modules/test/single/index'),
//         name:'测试单表'
//       },
//       {
//         path:'/test/tree',
//         component:_import('modules/test/tree/index'),
//         name:'测试树选择器'
//       },
//       {
//         path:'/test/grid',
//         component:_import('modules/test/grid/index'),
//         name:'测试grid选择器'
//       }
//  ]
// },
//   {
//     path : '/dev/page',
//     component : _import('modules/dev_module/dev'),
//     hidden : true
//   }
// ];

var result = [];

// if(process.env.NODE_ENV == 'development'){
//   result = whitelistRouterMap.concat(devRouterMap);
// }else{
  result = whitelistRouterMap;
// }
export const constantRouterMap = result;
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [];