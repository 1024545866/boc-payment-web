import fetch from 'utils/fetch';
export function getDictSelectData() {
    return fetch({
      url:'api/admin/sys/dict/bigObject',
      method: 'get',
    });
}
