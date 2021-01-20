// module.exports = file  => ()=> import('@/views/' + file + '.vue');
module.exports = file  => () => _import(file);

function _import(url){
    try {
        return import('@/views/' + url + '.vue');
    } catch (error) {
        return import('@/views/error/404.vue')
    }
}