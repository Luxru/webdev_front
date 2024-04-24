// create context

export interface IUser {
  uid: number
  token: string
  role: Role
}

// 依据routes是否含有子数组来判断是否是多级菜单
export interface IRoute {
  path: string
  icon?: string
  name: string
  default?: boolean
  routes?: IRoute[]
  deactiveRole: Role[]
}


`
// TODO 依据权限的不同 动态的更改路由内容`
enum Role {
  SystemAdmin,
  GeneralManager,
  SalesRepresentative,
  SalesManager,
  SalesDirector,
  Accountant,
  FinancialSpecialist,
  FinancialManager,
}

export {Role}