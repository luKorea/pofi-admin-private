/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-06 16:15:35
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/language/language.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase, validateParamsRules } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IPainterTopicType } from './types'

import {
  getPageListData,
  deletePageToQueryData,
  sortPageTableData,
  createPageDataJSON,
  editPageDataJSON
} from '@/service/common-api'

const apiList: any = {
  painterTopics: '/cms/painter/index/',
  sort: '/cms/painter/index/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['title']
const painterTopicModule: Module<IPainterTopicType, IRootState> = {
  namespaced: true,
  state() {
    return {
      painterTopicsCount: 0,
      painterTopicsList: []
    }
  },
  mutations: {
    changePainterTopicsList(state, painterTopicsList: any[]) {
      state.painterTopicsList = painterTopicsList
    },
    changePainterTopicsCount(state, painterTopicsCount: number) {
      state.painterTopicsCount = painterTopicsCount
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
        ...queryInfo,
        type: queryInfo.type ?? 1,
        rid: queryInfo.rid ?? -999
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
      const pageUrl = apiList[pageName] + 'deleteIndex'
      const data = await deletePageToQueryData(pageUrl, {
        id: id,
        type: payload.queryInfo.type,
        paid: payload.queryInfo.paid
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
        const validData = newData.indexVoList[0]
        validateParamsRules(newData.indexVoList, validData, requiredField)
          .then(async () => {
            const pageUrl = apiList[pageName] + 'addIndex'
            const data = await createPageDataJSON(pageUrl, {
              ...newData,
              ...validData,
              rcmdPo: newData.contactList1
                ? newData.contactList1.toString()
                : undefined
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
        const validData = editData.indexVoList[0]
        validateParamsRules(editData.indexVoList, validData, requiredField)
          .then(async () => {
            const pageUrl = apiList[pageName] + 'updateIndex'
            const data = await editPageDataJSON(pageUrl, {
              ...validData,
              ...editData,
              id: editData.id,
              rcmdPo: editData.contactList1
                ? editData.contactList1.toString()
                : undefined
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

export default painterTopicModule
