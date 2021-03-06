import { mapTypeState } from '@/utils/index'
/*
 * @Author: korealu
 * @Date: 2022-02-16 16:53:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-15 17:18:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/main/finance/pay/pay.ts
 */
import { errorTip, successTip } from '@/utils/tip-info'
import { firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IUserOperationType } from './types'

import {
  getPageListData,
  editPageData,
  deletePageToQueryData,
  createPageDataJSON
} from '@/service/common-api'

const apiList: any = {
  userOperations: '/cms/userInfo/',
  log: '/cms/userInfo/'
}
let queryInfo: any = {
  currentPage: 1,
  pageSize: 10
}
const userOperationModule: Module<IUserOperationType, IRootState> = {
  namespaced: true,
  state() {
    return {
      userOperationsCount: 0,
      userOperationsList: [],
      logCount: 0,
      logList: []
    }
  },
  mutations: {
    changeUserOperationsList(state, userOperationsList: any[]) {
      state.userOperationsList = userOperationsList
    },
    changeUserOperationsCount(state, userOperationsCount: number) {
      state.userOperationsCount = userOperationsCount
    },
    changeLogList(state, logList: any[]) {
      state.logList = logList
    },
    changeLogCount(state, logCount: number) {
      state.logCount = logCount
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
      const pageUrl =
        apiList[pageName] +
        (pageName === 'userOperations' ? 'getRecords' : 'log')
      console.log(queryInfo, 'info')
      const backQueryInfo = {
        ...queryInfo,
        srcType:
          queryInfo.srcType !== '' && queryInfo.srcType !== undefined
            ? queryInfo.srcType
            : -999,
        isReal:
          queryInfo.isReal !== '' && queryInfo.isReal !== undefined
            ? queryInfo.isReal
            : -999,
        status:
          queryInfo.status !== '' && queryInfo.status !== undefined
            ? queryInfo.status
            : -999,
        markId:
          queryInfo.markId !== '' && queryInfo.markId !== undefined
            ? queryInfo.markId
            : -999,
        areaId:
          queryInfo.areaId !== '' && queryInfo.areaId !== undefined
            ? queryInfo.areaId
            : -999
      }
      console.log(payload.queryInfo)
      const pageResult = await getPageListData(
        pageUrl,
        pageName === 'userOperations' ? backQueryInfo : queryInfo
      )
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
      const pageUrl = apiList[pageName] + 'delLimit'
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
        const pageUrl = apiList[pageName] + 'add'
        const result = {
          ...newData,
          apple: newData.appleId,
          google: newData.googleId,
          pwd: newData.pwd ? newData.pwd : undefined,
          facebook: newData.facebookId
        }
        console.log(result, 'newData')
        const data = await createPageDataJSON(pageUrl, result)
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
        const pageUrl = apiList[pageName] + 'update'
        const result = {
          nickId: editData.nickId,
          jobId: editData.jobId,
          head: editData.head,
          nickName: editData.nickName,
          gender: editData.gender,
          birthday: editData.birthday,
          region: editData.region,
          province: editData.province,
          city: editData.city,
          interest: editData.interest,
          status: editData.status,
          apple: editData.appleId,
          google: editData.googleId,
          facebook: editData.facebookId,
          mark: editData.mark,
          pwd: editData.pwd ? editData.pwd : undefined,
          phone: editData.phone,
          email: editData.email,
          remark: editData.remark
        }
        console.log(result, '????????????????????????')
        const data = await editPageData(pageUrl, result)
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

export default userOperationModule
