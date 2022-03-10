import { getRouterSelectList } from '@/service/common'
/*
 * @Author: korealu
 * @Date: 2022-02-09 09:56:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-10 10:57:03
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/login/login.ts
 */
import { Module } from 'vuex'
import { errorTip } from '@/utils/tip-info'

import {
  accountLoginRequest,
  requestUserInfo,
  requestUserMenusByRoleId
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
      routerList: []
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

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      // const { id, token } = loginResult.data
      if (loginResult.state) {
        const { token } = loginResult
        commit('changeToken', token)
        localCache.setCache('token', token)
        // successTip('登录成功')
        // 发送初始化的请求(完整的role/department)
        // dispatch('getInitialDataAction', null, { root: true })

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
          // 4.跳到首页
          router.push('/main')
        } else errorTip(userInfoResult.msg)
      } else {
        errorTip(loginResult.msg)
      }
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
    }
  }
}

export default loginModule
