/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 16:50:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/date-format.ts
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY/MM/DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
export function formatDateString(utcString: string, format = 'YYYY/MM/DD') {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

export function getExpirationTime(utcString: string) {
  const nowTime = dayjs().valueOf()
  const lastTime = dayjs.utc(utcString).utcOffset(8).valueOf()
  if (nowTime >= lastTime) return '已过期'
  else {
    const date = dayjs(lastTime)
    return '剩余' + Number(date.diff(dayjs(nowTime), 'day')) + '天'
  }
}

// export function getRemainingDays(time: any) {
//   console.log(1)
// }
