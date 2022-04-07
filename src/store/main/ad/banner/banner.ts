/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-07 10:31:13
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/config/config.ts
 */
import {
  cultureDifferentType,
  firstToUpperCase,
  validateParamsRules
} from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IAadvertisementBannerType } from './types'

import {
  getPageListData,
  deletePageToQueryData,
  createPageData,
  editPageData,
  sortPageTableData
} from '@/service/common-api'
import { successTip, errorTip } from '@/utils/tip-info'

const apiList: any = {
  banners: '/cms/ad/banner/',
  sort: '/cms/ad/banner/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['title', 'subTitle', 'cover']
const advertisementBannerModule: Module<IAadvertisementBannerType, IRootState> =
  {
    namespaced: true,
    state() {
      return {
        bannersCount: 0,
        bannersList: []
      }
    },
    mutations: {
      changeBannersList(state, bannersList: any[]) {
        state.bannersList = bannersList
      },
      changeBannersCount(state, bannersCount: number) {
        state.bannersCount = bannersCount
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
          rid: queryInfo.rid ?? -999,
          group: queryInfo.group ?? ''
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
        return new Promise<any>((resolve, reject) => {
          // 1.创建数据的请求
          const { pageName, newData } = payload
          const validData = JSON.parse(newData.bannerJson)[0]
          validateParamsRules(
            JSON.parse(newData.bannerJson),
            validData,
            requiredField
          )
            .then(async () => {
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
            })
            .catch((err) => errorTip(err))
        })
      },

      async editPageDataAction({ dispatch }, payload: any) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<any>(async (resolve, reject) => {
          // 1.创建数据的请求
          const { pageName, editData } = payload
          const validData = JSON.parse(editData.bannerJson)[0]
          validateParamsRules(
            JSON.parse(editData.bannerJson),
            validData,
            requiredField
          )
            .then(async () => {
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

export default advertisementBannerModule
