import { getRouterSelectList } from '@/service/common'
/*
 * @Author: korealu
 * @Date: 2022-02-09 09:56:39
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-05 12:11:07
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/login/login.ts
 */
import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfo,
  requestUserMenusByRoleId,
  checkUserIsAdmin
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import router from '@/router'

import { IAccount } from '@/service/login/type'
// import { ILoginState } from './types'
// import { IRootState } from '../types'

const loginModule: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: [],
      routerList: [],
      isAdmin: false // 判断用户是否是超管
    }
  },
  getters: {},
  mutations: {
    changeRouterList(state, data) {
      state.routerList = data
    },
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)
      // 将routes => router.main.children
      routes.forEach((route) => router.addRoute('main', route))
      console.log(routes, 'routes')
      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    },
    changeIsAdmin(state, isAdmin: boolean) {
      state.isAdmin = isAdmin
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        // 1.实现登录逻辑
        const loginResult = await accountLoginRequest(payload)
        if (loginResult.state) {
          const { token } = loginResult
          commit('changeToken', token)
          localCache.setCache('token', token)
          // 2.请求用户信息
          const userInfoResult = await requestUserInfo()
          const userInfo = userInfoResult.data
          if (userInfoResult.data) {
            commit('changeUserInfo', userInfo)
            localCache.setCache('userInfo', userInfo)

            // 3.请求用户菜单
            const userMenusResult = await requestUserMenusByRoleId()
            const userMenus = userMenusResult.result
            commit('changeUserMenus', userMenus)
            localCache.setCache('userMenus', userMenus)
            // 4. 获取菜单列表
            const { data } = await getRouterSelectList()
            commit('changeRouterList', data)
            localCache.setCache('routerList', data)
            // 5. 校验用户是否是超级管理员，后续页面按钮，表单编辑权限分配
            const { data: isAdmin } = await checkUserIsAdmin()
            commit('changeIsAdmin', isAdmin)
            localCache.setCache('isAdmin', isAdmin)
            // 6.跳到首页, 判断用户是否已经登录，验证码校验
            resolve(loginResult)
          } else reject(userInfoResult.msg)
        } else {
          reject(loginResult.msg)
        }
      })
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求(完整的role/department)
        // dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo && userInfo !== undefined) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
      const routerList = localCache.getCache('routerList')
      if (routerList) {
        commit('changeRouterList', routerList)
      }
      const isAdmin = localCache.getCache('isAdmin')
      if (isAdmin) {
        commit('changeIsAdmin', isAdmin)
      }
    }
  }
}

export default loginModule
