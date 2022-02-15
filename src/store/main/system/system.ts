import { cultureDifferentType, firstToUpperCase } from '@/utils/index'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const apiList: any = {
  users: '/cms/user/',
  roles: '/cms/role/',
  permissions: '/cms/permission/',
  router: '/cms/router/'
}
const queryInfo: any = {
  currentPage: 0,
  pageSize: 10
}
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      rolesList: [],
      rolesCount: 0,
      permissionsList: [],
      permissionsCount: 0,
      routerList: [],
      routerCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRolesList(state, list: any[]) {
      state.rolesList = list
    },
    changeRolesCount(state, count: number) {
      state.rolesCount = count
    },
    changePermissionsList(state, list: any[]) {
      state.permissionsList = list
    },
    changePermissionsCount(state, count: number) {
      state.permissionsCount = count
    },
    changeRouterList(state, list: any[]) {
      state.routerList = list
    },
    changeRouterCount(state, count: number) {
      state.routerCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
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
      // TODO 这个action会在用户操作增删改后调用它，在这些操作中，
      //  传递过来的pageName无需做任何处理，例如: user，就按user返回就行，这里会做一层处理
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = apiList[pageName] + cultureDifferentType('get', pageName)
      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      console.log(pageResult)
      // const { list, totalCount } = pageResult.data
      const { data, totalCount = 0 } = pageResult as any
      const changePageName = firstToUpperCase(pageName)
      commit(`change${changePageName}List`, data)
      // 处理oa下没有返回totalCount
      if (pageName === 'users') {
        commit(`change${changePageName}Count`, data.length)
      } else {
        commit(`change${changePageName}Count`, totalCount)
      }
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      // pageName -> /users
      // id -> /users/id
      // const pageUrl = `/${pageName}/${id}`
      const pageName = payload.pageName
      const pageUrl = apiList[pageName] + cultureDifferentType('del', pageName)
      // 2.调用删除网络请求
      await deletePageData(pageUrl, payload.data)

      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName, // 这里的pageName，无需处理，在getPageListAction会处理
        queryInfo: queryInfo
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = apiList[pageName] + cultureDifferentType('add', pageName)
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: queryInfo
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData } = payload
      const pageUrl =
        apiList[pageName] + cultureDifferentType('update', pageName)
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: queryInfo
      })
    }
  }
}

export default systemModule
