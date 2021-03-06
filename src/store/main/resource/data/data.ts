import { cultureDifferentType } from '@/utils/index'
/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-13 14:07:15
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/resource/data/data.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IResourceDataType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'

const apiList: any = {
  resourceData: '/cms/moldData/',
  log: '/cms/moldData/'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const resourceDataModule: Module<IResourceDataType, IRootState> = {
  namespaced: true,
  state() {
    return {
      resourceDataCount: 0,
      resourceDataList: [],
      logCount: 0,
      logList: []
    }
  },
  mutations: {
    changeResourceDataList(state, resourceDataList: any[]) {
      state.resourceDataList = resourceDataList
    },
    changeResourceDataCount(state, resourceDataCount: number) {
      state.resourceDataCount = resourceDataCount
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
      queryInfo = payload.queryInfo
      const pageName = payload.pageName
      const pageUrl =
        apiList[pageName] + (pageName === 'resourceData' ? 'getRecords' : 'log')
      const pageResult = await getPageListData(pageUrl, queryInfo)
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
        const pageUrl = apiList[pageName] + 'updateDownload'
        console.log(editData)
        const result = {
          state: editData.downloadState,
          showNum: Math.floor(editData.num / 1000),
          id: editData.id,
          num: editData.num,
          moId: editData.moId
        }
        console.log(result)
        const data = await editPageData(pageUrl, result)
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

export default resourceDataModule
