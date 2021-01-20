import fetch from 'utils/fetch';
export function getGridTabelById(gridId) {
    return fetch({
      url:"api/admin/sys/refer/"+gridId,
      method: 'get',
    });
}
export function getGridTableByUrl(urlStr,query) {
  return fetch({
    url:urlStr,
    method: 'get',
    params:query
  });
}