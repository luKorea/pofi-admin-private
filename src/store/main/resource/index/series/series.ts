/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-18 13:38:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/language/language.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase, validateParamsRules } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IResourceHomeSeriesType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'
import { sortPageTableData } from '@/service/common-api'

const apiList: any = {
  indexSeries: '/cms/index/',
  sort: '/cms/index/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['name']
const resourceIndexSeriesModule: Module<IResourceHomeSeriesType, IRootState> = {
  namespaced: true,
  state() {
    return {
      indexSeriesCount: 0,
      indexSeriesList: []
    }
  },
  mutations: {
    changeIndexSeriesList(state, indexSeriesList: any[]) {
      state.indexSeriesList = indexSeriesList
    },
    changeIndexSeriesCount(state, indexSeriesCount: number) {
      state.indexSeriesCount = indexSeriesCount
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
      const pageUrl = apiList[pageName] + 'routers'
      const pageResult = await getPageListData(pageUrl, {
        ...queryInfo
      })
      if (pageResult.result === 0) {
        const { rows, total } = pageResult.data as any
        const changePageName = firstToUpperCase(pageName)
        commit(`change${changePageName}List`, pageResult.data)
        commit(`change${changePageName}Count`, total)
      } else errorTip(pageResult.msg)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const pageName = payload.pageName
      const id = payload.queryInfo.id
      const pageUrl = apiList[pageName] + 'delRouter'
      const data = await deletePageToQueryData(pageUrl, {
        id: id
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
        console.log(newData)
        const validData = JSON.parse(newData.classifyJson)[0]
        validateParamsRules(
          JSON.parse(newData.classifyJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl = apiList[pageName] + 'addRouter'
            const data = await createPageData(pageUrl, {
              ...newData
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
        const validData = JSON.parse(editData.classifyJson)[0]
        validateParamsRules(
          JSON.parse(editData.classifyJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl = apiList[pageName] + 'updateRouter'
            const data = await editPageData(pageUrl, {
              ...editData
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

export default resourceIndexSeriesModule
