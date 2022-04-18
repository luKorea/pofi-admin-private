/*
 * @Author: korealu
 * @Date: 2022-02-14 09:33:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-18 20:13:23
 * @Description: 封装公用文字提示
 * @FilePath: /pofi-admin/src/utils/tip-info.ts
 */
import { ElMessage, ElMessageBox } from 'element-plus'
import { MessageType } from 'element-plus/lib/el-message/src/types'
export const errorTip = (message = '操作失败') => {
  ElMessage({
    message: message,
    type: 'error',
    duration: 1000
  })
}

export const warnTip = (message = '操作失败') => {
  ElMessage({
    message: message,
    type: 'warning',
    duration: 1000
  })
}

export const successTip = (message = '操作成功') => {
  ElMessage({
    message: message,
    type: 'success',
    duration: 1000
  })
}

interface MessageInfo {
  message: string
  title: string
  confirmButtonText?: string
  cancelButtonText?: string
  iconType?: MessageType
}

export const infoTipBox = (info: MessageInfo) => {
  return new Promise<void>((resolve, reject) => {
    ElMessageBox.confirm(info.message, info.title, {
      confirmButtonText: info.confirmButtonText ?? '确定',
      cancelButtonText: info.cancelButtonText ?? '取消',
      type: info.iconType ?? 'warning',
      closeOnClickModal: true,
      closeOnPressEscape: false,
      showClose: false,
      distinguishCancelAndClose: true
    })
      .then(() => resolve())
      .catch((action: any) => reject(action))
  })
}
