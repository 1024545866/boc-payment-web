import {
  asyncRouterMap,
  constantRouterMap
} from 'src/router'
import {
  getToken
} from 'utils/auth';
import { fetchMenuAll,getRouter } from 'api/authority';
const _import = require('router/_import_' + process.env.NODE_ENV);
/**
 * 通过authority判断是否与当前用户权限匹配
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  if (route.authority) {
    if (menus[route.authority] !== undefined) {
      return menus[route.authority];
    } else {
      return false;
    }
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, menus, menuDatas) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(menus, route)) {
      route.name = menuDatas[route.authority].title;
      route.icon = menuDatas[route.authority].icon;
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menus, menuDatas);
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    projectRouters: [],
    token : getToken()
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.projectRouters = routers
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({
      commit,state
    }, ) {
      return new Promise(resolve => {
        let token = getToken();
        getRouter(token).then(response => {
          var devRouterMap = [
            {
              path: '/main',
              component: _import('layout/Layout'),
              redirect: '/dashboard'
            }
          ];
          const routerDatas = [];
          for (let i = 0; i < response.length; i++) {
            response[i].component = _import(response[i].component);
            routerDatas.push(response[i]);
          }
          devRouterMap[0].children = routerDatas;
          commit('SET_ROUTERS', devRouterMap);
          resolve();
        });
      })
    }
  }
};

export default permission;
