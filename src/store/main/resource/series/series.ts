/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 14:37:01
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/language/language.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { cultureDifferentType, firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IResourceSeriesType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'
import { sortTableList } from '@/service/main/base/head'
import { warnTip } from '@/utils/tip-info'

const apiList: any = {
  series: '/cms/series/'
}
const queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const resourceSeriesModule: Module<IResourceSeriesType, IRootState> = {
  namespaced: true,
  state() {
    return {
      seriesCount: 0,
      seriesList: []
    }
  },
  mutations: {
    changeSeriesList(state, seriesList: any[]) {
      state.seriesList = seriesList
    },
    changeSeriesCount(state, seriesCount: number) {
      state.seriesCount = seriesCount
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
      const pageName = payload.pageName
      const pageUrl = apiList[pageName] + 'routers'
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log(pageResult, 're')
      if (pageResult.result === 0) {
        const { data, total = 0 } = pageResult.data as any
        console.log(data)
        const changePageName = firstToUpperCase(pageName)
        commit(`change${changePageName}List`, pageResult.data)
        commit(`change${changePageName}Count`, total)
      } else errorTip(pageResult.msg)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const pageName = payload.pageName
      const id = payload.queryInfo.id
      const info = payload.queryInfo
      const pageUrl = apiList[pageName] + cultureDifferentType('del', pageName)
      console.log(payload.queryInfo, '当前点击的项目')
      if (info.parent === 0) {
        warnTip('当前系列类不能删除')
        return
      } else if (info.children && info.children.length > 0) {
        warnTip('当前系列下有子类，不能删除')
        return
      } else {
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
      }
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

export default resourceSeriesModule
