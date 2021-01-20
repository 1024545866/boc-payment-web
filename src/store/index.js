import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import constantsCtr from './modules/constantsCtr'; 
import dictDataCtr from './modules/dictDataCtr'; 
import getters from './getters';

Vue.use(Vuex);
const store = new Vuex.Store({
  count:1,
  modules: {
    app,
    user,
    permission,
    constantsCtr,
    dictDataCtr,
  },
  getters
});

export default store
