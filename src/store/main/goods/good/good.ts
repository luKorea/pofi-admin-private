/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-10 14:15:17
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/finance/tradeRecord/tradeRecord.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase, validateParamsRules } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IGoodsItemType } from './types'
import { sortPageTableData } from '@/service/common-api'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'

const apiList: any = {
  goods: '/cms/goods/',
  sort: '/cms/recharge/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
// const requiredField = ['promotionNum']
// const requiredField = ['tagName']
const requiredField: any[] = []
const goodsItemModule: Module<IGoodsItemType, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsCount: 0,
      goodsList: []
    }
  },
  mutations: {
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
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
      queryInfo = {
        ...payload.queryInfo,
        show: -999
      }
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
      const pageUrl = apiList[pageName] + 'deleteGoods'
      const data = await deletePageToQueryData(pageUrl, {
        id: id,
        snId: payload.queryInfo.snId
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
        const validData = JSON.parse(newData.goodsTagJson)[0]
        validateParamsRules(
          JSON.parse(newData.goodsTagJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl = apiList[pageName] + 'addGoods'
            const data = await createPageData(pageUrl, {
              ...newData
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
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.?????????????????????
        const { pageName, editData } = payload
        const validData = JSON.parse(editData.goodsTagJson)[0]
        validateParamsRules(
          JSON.parse(editData.goodsTagJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl = apiList[pageName] + 'updateGoods'
            const data = await editPageData(pageUrl, {
              ...editData
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

export default goodsItemModule
