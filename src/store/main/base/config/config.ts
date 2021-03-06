/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-07 11:01:44
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
import { IBaseConfigType } from './types'

import {
  getPageListData,
  deletePageToQueryData,
  createPageData,
  editPageData
} from '@/service/common-api'
import { successTip, errorTip } from '@/utils/tip-info'

const apiList: any = {
  records: '/cms/config/'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const requiredField = ['value']
const baseConfigModule: Module<IBaseConfigType, IRootState> = {
  namespaced: true,
  state() {
    return {
      recordsCount: 0,
      recordsList: []
    }
  },
  mutations: {
    changeRecordsList(state, recordsList: any[]) {
      state.recordsList = recordsList
    },
    changeRecordsCount(state, recordsCount: number) {
      state.recordsCount = recordsCount
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
      const data = await deletePageToQueryData(pageUrl, { id: id, name: name })
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
        const validData = JSON.parse(newData.sysConfigJson)[0]
        validateParamsRules(
          JSON.parse(newData.sysConfigJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl = apiList[pageName] + 'add'
            const data = await createPageData(pageUrl, {
              ...newData,
              subTitle: validData.subTitle
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
        const validData = JSON.parse(editData.sysConfigJson)[0]
        validateParamsRules(
          JSON.parse(editData.sysConfigJson),
          validData,
          requiredField
        )
          .then(async () => {
            const pageUrl = apiList[pageName] + 'update'
            const data = await editPageData(pageUrl, {
              ...editData,
              subTitle: validData.subTitle
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
    }
  }
}

export default baseConfigModule
