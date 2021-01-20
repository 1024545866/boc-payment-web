import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      isCollapse:!+Cookies.get('isCollapse')
    },
    theme: 'default',
    livenewsChannels: Cookies.get('livenewsChannels') || '[]',
    visitedViews: [],
    cacheMenu: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
        Cookies.set('isCollapse',1)
      } else {
        Cookies.set('sidebarStatus', 0);
        Cookies.set('isCollapse',0)
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.isCollapse = !state.sidebar.isCollapse;
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, path: view.path, index: view.index,componentName: view.componentName})
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1);
      let cacheIndex;
      for (const [i, v] of state.cacheMenu.entries()) {
        if (v === view.componentName) {
          cacheIndex = i;
          break;
        }
      }
      state.cacheMenu.splice(cacheIndex, 1);
    },   
    DEL_ALL_VISITED_VIEWS: state => {
      state.visitedViews = [];
      state.cacheMenu = [];
    },
    DEL_OTH_VISITED_VIEWS : (state,view) =>{
      let cacheMenu = [];
      let visitedViews = [];
      visitedViews.push({ name: view.name, path: view.path, index: view.index,componentName: view.componentName});
      cacheMenu.push(view.componentName);
      state.visitedViews = visitedViews;      
      state.cacheMenu = cacheMenu;
    },
    ADD_CACHE_MENU: (state,view) => {
      var componentName = view.componentName;
      if (state.cacheMenu.some(v => v === componentName)) return;
      state.cacheMenu.push(componentName);
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews: ({ commit }, view) => {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews: ({ commit }, view) => {
      commit('DEL_VISITED_VIEWS', view)
    },
    delAllVisitedViews:({commit})=>{
      commit('DEL_ALL_VISITED_VIEWS')
    },
    delOthVisitedViews:({commit},view)=>{
      commit('DEL_OTH_VISITED_VIEWS',view)
    },
    addCacheMenu: ({commit}, view)=>{
      commit('ADD_CACHE_MENU',view);
    }
  }
};
export default app;
