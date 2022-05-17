/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-17 10:27:48
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
import { IResourceHomeType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'
import { sortPageTableData } from '@/service/common-api'
import { useMapCountry } from '@/hooks/use-page-side-country'
import { nextTick } from 'vue'

const apiList: any = {
  resourceHomes: '/cms/index/',
  sort: '/cms/index/updateSort'
}
function unique(arr: any) {
  const res: any = new Set()
  return arr.filter((item: any) => {
    const id = item.tid
    if (res.has(id)) {
      return false
    } else {
      res.add(id)
      return true
    }
  })
}
// 这里获取第一位数据
const { handleCountryList } = useMapCountry(false)
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['title']
const resourceHomeModule: Module<IResourceHomeType, IRootState> = {
  namespaced: true,
  state() {
    return {
      resourceHomesCount: 0,
      resourceHomesList: []
    }
  },
  mutations: {
    changeResourceHomesList(state, resourceHomesList: any[]) {
      state.resourceHomesList = resourceHomesList
    },
    changeResourceHomesCount(state, resourceHomesCount: number) {
      state.resourceHomesCount = resourceHomesCount
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
        rid: queryInfo.rid ?? handleCountryList.value[0].id
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
      const pageUrl = apiList[pageName] + 'delIndex'
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
        // 1.新增数据的请求
        const { pageName, editData } = payload
        const validData = editData.indexJson[0]
        validateParamsRules(editData.indexJson, validData, requiredField)
          .then(async () => {
            console.log(editData.indexJson, 'data')
            const info = editData.indexJson.map((item: any) => {
              return {
                id: item.id,
                title: item.title,
                lid: item.lid,
                tid: item.tid,
                childListStr: JSON.stringify(unique(item.childListStr ?? [])),
                length: unique(item.childListStr ?? []).length
              }
            })
            console.log(info, 'infdo')
            await nextTick()
            console.log(info, 'info')
            editData.indexJson = JSON.stringify(info)
            console.log(editData.indexJson, 'indexJSON')
            const pageUrl = apiList[pageName] + 'addIndex'
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

    async editPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.编辑数据的请求
        const { pageName, editData } = payload
        const validData = editData.indexJson[0]
        validateParamsRules(editData.indexJson, validData, requiredField)
          .then(async () => {
            console.log(editData.indexJson, 'data')
            const info = editData.indexJson.map((item: any) => {
              return {
                id: item.id,
                title: item.title,
                lid: item.lid,
                tid: item.tid,
                childListStr: JSON.stringify(unique(item.childListStr ?? [])),
                length: unique(item.childListStr ?? []).length
              }
            })
            console.log(info, 'infdo')
            await nextTick()
            console.log(info, 'info')
            editData.indexJson = JSON.stringify(info)
            console.log(editData.indexJson, 'indexJSON')
            const pageUrl = apiList[pageName] + 'updateIndex'
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
        console.log(queryInfo, 'info')
        const data = await sortPageTableData(apiList.sort, {
          ...sortData
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
    }
  }
}

export default resourceHomeModule
