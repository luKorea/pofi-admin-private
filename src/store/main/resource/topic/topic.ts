/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 11:59:53
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/language/language.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { cultureDifferentType, firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IResourceTopicType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'
import { sortTableList } from '@/service/main/base/head'
import { mapObjectIsNull } from '@/utils'

const apiList: any = {
  topics: '/cms/topic/',
  sort: '/cms/function/type/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const resourceTopicModule: Module<IResourceTopicType, IRootState> = {
  namespaced: true,
  state() {
    return {
      topicsCount: 0,
      topicsList: []
    }
  },
  mutations: {
    changeTopicsList(state, topicsList: any[]) {
      state.topicsList = topicsList
    },
    changeTopicsCount(state, topicsCount: number) {
      state.topicsCount = topicsCount
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
      const pageUrl =
        apiList[pageName] + cultureDifferentType('delete', pageName)
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
        const validData = JSON.parse(newData.topicJson)[0]
        if (mapObjectIsNull(['name', 'subTitle', 'desc'], validData)) {
          const pageUrl =
            apiList[pageName] + cultureDifferentType('add', pageName)
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
        } else errorTip('请确保带*号的字段填写完整')
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.编辑数据的请求
        const { pageName, editData } = payload
        const validData = JSON.parse(editData.topicJson)[0]
        if (mapObjectIsNull(['name', 'subTitle', 'desc'], validData)) {
          const pageUrl =
            apiList[pageName] + cultureDifferentType('update', pageName)
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
        } else errorTip('请确保带*号的字段填写完整')
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

export default resourceTopicModule
