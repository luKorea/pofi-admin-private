/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 17:55:41
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/device/condition/condition.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { cultureDifferentType, firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IConditionType } from './types'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/common-api'

const apiList: any = {
  limit: '/cms/userImei/'
}
const queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const conditionModule: Module<IConditionType, IRootState> = {
  namespaced: true,
  state() {
    return {
      limitCount: 0,
      limitList: []
    }
  },
  mutations: {
    changeLimitList(state, limitList: any[]) {
      state.limitList = limitList
    },
    changeLimitCount(state, limitCount: number) {
      state.limitCount = limitCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => (state as any)[`${pageName}List`]
    },
    pageListCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`]
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      const pageUrl = apiList[pageName] + cultureDifferentType('get', pageName)
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { rows, total } = pageResult.data as any
      const changePageName = firstToUpperCase(pageName)
      commit(`change${changePageName}List`, rows)
      commit(`change${changePageName}Count`, total)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      const pageName = payload.pageName
      const pageUrl = apiList[pageName] + `del${firstToUpperCase(pageName)}`
      const data = await deletePageData(pageUrl, payload.data)
      if (data.result === 0) {
        successTip(data.msg)
        dispatch('getPageListAction', {
          pageName, // 这里的pageName，无需处理，在getPageListAction会处理
          queryInfo: queryInfo
        })
      } else errorTip(data.msg)
    },

    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = apiList[pageName] + `add${firstToUpperCase(pageName)}`
      await createPageData(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: queryInfo
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData } = payload
      const pageUrl = apiList[pageName] + `update${firstToUpperCase(pageName)}`
      await editPageData(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: queryInfo
      })
    }
  }
}

export default conditionModule
