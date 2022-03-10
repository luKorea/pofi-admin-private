/* eslint-disable prefer-const */
/*
 * @Author: korealu
 * @Date: 2022-02-14 13:44:49
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-10 17:26:24
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
 * @description 这里做一层判断，（只是接口有点lol,正常接口不会）不是get请求的。剔除pageName后面的s
 * @param type
 * @param name
 * @returns url
 */
export const cultureDifferentType = (type: string, name: string): string => {
  let url = ''
  if (type === 'get') url = `${type}${firstToUpperCase(name)}`
  else {
    name = name.slice(0, name.length - 1)
    url = `${type}${firstToUpperCase(name)}`
  }
  return url
}

export function timeNow() {
  let vWeek, vWeek_s, year, month, day, hours, minutes, seconds
  vWeek = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const date = new Date()
  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()
  hours = date.getHours()
  hours = hours > 9 ? hours : '0' + hours
  minutes = date.getMinutes()
  minutes = minutes > 9 ? minutes : '0' + minutes
  seconds = date.getSeconds()
  seconds = seconds > 9 ? seconds : '0' + seconds
  vWeek_s = date.getDay()
  let time =
    year +
    '年' +
    month +
    '月' +
    day +
    '日' +
    '\t' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds +
    '\t' +
    vWeek[vWeek_s]
  return time
}

// 处理高级检索时间格式
export function mapTimeToSearch(date: any) {
  return {
    start: (date && date[0]) ?? undefined,
    end: (date && date[1]) ?? undefined
  }
}
// 处理当前系统环境
export function handleChangeEnv(env: number | string) {
  let title = 'Pofi Create 后台管理系统 · '
  let color = '#F5D67D'
  //   2：dev 开发
  // 3：pe 预发布
  // 4：prod 正式
  // 5：audit 审核
  switch (env) {
    case 2:
      title += '测试'
      color = '#95A9F5'
      break
    case 3:
      title += '预发布'
      color = '#F5D67D'
      break
    case 4:
      title += '正式'
      color = '#F596AA'
      break
    case 5:
      title += '审核'
      color = '#C0A2F5'
      break
  }
  return {
    title: title,
    color: color
  }
}
