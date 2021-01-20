const getters = {
  sidebar: state => state.app.sidebar,
  cacheMenu: state => state.app.cacheMenu,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  elements: state => state.user.elements,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  projectRouters: state => state.permission.projectRouters,
  permissionMenus: state => state.user.permissionMenus,
  showButton: state => state.constantsCtr.showButton,
  dictData: state => state.dictDataCtr.dictData
};
export default getters
