/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-19 11:28:26
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
import { IWareHouseType } from './main/finance/warehouse/types'
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
import { IResourceHomeSeriesType } from './main/resource/index/series/types'
import { IHelpFunctionTypeType } from './main/help/functionType/types'
import { IHelpCompanionType } from './main/help/companion/types'
import { IHelpFunctionType } from './main/help/function/types'
import { IHelpQuestionType } from './main/help/question/types'
import { IHelpQuestionTypeType } from './main/help/questionType/types'
import { IUserModifyType } from './main/audit/userModify/types'
import { IFeedbackType } from './main/feedback/types'
import { IHelpAccountType } from './main/help/account/types'
import { IBaseJumpType } from './main/base/jump/types'
import { IResourceCenterType } from './main/resource/center/types'
import { IAadvertisementBannerType } from './main/ad/banner/types'
import { IBaseVersionType } from './main/base/version/types'
import { IResourceHomeType } from './main/resource/index/types'
import { IUserExperienceType } from './main/contentCenter/userExperience/types'
import { IPainterTopicType } from './main/contentCenter/painterWiki/painterTopic/types'
import { IUserCenterOrganizationType } from './main/userCenter/organization/types'
import { IPainterLibraryType } from './main/contentCenter/painterWiki/painterLibrary/types'
import { ICreativeInspirationType } from './main/contentCenter/creativeInspiration/types'

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
  // ????????????
  baseConfigModule: IBaseConfigType
  baseHeadModule: IBaseHeadType
  baseAreaModule: IBaseAreaType
  baseLanguageModule: IBaseLanguageType
  baseFusingModule: IBaseFusingType
  baseJumpModule: IBaseJumpType
  baseVersionModule: IBaseVersionType
  // ????????????
  feedbackModule: IFeedbackType
  // ????????????
  auditUserModifyModule: IUserModifyType
  // ????????????
  goodsRechargeModule: IGoodsRechargeType
  goodsFunctionModule: IGoodsFunctionType
  goodsItemModule: IGoodsItemType
  goodsDescriptionModule: IGoodsDescriptionType
  // ????????????
  helpCompanionModule: IHelpCompanionType
  helpFunctionTypeModule: IHelpFunctionTypeType
  helpFunctionModule: IHelpFunctionType
  helpQuestionModule: IHelpQuestionType
  helpQuestionTypeModule: IHelpQuestionTypeType
  helpAccountModule: IHelpAccountType
  // ????????????
  userImeiModule: IUserImeiType
  conditionModule: IConditionType
  userOperationModule: IUserOperationType
  userCenterOrganizationModule: IUserCenterOrganizationType
  // ?????????
  resourceDataModule: IResourceDataType
  resourceKeywordModule: IResourceKeywordType
  resourceClassifyModule: IResourceClassifyType
  resourceSeriesModule: IResourceSeriesType
  resourceTopicModule: IResourceTopicType
  resourceCenterModule: IResourceCenterType
  resourceHomeModule: IResourceHomeType
  resourceIndexSeriesModule: IResourceHomeSeriesType
  // ????????????
  oaRouterModule: IRouterState
  oaUserModule: IUserState
  oaPermissionModule: IPermissionState
  oaRoleModule: IRoleState
  // ????????????
  tradeRecordModule: ITradeTRecordType
  payModule: IPayType
  purseModule: IFinancePurseType
  wareHouseModule: IWareHouseType
  // ????????????
  advertisementBannerModule: IAadvertisementBannerType
  // ????????????
  userExperienceModule: IUserExperienceType
  creativeInspirationModule: ICreativeInspirationType
  painterLibraryModule: IPainterLibraryType
  painterTopicModule: IPainterTopicType
}

export type IStoreType = IRootState & IRootWithModule
