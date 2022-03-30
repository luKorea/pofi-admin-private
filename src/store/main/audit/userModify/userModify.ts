/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 14:34:37
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/area/area.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { cultureDifferentType, firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IUserModifyType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'
import { sortTableList } from '@/service/main/base/head'

const apiList: any = {
  userModifys: '/cms/userInfo/'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const auditUserModifyModule: Module<IUserModifyType, IRootState> = {
  namespaced: true,
  state() {
    return {
      userModifysCount: 0,
      userModifysList: []
    }
  },
  mutations: {
    changeUserModifysList(state, userModifysList: any[]) {
      state.userModifysList = userModifysList
    },
    changeUserModifysCount(state, userModifysCount: number) {
      state.userModifysCount = userModifysCount
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
      const pageUrl = apiList[pageName] + 'userModifyList'
      const pageResult = await getPageListData(pageUrl, queryInfo)
      console.log(pageResult, 're')
      if (pageResult.result === 0) {
        // const { rows, total } = pageResult.data as any
        const changePageName = firstToUpperCase(pageName)
        commit(`change${changePageName}List`, pageResult.data)
        commit(`change${changePageName}Count`, pageResult.data.length)
      } else errorTip(pageResult.msg)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const pageName = payload.pageName
      const uid = payload.queryInfo.uid
      const pageUrl = apiList[pageName] + '/delHead'
      const data = await deletePageToQueryData(pageUrl, {
        uid: uid
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
        const pageUrl =
          apiList[pageName] + cultureDifferentType('add', pageName)
        const data = await createPageData(pageUrl, newData)
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
        const pageUrl =
          apiList[pageName] + cultureDifferentType('update', pageName)
        const data = await editPageData(pageUrl, editData)
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
        const data = await sortTableList(sortData)
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

export default auditUserModifyModule
