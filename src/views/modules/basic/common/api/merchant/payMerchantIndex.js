import fetch from 'utils/fetch';
export function addPayMerchant(obj) {
    return fetch({
      url: '/api/admin/basic/merchant/payMerchant',
      method: 'post',
      data: obj
    });
}
export function getPayMerchantExcel() {
    return fetch({
      url: '/api/admin/basic/merchant/payMerchant/excel',
      method: 'get',
    });
}
export function putPayMerchantExcel(obj) {
    return fetch({
      url: '/zuul/api/admin/basic/merchant/payMerchant/excel',
      method: 'put',
      data: obj
    });
}
export function getPayMerchantExcelTemplate() {
    return fetch({
      url: '/api/admin/basic/merchant/payMerchant/excel',
      method: 'get',
    });
}
export function deleteAllPayMerchant(ids) {
    return fetch({
      url: '/api/admin/basic/merchant/payMerchant/list',
      method: 'delete',
      data:ids
    });
}
export function listAllPayMerchant() {
    return fetch({
      url: '/api/admin/basic/merchant/payMerchant/list',
      method: 'get',
    });
}
export function getPayMerchantTable(query) {
    return fetch({
      url: '/api/admin/basic/merchant/payMerchant/pageList',
      method: 'get',
      params:query
    });
}
export function delPayMerchant(id) {
    return fetch({
      url: '/api/admin/basic/merchant/payMerchant/'+id,
      method: 'delete',
    });
}
export function getPayMerchant(id) {
    return fetch({
      url: '/api/admin/basic/merchant/payMerchant/'+id,
      method: 'get',
    });
}
export function putPayMerchant(id,obj) {
    return fetch({
      url: '/api/admin/basic/merchant/payMerchant/'+id,
      method: 'put',
      data:obj
    });
}