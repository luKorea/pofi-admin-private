/*
 * @Author: korealu
 * @Date: 2022-02-11 10:36:34
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-21 10:14:38
 * @Description: 下拉列表数据统一获取
 * @FilePath: /pofi-admin/src/service/common/index.ts
 */
import hyRequest from '../index'
enum commonAPI {
  country = '/cms/area/getRecordsAll', // 获取国家列表
  router = '/cms/router/getPlainRouter', // 获取路由列表
  group = '/cms/config/getGroup', // 获取分组 （超级管理员使用）
  classification = '/cms/config/getType', // 获取分类 （超级管理员使用）
  language = '/cms/language/getLanguage', // 获取多语言
  routers = '/cms/router/routers', // 获取所有角色路由列表
  role = '/cms/role/getRoles', // 获取系统角色列表
  reg = '/cms/userInfo/getRegList', // 获取用户注册来源
  mark = '/cms/userInfo/getMarkList', // 获取用户特殊标记
  job = '/cms/userInfo/getJobList', // 获取用户职业
  draw = '/cms/userInfo/getDrawList', // 获取用户画风
  keywords = '/cms/keyword/getType', // 关键词类型
  functionType = '/cms/function/explain/getType', // 功能说明分类
  questionType = '/cms/question/getType', // 问题
  resourceType = '/cms/mold/search', // 资源搜索
  topicType = '/cms/topic/search',
  authorType = '/cms/topic/author', // 作者搜索
  authorType1 = '/cms/painter/author/search',
  feedbackSelect = '/cms/feedback/getCities', // 意见返回
  jumpType = '/cms/jump/getJumpList', // 跳转列表
  jumpOtherType = '/cms/jump/getList', // 跳转列表其他类型
  styleType = '/cms/index/getTypes', // 样式类型
  resourceCenterType = '/cms/mold/getResourceType', // 动作资源类型
  seriesType = '/cms/series/getRecords', // 资源管理中心，所属系列
  classifyType = '/cms/classify/getRecords',
  goodsType = '/cms/mold/getGoods', //获取商品下拉
  otherKeyType = '/cms/mold/keywordList', //资源管理中心相关关联
  prpeType = '/cms/mold/prepList',
  categoryType = '/cms/index/getAllCategory',
  searchMoIdType = '/cms/mold/searchMold',
  equityType = '/cms/description/getList', // 所属权益
  contentCenter = '/cms/feels/getFeelsType', // 获得灵感心得分类
  allPainterAuthor = '/cms/painter/author/getAllAuthor', //  获取全部画师列表
  userCountry = '/cms/painter/author/getUserRegion', // 获取国家地区
  allLink = '/cms/painter/author/getIcon', //  获取第三方链接
  jobList = '/cms/userInfo/getJobList', // 获取职业列表
  painterTopicList = '/cms/painter/index/getRecords'
}

// 公用API获取不同下拉列表。存在的暂时不修改，后续再统一修改
export function getCommonSelectList(
  type: string,
  data?: any,
  showLoading = true
) {
  return hyRequest.post<any>({
    url: (commonAPI as any)[type],
    data: data,
    showLoading: showLoading
  })
}
export function getCommonSelectList1(keyword?: any, showLoading = true) {
  return hyRequest.post<any>({
    url: `/cms/mold/searchMold?keyword=${keyword}`,
    showLoading: showLoading
  })
}

// 获取所有地区数据
export function getCountrySelectList() {
  return hyRequest.post<any>({
    url: commonAPI.country,
    showLoading: false
  })
}
// 获取所有分组(配置管理中需要)
export function getBaseConfigGroupList() {
  return hyRequest.post<any>({
    url: commonAPI.group,
    showLoading: false
  })
}

// 获取所有路由列表
export function getRouterSelectList() {
  return hyRequest.post<any>({
    url: commonAPI.router,
    showLoading: false
  })
}

// 获取所有角色路由列表
export function getRouterTreeList() {
  return hyRequest.post<any>({
    url: commonAPI.routers,
    showLoading: false
  })
}

// 获取系统角色列表
export function getRolesList() {
  return hyRequest.post<any>({
    url: commonAPI.role,
    showLoading: false
  })
}
