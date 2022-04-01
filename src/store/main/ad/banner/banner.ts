/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 16:03:08
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/base/config/config.ts
 */
import { cultureDifferentType, firstToUpperCase } from '@/utils/index'
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
import { mapObjectIsNull } from '@/utils'

const apiList: any = {
  banners: '/cms/ad/banner/',
  sort: '/cms/ad/banner/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
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
        const name = payload.queryInfo.name
        const pageUrl = apiList[pageName] + 'delete'
        const data = await deletePageToQueryData(pageUrl, {
          id: id,
          name: name
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
          const validData = JSON.parse(newData.sysConfigJson)[0]
          if (mapObjectIsNull(['value'], validData)) {
            const pageUrl = apiList[pageName] + 'add'
            const data = await createPageData(pageUrl, {
              ...newData,
              subTitle: validData.subTitle
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
          const validData = JSON.parse(editData.sysConfigJson)[0]
          if (mapObjectIsNull(['value'], validData)) {
            const pageUrl = apiList[pageName] + 'update'
            const data = await editPageData(pageUrl, {
              ...editData,
              subTitle: validData.subTitle
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
