import { cultureDifferentType } from '@/utils/index'
/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 16:58:20
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/finance/pay/pay.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IFinancePurseType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'

const apiList: any = {
  purses: '/cms/userPurse/',
  log: '/cms/userPurse/'
}
const queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const purseModule: Module<IFinancePurseType, IRootState> = {
  namespaced: true,
  state() {
    return {
      pursesCount: 0,
      pursesList: [],
      logCount: 0,
      logList: []
    }
  },
  mutations: {
    changePursesList(state, pursesList: any[]) {
      state.pursesList = pursesList
    },
    changePursesCount(state, pursesCount: number) {
      state.pursesCount = pursesCount
    },
    changeLogList(state, logList: any[]) {
      state.logList = logList
    },
    changeLogCount(state, logCount: number) {
      state.logCount = logCount
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
      const pageUrl =
        apiList[pageName] + (pageName === 'purses' ? 'getRecords' : 'log')
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
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
      const pageUrl =
        apiList[pageName] + cultureDifferentType('delete', pageName)
      const data = await deletePageToQueryData(pageUrl, { id: id })
      if (data.result === 0) {
        // 3.重新请求最新的数据
        dispatch('getPageListAction', {
          pageName, // 这里的pageName，无需处理，在getPageListAction会处理
          queryInfo: queryInfo
        })
        successTip(data.msg)
      } else errorTip(data.msg)
    },

    createPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.创建数据的请求
        const { pageName, newData } = payload
        const pageUrl =
          apiList[pageName] + cultureDifferentType('add', pageName)
        const data = await createPageData(pageUrl, newData)
        if (data.result === 0) {
          // 2.请求最新的数据
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
        // 1.编辑数据的请求
        const { pageName, editData } = payload
        const pageUrl =
          apiList[pageName] + cultureDifferentType('update', pageName)
        const data = await editPageData(pageUrl, editData)
        if (data.result === 0) {
          // 2.请求最新的数据
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

export default purseModule
