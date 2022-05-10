/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-10 10:35:03
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/help/companion/companion.ts
 */
import {
  cultureDifferentType,
  firstToUpperCase,
  validateParamsRules
} from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IHelpCompanionType } from './types'
import { errorTip } from '@/utils/tip-info'

import {
  getPageListData,
  deletePageToQueryData,
  createPageData,
  editPageData,
  sortPageTableData
} from '@/service/common-api'

const apiList: any = {
  companions: '/cms/companion/',
  sort: '/cms/companion/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['title']
const helpCompanionModule: Module<IHelpCompanionType, IRootState> = {
  namespaced: true,
  state() {
    return {
      companionsCount: 0,
      companionsList: []
    }
  },
  mutations: {
    changeCompanionsList(state, companionsList: any[]) {
      state.companionsList = companionsList
    },
    changeCompanionsCount(state, companionsCount: number) {
      state.companionsCount = companionsCount
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
      const pageUrl =
        apiList[pageName] + cultureDifferentType('delete', pageName)
      // 2.调用删除网络请求
      await deletePageToQueryData(pageUrl, { id: id })

      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName, // 这里的pageName，无需处理，在getPageListAction会处理
        queryInfo: queryInfo
      })
    },

    createPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>((resolve, reject) => {
        // 1.创建数据的请求
        const { pageName, newData } = payload
        const validData = JSON.parse(newData.CompanionJson)[0]
        validateParamsRules(
          JSON.parse(newData.CompanionJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl =
              apiList[pageName] + cultureDifferentType('add', pageName)
            const data = await createPageData(pageUrl, {
              // ...validData, // 获取一级数据，传递给后台
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
      return new Promise<any>((resolve, reject) => {
        // 1.编辑数据的请求
        const { pageName, editData } = payload
        const validData = JSON.parse(editData.CompanionJson)[0]
        validateParamsRules(
          JSON.parse(editData.CompanionJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl =
              apiList[pageName] + cultureDifferentType('update', pageName)
            const data = await editPageData(pageUrl, {
              ...editData // 获取一级数据，传递给后台
              // ...validData
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

export default helpCompanionModule
