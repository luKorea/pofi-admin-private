/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-24 10:00:04
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/types.ts
 */
import { ILoginState } from './login/types'
import { IConditionType } from './main/device/condition/types'
import { IBaseConfigType } from './main/base/config/types'
import { IRouterState } from './main/system/router/types'
import { IBaseHeadType } from './main/base/head/types'
import { IBaseAreaType } from './main/base/area/types'
import { IBaseLanguageType } from './main/base/language/types'
import { IBaseFusingType } from './main/base/fusing/types'
import { IPayType } from './main/finance/pay/types'
import { ITradeTRecordType } from './main/finance/tradeRecord/types'
import { IFinancePurseType } from './main/finance/purse/types'
import { IUserImeiType } from './main/device/imei/types'
import { IUserOperationType } from './main/userOperation/types'
import { IRoleState } from './main/system/role/types'
import { IPermissionState } from './main/system/permission/types'
import { IUserState } from './main/system/user/types'
import { IResourceDataType } from './main/resource/data/types'
import { IResourceKeywordType } from './main/resource/keyword/types'
import { IGoodsRechargeType } from './main/goods/recharge/types'
import { IGoodsFunctionType } from './main/goods/function/types'
import { IGoodsItemType } from './main/goods/good/types'
import { IGoodsDescriptionType } from './main/goods/description/types'
import { IResourceClassifyType } from './main/resource/classify/types'
import { IResourceSeriesType } from './main/resource/series/types'
import { IResourceTopicType } from './main/resource/topic/types'
import { IHelpFunctionTypeType } from './main/help/functionType/types'
import { IHelpCompanionType } from './main/help/companion/types'
import { IHelpFunctionType } from './main/help/function/types'
import { IHelpQuestionType } from './main/help/question/types'
import { IHelpQuestionTypeType } from './main/help/questionType/types'
import { IUserModifyType } from './main/audit/userModify/types'
import { IFeedbackType } from './main/feedback/types'
import { IHelpAccountType } from './main/help/account/types'
import { IBaseJumpType } from './main/base/jump/types'
import { IResourceCenterType } from './main/base/center/types'
import { IAadvertisementBannerType } from './main/ad/banner/types'

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
  // 基础管理
  baseConfigModule: IBaseConfigType
  baseHeadModule: IBaseHeadType
  baseAreaModule: IBaseAreaType
  baseLanguageModule: IBaseLanguageType
  baseFusingModule: IBaseFusingType
  baseJumpModule: IBaseJumpType
  // 问题反馈
  feedbackModule: IFeedbackType
  // 审核管理
  auditUserModifyModule: IUserModifyType
  // 商品中心
  goodsRechargeModule: IGoodsRechargeType
  goodsFunctionModule: IGoodsFunctionType
  goodsItemModule: IGoodsItemType
  goodsDescriptionModule: IGoodsDescriptionType
  // 帮助中心
  helpCompanionModule: IHelpCompanionType
  helpFunctionTypeModule: IHelpFunctionTypeType
  helpFunctionModule: IHelpFunctionType
  helpQuestionModule: IHelpQuestionType
  helpQuestionTypeModule: IHelpQuestionTypeType
  helpAccountModule: IHelpAccountType
  // 设备管理
  userImeiModule: IUserImeiType
  conditionModule: IConditionType
  userOperationModule: IUserOperationType
  // 资源库
  resourceDataModule: IResourceDataType
  resourceKeywordModule: IResourceKeywordType
  resourceClassifyModule: IResourceClassifyType
  resourceSeriesModule: IResourceSeriesType
  resourceTopicModule: IResourceTopicType
  resourceCenterModule: IResourceCenterType
  // 系统管理
  oaRouterModule: IRouterState
  oaUserModule: IUserState
  oaPermissionModule: IPermissionState
  oaRoleModule: IRoleState
  // 财务管理
  tradeRecordModule: ITradeTRecordType
  payModule: IPayType
  purseModule: IFinancePurseType
  // 广告管理
  advertisementBannerModule: IAadvertisementBannerType
}

export type IStoreType = IRootState & IRootWithModule
