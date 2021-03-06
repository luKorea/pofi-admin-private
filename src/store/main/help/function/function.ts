/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-07 10:42:35
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/language/language.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import {
  cultureDifferentType,
  firstToUpperCase,
  validateParamsRules
} from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IHelpFunctionType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'
import { mapObjectIsNull } from '@/utils'
import { sortPageTableData } from '@/service/common-api'

const apiList: any = {
  explains: '/cms/function/explain/',
  sort: '/cms/function/explain/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['title', 'desc']

const helpFunctionModule: Module<IHelpFunctionType, IRootState> = {
  namespaced: true,
  state() {
    return {
      explainsCount: 0,
      explainsList: []
    }
  },
  mutations: {
    changeExplainsList(state, explainsList: any[]) {
      state.explainsList = explainsList
    },
    changeExplainsCount(state, explainsCount: number) {
      state.explainsCount = explainsCount
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
      const pageUrl =
        apiList[pageName] + cultureDifferentType('delete', pageName)
      const data = await deletePageToQueryData(pageUrl, {
        id: id,
        name: payload.queryInfo.name,
        iso: payload.queryInfo.iso
      })
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
      return new Promise<any>((resolve, reject) => {
        // 1.?????????????????????
        const { pageName, newData } = payload
        // ??????????????????????????????
        const validData = JSON.parse(newData.functionExplainJson)[0]
        validateParamsRules(
          JSON.parse(newData.functionExplainJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl =
              apiList[pageName] + cultureDifferentType('add', pageName)
            const data = await createPageData(pageUrl, {
              ...newData,
              state: 1
            })
            if (data.result === 0) {
              // 2.?????????????????????
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
      return new Promise<any>((resolve, reject) => {
        // 1.?????????????????????
        const { pageName, editData } = payload
        const validData = JSON.parse(editData.functionExplainJson)[0]
        validateParamsRules(
          JSON.parse(editData.functionExplainJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl =
              apiList[pageName] + cultureDifferentType('update', pageName)
            const data = await editPageData(pageUrl, {
              ...editData,
              state: 1
            })
            if (data.result === 0) {
              // 2.?????????????????????
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

export default helpFunctionModule
