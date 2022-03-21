/*
 * @Author: your name
 * @Date: 2022-03-18 15:00:37
 * @LastEditTime: 2022-03-18 15:57:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin/src/hooks/use-page-language.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref } from 'vue'
import { getCommonSelectList } from '@/service/common'

// 多语言配置管理
/**
 * @desc 根据用户传入不同的字段，生成不同的数组对象
 * @param field
 * @returns
 */
export function usePageLanguage(field: any, fieldID = 'languageId') {
  // 默认多语言列表
  const languageList = ref<any>([])
  const languageBtnList = ref<any>([])
  // 用户默认选中的语言
  const languageIndex = ref<number>(0)
  // 根据ID选中不同的值
  const languageId = ref<number>(0)
  const getLanguageList = () => {
    getCommonSelectList('language').then((res) => {
      if (res.state) {
        languageList.value = res!.data.map((item: any) => {
          return {
            [fieldID]: item.id,
            ...field
          }
        })
        languageBtnList.value = res!.data.map((item: any) => {
          return {
            ...item,
            [fieldID]: item.id
          }
        })
        if (languageList.value.length > 0) {
          languageId.value = languageList.value[0][fieldID]
        }
      } else errorTip(res.msg)
    })
  }
  // 新增时重置用户填写的值
  const resetLanguageList = () => {
    // 重置时这里拿上次存储的按钮列表，不能拿编辑后赋值的列表
    languageList.value = languageBtnList.value.map((item: any) => {
      return {
        [fieldID]: item.id,
        ...field
      }
    })
    if (languageList.value.length > 0) {
      languageId.value = languageList.value[0][fieldID]
    }
    console.log(languageList.value, 'lan')
  }
  getLanguageList()
  return [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageIndex
  ]
}
