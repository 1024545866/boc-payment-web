import fetch from 'utils/fetch';
export function getTreeDataByUrl(urlStr) {
    return fetch({
      url:urlStr,
      method: 'get',
    });
}

export function getSelectedData(roleId) {
    return fetch({
      url:"api/admin/sys/role/"+roleId+"/menus",
      method: 'get'
    });
}