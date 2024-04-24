import {IRoute,Role} from 'utils/types'

// TODO 依据权限的不同 动态的更改路由内容
export function checkActive(role: Role, route: IRoute): boolean {
  if (route.deactiveRole.includes(role)) {
    return false
  }
  return true
}

const routes: IRoute[] = [
  {
    path: '/app', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
    deactiveRole: [],
    default: true
  },
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
    deactiveRole: []
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    path: '',
    routes: [
      // submenu
      {
        path: '/app/login',
        name: 'Login',
        deactiveRole: []
      },
      {
        path: '/app/404',
        name: '404',
        deactiveRole: []
      },
      {
        path: '/app/blank',
        name: 'Blank',
        deactiveRole: []
      },
    ],
    deactiveRole: []
  }, {
    icon: 'FormsIcon',
    name: '客户管理',
    path: '/app/customers',
    deactiveRole: []
  }
]

export default routes
