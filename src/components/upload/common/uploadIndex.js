import fetch from 'utils/fetch';
export function upload(file,url) {
    return fetch({
        url:url,
        method:'post',
        data: file
    })
}