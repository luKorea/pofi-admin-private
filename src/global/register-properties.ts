/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 17:28:19
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/register-properties.ts
 */
import type { App } from 'vue'

import { formatUtcString } from '@/utils/date-format'

export default function registerProperties(app: App) {
  const APP = app.config.globalProperties
  APP.$filters = {
    // 日期时间过滤器
    formatTime(value: string) {
      return formatUtcString(value)
    },
    formatMoney(value: any) {
      return value ? (+value / 100).toFixed(2) + 'P币' : 0 + 'P币'
    }
  }
  console.log(APP, 'Vue全局配置')
}
