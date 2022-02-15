/*
 * @Author: korealu
 * @Date: 2022-02-14 13:44:49
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-15 10:39:12
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/index.ts
 */
import type { App, Plugin } from 'vue'
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

// 将用户传递的名字首字母大写处理
export const firstToUpperCase = (name: string) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1)
}

// 处理用户传递的类型，生成不同的请求API

/**
 * @method cultureDifferentType
 * @param type
 * @param name
 * @returns
 */
export const cultureDifferentType = (type: string, name: string) => {
  switch (type) {
    case 'get':
      return `${type}${firstToUpperCase(name)}`
      break
    case 'add':
      return `${type}${firstToUpperCase(name)}`
      break
    case 'update':
      return `${type}${firstToUpperCase(name)}`
      break
    case 'del':
      return `${type}${firstToUpperCase(name)}`
      break
  }
}
