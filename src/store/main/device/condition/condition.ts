/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-25 10:11:24
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
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'

const apiList: any = {
  limit: '/cms/userImei/'
}
let queryInfo: any = {
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
      queryInfo = payload.queryInfo
      const pageName = payload.pageName
      const pageUrl = apiList[pageName] + cultureDifferentType('get', pageName)
      const pageResult = await getPageListData(pageUrl, queryInfo)
      console.log(pageResult, 're')
      if (pageResult.result === 0) {
        const { rows, total } = pageResult.data as any
        const changePageName = firstToUpperCase(pageName)
        commit(`change${changePageName}List`, rows)
        commit(`change${changePageName}Count`, total)
      } else errorTip(pageResult.msg)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const pageName = payload.pageName
      const id = payload.queryInfo.id
      const pageUrl = apiList[pageName] + 'delLimit'
      const data = await deletePageToQueryData(pageUrl, { id: id })
      if (data.result === 0) {
        // 3.???????????????????????????
        dispatch('getPageListAction', {
          pageName, // ?????????pageName?????????????????????getPageListAction?????????
          queryInfo: queryInfo
        })
        successTip(data.msg)
      } else errorTip(data.msg)
    },

    createPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.?????????????????????
        const { pageName, newData } = payload
        const pageUrl = apiList[pageName] + 'addLimit'
        const data = await createPageData(pageUrl, newData)
        if (data.result === 0) {
          // 2.?????????????????????
          dispatch('getPageListAction', {
            pageName,
            queryInfo: queryInfo
          })
          resolve(data.msg)
        } else reject(data.msg)
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.?????????????????????
        const { pageName, editData } = payload
        const pageUrl = apiList[pageName] + 'updateLimit'
        const data = await editPageData(pageUrl, editData)
        if (data.result === 0) {
          // 2.?????????????????????
          dispatch('getPageListAction', {
            pageName,
            queryInfo: queryInfo
          })
          resolve(data.msg)
        } else reject(data.msg)
      })
    }
  }
}

export default conditionModule
