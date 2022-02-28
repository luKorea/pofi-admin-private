import { IPayType } from './main/finance/pay/types'
import { ITradeTRecordType } from './main/finance/tradeRecord/types'
import { IUserImeiType } from './main/device/imei/types'
import { IRoleState } from './main/system/role/types'
import { IPermissionState } from './main/system/permission/types'
import { IUserState } from './main/system/user/types'
/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 11:32:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/types.ts
 */
import { ILoginState } from './login/types'
import { IConditionType } from './main/device/condition/types'
import { IBaseConfigType } from './main/base/config/types'
import { IRouterState } from './main/system/router/types'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
  tagsList: any[]
}

export interface IRootWithModule {
  login: ILoginState
  // 配置管理
  baseConfigModule: IBaseConfigType
  // 帮助中心
  companionModule: IConditionType
  // 设备管理
  userImeiModule: IUserImeiType
  conditionModule: IConditionType
  // 系统管理
  oaRouterModule: IRouterState
  oaUserModule: IUserState
  oaPermissionModule: IPermissionState
  oaRoleModule: IRoleState
  // 财务管理
  tradeRecordModule: ITradeTRecordType
  payModule: IPayType
}

export type IStoreType = IRootState & IRootWithModule
