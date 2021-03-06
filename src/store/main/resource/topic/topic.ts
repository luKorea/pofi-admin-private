/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-07 10:17:24
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
import { IResourceTopicType } from './types'

import {
  getPageListData,
  createPageData,
  editPageData,
  deletePageToQueryData
} from '@/service/common-api'
import { sortPageTableData } from '@/service/common-api'

const apiList: any = {
  topics: '/cms/topic/',
  sort: '/cms/topic/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['name', 'subTitle', 'desc']
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
      const mtId = payload.queryInfo.mtId
      const pageUrl =
        apiList[pageName] + cultureDifferentType('delete', pageName)
      const data = await deletePageToQueryData(pageUrl, {
        mtId: mtId
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
        console.log(newData)
        const validData = JSON.parse(newData.topicJson)[0]
        validateParamsRules(
          JSON.parse(newData.topicJson),
          validData,
          requiredField
        )
          .then(async () => {
            // const item = newData.tempList[0]
            // let list: any[] = []
            // if (item.childListStr.length > 0) {
            //   list = item.childListStr.map((i: any) => {
            //     return {
            //       mid: i.mid
            //     }
            //   })
            // }
            // let res: any[] = []
            // if (list.length > 0) {
            //   res = newData.tempList.map((i: any) => {
            //     if (i.childListStr.length === 0) {
            //       i.childListStr = JSON.stringify(
            //         list.map((c: any) => {
            //           return {
            //             ...c,
            //             lid: i.lid
            //           }
            //         })
            //       )
            //       return {
            //         ...i
            //       }
            //     } else {
            //       return {
            //         ...i
            //       }
            //     }
            //   })
            // }
            // console.log(res, 'result')
            const pageUrl =
              apiList[pageName] + cultureDifferentType('add', pageName)
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
        const validData = JSON.parse(editData.topicJson)[0]
        validateParamsRules(
          JSON.parse(editData.topicJson),
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

export default resourceTopicModule
