import fetch from 'utils/fetch';
export function addPayCostRule(obj) {
    return fetch({
      url: '/api/admin/basic/payentrule/payCostRule',
      method: 'post',
      data: obj
    });
}
export function getPayCostRuleExcel() {
    return fetch({
      url: '/api/admin/basic/payentrule/payCostRule/excel',
      method: 'get',
    });
}
export function putPayCostRuleExcel(obj) {
    return fetch({
      url: '/zuul/api/admin/basic/payentrule/payCostRule/excel',
      method: 'put',
      data: obj
    });
}
export function getPayCostRuleExcelTemplate() {
    return fetch({
      url: '/api/admin/basic/payentrule/payCostRule/excel',
      method: 'get',
    });
}
export function deleteAllPayCostRule(ids) {
    return fetch({
      url: '/api/admin/basic/payentrule/payCostRule/list',
      method: 'delete',
      data:ids
    });
}
export function listAllPayCostRule() {
    return fetch({
      url: '/api/admin/basic/payentrule/payCostRule/list',
      method: 'get',
    });
}
export function getPayCostRuleTable(query) {
    return fetch({
      url: '/api/admin/basic/payentrule/payCostRule/pageList',
      method: 'get',
      params:query
    });
}
export function delPayCostRule(id) {
    return fetch({
      url: '/api/admin/basic/payentrule/payCostRule/'+id,
      method: 'delete',
    });
}
export function getPayCostRule(id) {
    return fetch({
      url: '/api/admin/basic/payentrule/payCostRule/'+id,
      method: 'get',
    });
}
export function putPayCostRule(id,obj) {
    return fetch({
      url: '/api/admin/basic/payentrule/payCostRule/'+id,
      method: 'put',
      data:obj
    });
}