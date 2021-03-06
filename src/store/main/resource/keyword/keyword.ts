/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-07 11:16:47
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
import { IResourceKeywordType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'
import { sortPageTableData } from '@/service/common-api'

const apiList: any = {
  keywords: '/cms/keyword/',
  sort: '/cms/keyword/updateKeyword'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['name']
const resourceKeywordModule: Module<IResourceKeywordType, IRootState> = {
  namespaced: true,
  state() {
    return {
      keywordsCount: 0,
      keywordsList: []
    }
  },
  mutations: {
    changeKeywordsList(state, keywordsList: any[]) {
      state.keywordsList = keywordsList
    },
    changeKeywordsCount(state, keywordsCount: number) {
      state.keywordsCount = keywordsCount
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
      const pageUrl = apiList[pageName] + cultureDifferentType('del', pageName)
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
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.?????????????????????
        const { pageName, newData } = payload
        const validData = JSON.parse(newData.moldKeywordJson)[0]
        validateParamsRules(
          JSON.parse(newData.moldKeywordJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl =
              apiList[pageName] + cultureDifferentType('add', pageName)
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
          .catch((err) => errorTip(err))
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.?????????????????????
        const { pageName, editData } = payload
        const validData = JSON.parse(editData.moldKeywordJson)[0]
        validateParamsRules(
          JSON.parse(editData.moldKeywordJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl =
              apiList[pageName] + cultureDifferentType('update', pageName)
            const data = await editPageData(pageUrl, editData)
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

export default resourceKeywordModule
