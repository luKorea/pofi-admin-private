/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-07 18:10:04
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/config/config.ts
 */
import { cultureDifferentType, firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IBaseConfigType } from './types'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/common-api'

const apiList: any = {
  records: '/cms/config/'
}
const queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const baseConfigModule: Module<IBaseConfigType, IRootState> = {
  namespaced: true,
  state() {
    return {
      recordsCount: 0,
      recordsList: []
    }
  },
  mutations: {
    changeRecordsList(state, recordsList: any[]) {
      state.recordsList = recordsList
    },
    changeRecordsCount(state, recordsCount: number) {
      state.recordsCount = recordsCount
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
      payload.queryInfo.rid = payload.queryInfo.rid ? payload.queryInfo.rid : ''
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { rows, total } = pageResult.data as any
      const changePageName = firstToUpperCase(pageName)
      commit(`change${changePageName}List`, rows)
      commit(`change${changePageName}Count`, total)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const pageName = payload.pageName
      const id = payload.id
      const pageUrl = apiList[pageName] + cultureDifferentType('del', pageName)
      // 2.调用删除网络请求
      await deletePageData(pageUrl, { id: id })

      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName, // 这里的pageName，无需处理，在getPageListAction会处理
        queryInfo: queryInfo
      })
    },

    createPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.创建数据的请求
        const { pageName, newData } = payload
        const pageUrl =
          apiList[pageName] + cultureDifferentType('add', pageName)
        const data = await createPageData(pageUrl, newData)
        if (data.state) {
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
        if (data.state) {
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

export default baseConfigModule
