import { errorTip, successTip } from '@/utils/tip-info'
import { cultureDifferentType, firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IRouterState } from './types'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/common-api'

const apiList: any = {
  router: '/cms/router/'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const oaRouterModule: Module<IRouterState, IRootState> = {
  namespaced: true,
  state() {
    return {
      routerList: [],
      routerCount: 0
    }
  },
  mutations: {
    changeRouterList(state, list: any[]) {
      state.routerList = list
    },
    changeRouterCount(state, count: number) {
      state.routerCount = count
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
      // TODO 这个action会在用户操作增删改后调用它，在这些操作中，
      //  传递过来的pageName无需做任何处理，例如: user，就按user返回就行，这里会做一层处理
      // 1.获取pageUrl
      const pageName = payload.pageName
      let pageUrl = apiList[pageName] + cultureDifferentType('get', pageName)
      // 处理路由列表中多个列表的情况
      if (pageName === 'router') {
        pageUrl = apiList[pageName] + 'routers'
      }
      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, queryInfo)
      // 3.将数据存储到state中
      if (pageResult.result === 0) {
        const { data, totalCount = 0 } = pageResult as any
        const changePageName = firstToUpperCase(pageName)
        commit(`change${changePageName}List`, data)
        // 处理oa下没有返回totalCount
        if (pageName === 'users' || pageName === 'router') {
          commit(`change${changePageName}Count`, data.length)
        } else {
          commit(`change${changePageName}Count`, totalCount)
        }
      } else errorTip(pageResult.msg)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      const pageName = payload.pageName
      const id = payload.queryInfo.id
      const pageUrl = apiList[pageName] + 'del'
      // 2.调用删除网络请求
      const data = await deletePageData(pageUrl, id)
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
        const pageUrl = apiList[pageName] + 'add'
        const data = await createPageData(pageUrl, newData)
        if (data.state) {
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
        if (data.state) {
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

export default oaRouterModule
