/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-06 14:41:34
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/device/imei/imei.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IUserImeiType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'

const apiList: any = {
  imei: '/cms/userImei/'
}

const userImeiModule: Module<IUserImeiType, IRootState> = {
  namespaced: true,
  state() {
    return {
      imeiCount: 0,
      imeiList: [],
      queryInfo: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  mutations: {
    changeImeiList(state, imeiList: any[]) {
      state.imeiList = imeiList
    },
    changeImeiCount(state, imeiCount: number) {
      state.imeiCount = imeiCount
    },
    changeQueryInfo(state, queryInfo: any) {
      state.queryInfo = queryInfo
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
    async getPageListAction({ commit, state }, payload: any) {
      commit('changeQueryInfo', payload.queryInfo)
      const pageName = payload.pageName
      const pageUrl = apiList[pageName] + 'getRecords'
      const pageResult = await getPageListData(pageUrl, state.queryInfo)
      if (pageResult.result === 0) {
        const { rows, total } = pageResult.data as any
        const changePageName = firstToUpperCase(pageName)
        commit(`change${changePageName}List`, rows)
        commit(`change${changePageName}Count`, total)
      } else errorTip(pageResult.msg)
    },
    async deletePageDataAction({ dispatch, state }, payload: any) {
      const pageName = payload.pageName
      const id = payload.queryInfo.id
      const pageUrl = apiList[pageName] + 'delLimit'
      const data = await deletePageToQueryData(pageUrl, { id: id })
      if (data.result === 0) {
        // 3.重新请求最新的数据
        dispatch('getPageListAction', {
          pageName, // 这里的pageName，无需处理，在getPageListAction会处理
          queryInfo: state.queryInfo
        })
        successTip(data.msg)
      } else errorTip(data.msg)
    },

    createPageDataAction({ dispatch, state }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.创建数据的请求
        const { pageName, newData } = payload
        const pageUrl = apiList[pageName] + 'addLimit'
        const data = await createPageData(pageUrl, newData)
        if (data.result === 0) {
          // 2.请求最新的数据
          dispatch('getPageListAction', {
            pageName,
            queryInfo: state.queryInfo
          })
          resolve(data.msg)
        } else reject(data.msg)
      })
    },

    async editPageDataAction({ dispatch, state }, payload: any) {
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
            queryInfo: state.queryInfo
          })
          resolve(data.msg)
        } else reject(data.msg)
      })
    }
  }
}

export default userImeiModule
