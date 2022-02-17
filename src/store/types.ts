/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-17 17:49:15
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/types.ts
 */
import { ILoginState } from './login/types'
import { IConditionType } from './main/device/condition/types'
import { ISystemState } from './main/system/types'
import { IBaseConfigType } from './main/base/config/types'

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
  system: ISystemState
  conditionModule: IConditionType
  baseConfigModule: IBaseConfigType
  companionModule: IConditionType
}

export type IStoreType = IRootState & IRootWithModule
