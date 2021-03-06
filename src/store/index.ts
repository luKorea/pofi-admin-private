/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-19 11:27:56
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/index.ts
 */
import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
// 系统管理
import oaPermissionModule from './main/system/permission/permission'
import oaRoleModule from './main/system/role/role'
import oaUserModule from './main/system/user/user'
import oaRouterModule from './main/system/router/router'
// 意见反馈
import feedbackModule from './main/feedback/feedback'
// 商品中心
import goodsRechargeModule from './main/goods/recharge/recharge'
import goodsFunctionModule from './main/goods/function/function'
import goodsItemModule from './main/goods/good/good'
import goodsDescriptionModule from './main/goods/description/description'

// 用户中心 --- 设备管理
import conditionModule from './main/device/condition/condition'
import userImeiModule from './main/device/imei/imei'
// 用户中心 --- 用户管理
import userOperationModule from './main/userOperation/userOperation'
import userCenterOrganizationModule from './main/userCenter/organization/organization'

// 资源库
import resourceDataModule from './main/resource/data/data'
import resourceKeywordModule from './main/resource/keyword/keyword'
import resourceClassifyModule from './main/resource/classify/classify'
import resourceSeriesModule from './main/resource/series/series'
import resourceTopicModule from './main/resource/topic/topic'
import resourceCenterModule from './main/resource/center/center'
import resourceHomeModule from './main/resource/index'
import resourceIndexSeriesModule from './main/resource/index/series/series'

// 财务中心
import tradeRecordModule from './main/finance/tradeRecord/tradeRecord'
import payModule from './main/finance/pay/pay'
import purseModule from './main/finance/purse/purse'
import wareHouseModule from './main/finance/warehouse/warehouse'

// 基础管理
import baseConfigModule from './main/base/config/config'
import baseHeadModule from './main/base/head/head'
import baseAreaModule from './main/base/area/area'
import baseLanguageModule from './main/base/language/language'
import baseFusingModule from './main/base/fusing/fusing'
import baseJumpModule from './main/base/jump/jump'
import baseVersionModule from './main/base/version/version'

// 帮助中心
import helpCompanionModule from './main/help/companion/companion'
import helpFunctionTypeModule from './main/help/functionType/functionType'
import helpFunctionModule from './main/help/function/function'
import helpQuestionModule from './main/help/question/question'
import helpQuestionTypeModule from './main/help/questionType/questionType'
import helpAccountModule from './main/help/account/account'

// 审核管理
import auditUserModifyModule from './main/audit/userModify/userModify'
// import cache from '@/utils/cache'
// 广告管理
import advertisementBannerModule from './main/ad/banner/banner'
// 内容管理
import userExperienceModule from './main/contentCenter/userExperience/userExperience'
import creativeInspirationModule from './main/contentCenter/creativeInspiration/creativeInspiration'
import painterTopicModule from './main/contentCenter/painterWiki/painterTopic/painterTopic'
import painterLibraryModule from './main/contentCenter/painterWiki/painterLibrary/painterLibrary'

import { getPageListData } from '@/service/common-api'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'koreaLu',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
      tagsList: []
    }
  },
  mutations: {
    delTagsItem(state, data) {
      state.tagsList.splice(data.index, 1)
    },
    setTagsItem(state, data) {
      state.tagsList.push(data)
    },
    clearTags(state) {
      state.tagsList = []
    },
    closeTagsOther(state, data) {
      state.tagsList = data
    },
    closeCurrentTag(state, data) {
      for (let i = 0, len = state.tagsList.length; i < len; i++) {
        const item = state.tagsList[i]
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(state.tagsList[i + 1].path)
          } else if (i > 0) {
            data.$router.push(state.tagsList[i - 1].path)
          } else {
            data.$router.push('/')
          }
          state.tagsList.splice(i, 1)
          break
        }
      }
    },
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    // 本地保存用户点击的路由，刷新页面不丢失
    saveTagsList({ commit }, payload) {
      commit('saveTagsListToLocal', payload)
    },
    // 点击侧边栏将路由添加到tagsList
    addTags({ commit }, payload) {
      commit('addTagsListToStore', payload)
    },
    // 移除tagsList
    removeTags({ commit }, payload) {
      commit('removeTagsListToStore', payload)
    },
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    // 系统管理模块
    oaPermissionModule,
    oaRoleModule,
    oaUserModule,
    oaRouterModule,
    // 问题反馈
    feedbackModule,
    // 审核管理
    auditUserModifyModule,
    // 商品中心
    goodsRechargeModule,
    goodsFunctionModule,
    goodsItemModule,
    goodsDescriptionModule,
    // 用户中心---设备管理
    conditionModule,
    userImeiModule,
    // 用户中心---用户管理
    userOperationModule,
    userCenterOrganizationModule,
    // 资源库
    resourceDataModule,
    resourceKeywordModule,
    resourceClassifyModule,
    resourceSeriesModule,
    resourceTopicModule,
    resourceCenterModule,
    resourceHomeModule,
    resourceIndexSeriesModule,
    // 财务中心
    tradeRecordModule,
    payModule,
    purseModule,
    wareHouseModule,
    // 基础管理
    baseConfigModule,
    baseHeadModule,
    baseAreaModule,
    baseLanguageModule,
    baseFusingModule,
    baseJumpModule,
    baseVersionModule,
    // 帮助中心
    helpCompanionModule,
    helpFunctionTypeModule,
    helpFunctionModule,
    helpQuestionModule,
    helpQuestionTypeModule,
    helpAccountModule,
    // 广告管理
    advertisementBannerModule,
    // 内容管理
    userExperienceModule,
    creativeInspirationModule,
    painterTopicModule,
    painterLibraryModule
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
