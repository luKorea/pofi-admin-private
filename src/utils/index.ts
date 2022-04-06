/* eslint-disable prefer-const */
/*
 * @Author: korealu
 * @Date: 2022-02-14 13:44:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 14:35:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/index.ts
 */
import type { App, Plugin } from 'vue'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import Clipboard from 'clipboard'
import { successTip, errorTip } from '@/utils/tip-info'
import { Base64 } from 'js-base64'

let loading: ILoadingInstance

export function showLoading() {
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(250, 250, 250, 1)'
  })
}
export function hideLoading() {
  loading?.close()
}

// export const withInstall = <T>(component: T, alias?: string) => {
//   const comp = component as any
//   comp.install = (app: App) => {
//     app.component(comp.name || comp.displayName, component)
//     if (alias) {
//       app.config.globalProperties[alias] = component
//     }
//   }
//   return component as T & Plugin
// }

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
  return (
    list &&
    list.length > 0 &&
    list.find((item: any) => item.value === selectValue).title
  )
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

// 判断必填字段是否为空
export function mapObjectIsNull(params: any[], obj: any) {
  return params.filter((v) => obj[v]).length === params.length
}

//判断文件是图片
export function fileTypeIsImage(fileName: string) {
  // 后缀获取
  let suffix = ''
  // 获取类型结果
  let result: any
  try {
    const flieArr = fileName.split('.')
    suffix = flieArr[flieArr.length - 1]
  } catch (err) {
    suffix = ''
  }
  // fileName无后缀返回 false
  if (!suffix) {
    return false
  }
  suffix = suffix.toLocaleLowerCase()
  // 图片格式
  const imglist = [
    'png',
    'jpg',
    'jpeg',
    'bmp',
    'gif',
    'webp',
    'psd',
    'svg',
    'tiff'
  ]
  // 进行图片匹配
  result = imglist.find((item) => item === suffix)
  if (result) {
    return 'image'
  }
  // 匹配txt
  const txtlist = ['txt']
  result = txtlist.find((item) => item === suffix)
  if (result) {
    return 'txt'
  }
  // 匹配 excel
  const excelist = ['xls', 'xlsx']
  result = excelist.find((item) => item === suffix)
  if (result) {
    return 'excel'
  }
  // 匹配 word
  const wordlist = ['doc', 'docx']
  result = wordlist.find((item) => item === suffix)
  if (result) {
    return 'word'
  }
  // 匹配 pdf
  const pdflist = ['pdf']
  result = pdflist.find((item) => item === suffix)
  if (result) {
    return 'pdf'
  }
  // 匹配 ppt
  const pptlist = ['ppt', 'pptx']
  result = pptlist.find((item) => item === suffix)
  if (result) {
    return 'ppt'
  }
  // 匹配 视频
  const videolist = [
    'mp4',
    'm2v',
    'mkv',
    'rmvb',
    'wmv',
    'avi',
    'flv',
    'mov',
    'm4v'
  ]
  result = videolist.find((item) => item === suffix)
  if (result) {
    return 'video'
  }
  // 匹配 音频
  const radiolist = ['mp3', 'wav', 'wmv']
  result = radiolist.find((item) => item === suffix)
  if (result) {
    return 'radio'
  }
  // 其他 文件类型
  return 'other'
}

/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
export function createUniqueString(): string {
  const timestamp = +new Date() + ''
  const randomNum = (1 + Math.random()) * 65536 + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 数字存储大小格式化
 * @param {number} num 存储大小 单位：Byte
 * @param {number} digits 保留几位小数，默认2
 * @return {string} 2MB
 */
export function formatStorage(num: number, digits?: number) {
  digits = digits || 2
  if (num < 1024) {
    return num + 'B'
  }
  num = (num * 1000) / 1024
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
        si[i].symbol +
        'B'
      )
    }
  }
}

// 节流函数
type CallBack = (...args: any) => void

export function _debounce(cb: CallBack, delay = 100, immediate = false) {
  let timer: any = null
  let isInvoke = false
  const _ = function (this: any, ...args: any) {
    if (timer) clearTimeout(timer)
    if (immediate && !isInvoke) {
      cb.apply(this, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        cb.apply(this, args)
        isInvoke = false
      }, delay)
    }
  }
  return _
}

// 复制到剪切板

export function clipboardText(element: any) {
  let clipboard = new Clipboard(element)
  clipboard.on('success', () => {
    successTip('复制成功')
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    // 不支持复制
    //console.log('该浏览器不支持自动复制')
    // 释放内存
    errorTip('该浏览器不支持自动复制')
    clipboard.destroy()
  })
}

// 返回不同链接类型
export function decryType(type: any, otherInfo: any, res: any) {
  type = +type
  if (type === 1) {
    otherInfo.title = res.data.title
    otherInfo.url = Base64.decode(res.data.url)
  } else if (type === 3) {
    otherInfo.funcType = +res.data.funcType
  } else if (type === 5) {
    otherInfo.moId = res.data.id
  } else if (type === 6) {
    otherInfo.topicId = res.data.id
  } else if (type === 13) {
    otherInfo.packagename = res.data.packagename
  } else if (type === 15) {
    otherInfo.url = Base64.decode(res.data.url)
  } else if (type === 17) {
    otherInfo.email = res.data.recipient
  } else if (type === 19) {
    otherInfo.qaId = parseInt(res.data.id)
  } else if (type === 21) {
    otherInfo.guideId = parseInt(res.data.id)
  } else if (type === 23) {
    otherInfo.configName = res.data.config
  } else if (type === 24) {
    otherInfo.msId = res.data.id
  } else if (type === 9) {
    otherInfo.jumpKeyword = Base64.decode(res.data.word)
  }
  return otherInfo
}
