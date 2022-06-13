/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-13 17:14:22
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/finance/tradeRecord/tradeRecord.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ICreativeInspirationType } from './types'
import {
  getPageListData,
  editPageDataJSON,
  createPageDataJSON,
  deletePageToQueryData,
  sortPageTableData
} from '@/service/common-api'

const apiList: any = {
  creativeInspirations: '/cms/feels/',
  sort: '/cms/feels/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10,
  type: 2
}
const creativeInspirationModule: Module<ICreativeInspirationType, IRootState> =
  {
    namespaced: true,
    state() {
      return {
        creativeInspirationsCount: 0,
        creativeInspirationsList: []
      }
    },
    mutations: {
      changeCreativeInspirationsList(state, creativeInspirationsList: any[]) {
        state.creativeInspirationsList = creativeInspirationsList
      },
      changeCreativeInspirationsCount(
        state,
        creativeInspirationsCount: number
      ) {
        state.creativeInspirationsCount = creativeInspirationsCount
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
          type: 2,
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
        const pageUrl = apiList[pageName] + 'deleteFeels'
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
          const pageUrl = apiList[pageName] + 'addFeels'
          const data = await createPageDataJSON(pageUrl, {
            ...newData,
            type: 2,
            prep: newData.prep ? newData.prep.toString() : undefined,
            subPrep: newData.subPrep ? newData.subPrep.toString() : undefined
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
      },

      async editPageDataAction({ dispatch }, payload: any) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<any>(async (resolve, reject) => {
          // 1.编辑数据的请求
          const { pageName, editData } = payload
          const pageUrl = apiList[pageName] + 'updateFeels'
          const data = await editPageDataJSON(pageUrl, {
            ...editData,
            type: 2,
            prep: editData.prep ? editData.prep.toString() : undefined,
            subPrep: editData.subPrep ? editData.subPrep.toString() : undefined
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

export default creativeInspirationModule
