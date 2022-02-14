/*
 * @Author: korealu
 * @Date: 2022-02-14 09:33:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-14 10:31:19
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
  confirmButtonText: string
  cancelButtonText: string
  iconType: MessageType
}

export const infoTipBox = (info: MessageInfo) => {
  return new Promise<void>((resolve, reject) => {
    ElMessageBox.confirm(info.message, info.title, {
      confirmButtonText: info.confirmButtonText,
      cancelButtonText: info.cancelButtonText,
      type: info.iconType,
      closeOnClickModal: false,
      closeOnPressEscape: false
    })
      .then(() => resolve())
      .catch(() => reject('用户取消操作'))
  })
}
