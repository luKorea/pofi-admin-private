/*
 * @Author: your name
 * @Date: 2022-03-18 15:00:37
 * @LastEditTime: 2022-04-06 14:44:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin/src/hooks/use-page-language.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { mapObjectIsNull } from '@/utils'

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
            [fieldID]: item.id,
            icon: 'el-icon-warning'
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
    languageBtnList.value = languageBtnList.value.map((item: any) => {
      return {
        ...item,
        icon: 'el-icon-warning'
      }
    })
    if (languageList.value.length > 0) {
      languageId.value = languageList.value[0][fieldID]
    }
  }
  // 根据后台返回的数据，动态设置语言icon状态
  /**
   *
   * @param backList
   * @param field
   * @param fieldType
   */
  const mapIconState = (backList: any[], field: any[], fieldType = 'lid') => {
    if (backList && backList.length > 0) {
      backList.forEach((item: any) => {
        const iconItem = languageBtnList.value.find(
          (i: any) => i[fieldType] === item[fieldType]
        )
        if (mapObjectIsNull(field, item)) {
          iconItem!.icon = 'el-icon-success'
        } else {
          iconItem!.icon = 'el-icon-warning'
        }
      })
    }
  }
  // 设置单个语言Icon
  /**
   *
   * @param field
   * @param languageItem
   * @param fieldType
   */
  const mapItemIcon = (field: any[], languageItem: any, fieldType = 'lid') => {
    const item = languageBtnList.value.find(
      (item: any) => item[fieldType] === languageItem[fieldType]
    )
    if (mapObjectIsNull(field, languageItem)) {
      item!.icon = 'el-icon-success'
    } else {
      item!.icon = 'el-icon-warning'
    }
  }
  getLanguageList()
  return [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    mapIconState,
    mapItemIcon
  ]
}
