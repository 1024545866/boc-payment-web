// module.exports = file => require('@/views/' + file + '.vue');
module.exports = file => _import(file);
function _import(url){
    try {
        return require('@/views/' + url + '.vue');
    } catch (error) {
        return require('@/views/error/404.vue')
    }
}
