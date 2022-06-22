/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-22 10:41:04
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/language/language.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase, validateParamsRules } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IPainterLibraryType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData,
  sortPageTableData
} from '@/service/common-api'

const apiList: any = {
  painterLibrarys: '/cms/painter/author/',
  sort: '/cms/painter/author/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['name', 'digest', 'about']
const painterLibraryModule: Module<IPainterLibraryType, IRootState> = {
  namespaced: true,
  state() {
    return {
      painterLibrarysCount: 0,
      painterLibrarysList: []
    }
  },
  mutations: {
    changePainterLibrarysList(state, painterLibrarysList: any[]) {
      state.painterLibrarysList = painterLibrarysList
    },
    changePainterLibrarysCount(state, painterLibrarysCount: number) {
      state.painterLibrarysCount = painterLibrarysCount
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
      const pageResult = await getPageListData(pageUrl, {
        ...queryInfo
      })
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
      const pageUrl = apiList[pageName] + 'deleteAuthor'
      const data = await deletePageToQueryData(pageUrl, {
        id: id,
        name: payload.queryInfo.name,
        iso: payload.queryInfo.iso
      })
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
        const validData = JSON.parse(newData.functionExplainTypeJson)[0]
        validateParamsRules(
          JSON.parse(newData.functionExplainTypeJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl = apiList[pageName] + 'addAuthor'
            const data = await createPageData(pageUrl, {
              ...newData,
              ...validData
            })
            if (data.result === 0) {
              // 2.请求最新的数据
              dispatch('getPageListAction', {
                pageName,
                queryInfo: queryInfo
              })
              resolve(data.msg)
            } else reject(data.msg)
          })
          .catch((err) => errorTip(err))
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.编辑数据的请求
        const { pageName, editData } = payload
        const validData = JSON.parse(editData.functionExplainTypeJson)[0]
        validateParamsRules(
          JSON.parse(editData.functionExplainTypeJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl = apiList[pageName] + 'updateAuthor'
            const data = await editPageData(pageUrl, {
              ...validData,
              ...editData,
              id: editData.id
            })
            if (data.result === 0) {
              // 2.请求最新的数据
              dispatch('getPageListAction', {
                pageName,
                queryInfo: queryInfo
              })
              resolve(data.msg)
            } else reject(data.msg)
          })
          .catch((err) => errorTip(err))
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

export default painterLibraryModule
