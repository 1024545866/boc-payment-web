import fetch from 'utils/fetch';

//获取路由表
export function getRouter(token){
    return fetch({
        url : '/api/admin/user/front/route?token='+token,
        methods : 'get',
    });
} 

export function fetchMenuAll() {
    return fetch({
        url: '/api/admin/menu/list',
        method: 'get'
    });
}

export function getInfo(token) {
    return fetch({
        url: '/api/admin/user/front/info',
        method: 'get',
        params: { token }
    });
}

export function getMenus(token) {
    return fetch({
      url: '/api/admin/user/front/menus',
      method: 'get',
      params: { token }
    });
}
export function getDictSelectUrl(token) {
    return fetch({
      url:'api/admin/sys/dict/bigObject',
      method: 'get',
      params: token 
    });
}