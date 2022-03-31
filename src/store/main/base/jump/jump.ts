/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-31 15:53:10
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/head/head.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { cultureDifferentType, firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IBaseJumpType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData,
  sortPageTableData
} from '@/service/common-api'

const apiList: any = {
  jumps: '/cms/jump/',
  sort: '/cms/account/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const baseJumpModule: Module<IBaseJumpType, IRootState> = {
  namespaced: true,
  state() {
    return {
      jumpsCount: 0,
      jumpsList: []
    }
  },
  mutations: {
    changeJumpsList(state, jumpsList: any[]) {
      state.jumpsList = jumpsList
    },
    changeJumpsCount(state, jumpsCount: number) {
      state.jumpsCount = jumpsCount
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
      const pageUrl = apiList[pageName] + 'getRecords'
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
      const pageUrl = apiList[pageName] + 'del'
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
        const pageUrl = apiList[pageName] + 'add'
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
        const pageUrl = apiList[pageName] + 'update'
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
    },
    async sortPageDataAction({ dispatch }, payload: any) {
      const { pageName, sortData } = payload
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        const data = await sortPageTableData(apiList.sort, sortData)
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

export default baseJumpModule
