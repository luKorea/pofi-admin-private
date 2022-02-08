/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-08 18:27:52
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/index.ts
 */
import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import cache from '@/utils/cache'

import { getPageListData } from '@/service/main/system/system'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
      tagsList: []
    }
  },
  mutations: {
    saveTagsListToLocal(_, list) {
      cache.setCache('tagsList', list)
    },
    addTagsListToStore(state, list) {
      state.tagsList.push(list)
    },
    removeTagsListToStore(state, list) {
      state.tagsList = list
    },
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    // 本地保存用户点击的路由，刷新页面不丢失
    saveTagsList({ commit }, payload) {
      commit('saveTagsListToLocal', payload)
    },
    // 点击侧边栏将路由添加到tagsList
    addTags({ commit, state }, payload) {
      console.log(state.tagsList)
      commit('addTagsListToStore', payload)
    },
    // 移除tagsList
    removeTags({ commit }, payload) {
      commit('removeTagsListToStore', payload)
    },
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
