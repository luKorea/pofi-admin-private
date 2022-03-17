/* eslint-disable prefer-const */
/*
 * @Author: korealu
 * @Date: 2022-02-14 13:44:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 13:59:31
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
  let start = undefined
  let end = undefined
  if (date !== null && date[0]) {
    if (date[0] === '') {
      start = undefined
    }
    start = date[0]
  }
  if (date !== null && date[1]) {
    if (date[1] === '') {
      end = undefined
    }
    end = date[1]
  }
  console.log(start, end, '开始时间-结束时间')
  return {
    start,
    end
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

/**
 * @desc 处理表格中返回的类型值
 * @param selectValue
 * @param list
 * @returns
 */
export function mapSelectListTitle(selectValue: string | number, list: any[]) {
  return list.find((item: any) => item.value === selectValue).title
}

// 处理默认值
export function mapTypeState(type: any) {
  return type && type !== '' ? type : -999
}
// 处理图片返回处理成对象
export function mapImageToObject(url: string) {
  if (url && url !== '') {
    const imgSplit = url.split('/')
    const imgName =
      imgSplit[imgSplit.length - 2] + '/' + imgSplit[imgSplit.length - 1]
    return {
      name: imgName,
      url: url
    }
  }
}
