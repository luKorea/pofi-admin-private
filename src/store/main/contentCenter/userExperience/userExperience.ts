/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-13 17:15:05
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/finance/tradeRecord/tradeRecord.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IUserExperienceType } from './types'
import { sortPageTableData } from '@/service/common-api'

import {
  getPageListData,
  createPageDataJSON,
  editPageDataJSON,
  deletePageToQueryData
} from '@/service/common-api'

const apiList: any = {
  userExperiences: '/cms/feels/',
  sort: '/cms/feels/updateSort'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10,
  type: 1
}
const userExperienceModule: Module<IUserExperienceType, IRootState> = {
  namespaced: true,
  state() {
    return {
      userExperiencesCount: 0,
      userExperiencesList: []
    }
  },
  mutations: {
    changeUserExperiencesList(state, userExperiencesList: any[]) {
      state.userExperiencesList = userExperiencesList
    },
    changeUserExperiencesCount(state, userExperiencesCount: number) {
      state.userExperiencesCount = userExperiencesCount
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
        type: 1,
        ...queryInfo
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
      const pageUrl = apiList[pageName] + 'deleteFeels'
      const data = await deletePageToQueryData(pageUrl, { id: id })
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
        const pageUrl = apiList[pageName] + 'addFeels'
        const data = await createPageDataJSON(pageUrl, {
          ...newData,
          type: 1,
          prep: newData.prep ? newData.prep.toString() : undefined,
          subPrep: newData.subPrep ? newData.subPrep.toString() : undefined
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
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<any>(async (resolve, reject) => {
        // 1.?????????????????????
        const { pageName, editData } = payload
        const pageUrl = apiList[pageName] + 'updateFeels'
        const data = await editPageDataJSON(pageUrl, {
          ...editData,
          type: 1,
          prep: editData.prep ? editData.prep.toString() : undefined,
          subPrep: editData.subPrep ? editData.subPrep.toString() : undefined
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

export default userExperienceModule
