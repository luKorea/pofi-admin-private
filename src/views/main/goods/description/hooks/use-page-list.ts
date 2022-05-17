/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-17 14:23:15
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref, computed, watchEffect, nextTick } from 'vue'
import { usePageLanguage } from '@/hooks/use-page-language'
import { searchFormConfig } from '../config/search.config'
import { modalConfig } from '../config/modal.config'
import { getCommonSelectList } from '@/service/common'
import { errorTip } from '@/utils/tip-info'
import {
  articleList,
  memberTypeList
} from '@/utils/select-list/map-resource-list'

export const equityList = ref<any>()

export function useMapFormData() {
  const searchFormConfigRef = computed(() => {
    const typeItem = searchFormConfig.formItems.find(
      (i: any) => i.field === 'type'
    )
    const funcItem = searchFormConfig.formItems.find(
      (i: any) => i.field === 'funcType'
    )
    typeItem!.options = articleList
    funcItem!.options = memberTypeList
    return searchFormConfig
  })

  const modalConfigRef = computed(() => {
    const typeItem = modalConfig.formItems.find((i: any) => i.field === 'type')
    const funcItem = modalConfig.formItems.find(
      (i: any) => i.field === 'funcType'
    )
    const parentItem = modalConfig.formItems.find(
      (i: any) => i.field === 'parentId'
    )
    typeItem!.options = articleList
    funcItem!.options = memberTypeList
    parentItem!.options = equityList.value
    return modalConfig
  })

  return {
    searchFormConfigRef,
    modalConfigRef,
    modalConfig,
    articleList,
    memberTypeList
  }
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'goodsDescriptionModule/getPageListAction',
    actionListName: 'goodsDescriptionModule/pageListData',
    actionCountName: 'goodsDescriptionModule/pageListCount',
    deleteAction: 'goodsDescriptionModule/deletePageDataAction',
    sortAction: 'goodsDescriptionModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'goodsDescriptionModule/editPageDataAction',
    createName: 'goodsDescriptionModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useSetLanguage() {
  const editorRef = ref<any>()
  // 这里的必填字段，以及表单字段需要根据用户选择的文章类型做区分
  // 版本文案
  const versionItem = ref<any>({
    vipName: '', // 版本名称
    enName: '', // 代号
    desc: '', // 版本描述
    subDesc: '', // 版本副描述
    discountLabel: '' // 优惠标签
  })
  const versionField = ref<any>(['vipName', 'enName', 'desc', 'subDesc'])
  // 权益分类
  const benefitItem = ref<any>({
    benefitName: '', // 权益分类
    benefitLabel: '', // 副标题
    benefitSubtitle: '', // 内标题1
    benefitThreetitle: '', // 内标题2
    benefitDesc: '' // 内描述
  })
  const benefitField = ref<any>([
    'benefitName',
    'benefitLabel',
    'benefitSubtitle',
    'benefitThreetitle',
    'benefitDesc'
  ])
  // 功能
  const functionItem = ref<any>({
    funcName: '', // 功能名称
    funcFile: '', // 演示图(或视频)
    imgList: [],
    funcSubtitle: '', // 全称
    funcDesc: '', // 描述
    funcTips: '' // 小提示
  })
  const functionField = ref<any>(['funcName', 'funcSubtitle', 'funcDesc'])
  // 特权
  const privilegeItem = ref<any>({
    privilegeName: '', // 特权名称
    funcFile: '', // 演示图(或视频)
    imgList: [],
    privilegeName2: '', // 全称
    privilegeDesc: '', // 描述
    privilegeButName: '' // 按钮名称
  })
  const privilegeField = ref<any>([
    'privilegeName',
    'privilegeName2',
    'privilegeDesc'
  ])
  // 富文本
  const editorItem = ref<any>({
    ghost: ''
  })
  const editorField = ref<any>(['ghost'])
  // 映射赋值
  const requiredField = ref<any>([])
  const selectItem = ref<any>()
  const mapDifferentLanguage = async (type: number) => {
    switch (type) {
      case 1:
        selectItem.value = versionItem.value
        requiredField.value = versionField.value
        await getLanguageList(selectItem.value, 'lid')
        break
      case 2:
        selectItem.value = benefitItem.value
        requiredField.value = benefitField.value
        await getLanguageList(selectItem.value, 'lid')
        break
      case 3:
        selectItem.value = functionItem.value
        requiredField.value = functionField.value
        await getLanguageList(selectItem.value, 'lid')
        break
      case 4:
        selectItem.value = privilegeItem.value
        requiredField.value = privilegeField.value
        await getLanguageList(selectItem.value, 'lid')
        break
      case 5:
        selectItem.value = editorItem.value
        requiredField.value = editorField.value
        await getLanguageList(selectItem.value, 'lid')
        break
      default:
        selectItem.value = {}
        requiredField.value = []
    }
  }
  const mapDifferentRequired = (type: number) => {
    switch (type) {
      case 1:
        requiredField.value = versionField.value
        break
      case 2:
        requiredField.value = benefitField.value
        break
      case 3:
        requiredField.value = functionField.value
        break
      case 4:
        requiredField.value = privilegeField.value
        break
      case 5:
        requiredField.value = editorField.value
        break
      default:
        requiredField.value = []
    }
  }
  const [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    mapIconState,
    mapItemIcon,
    getLanguageList
  ] = usePageLanguage(selectItem.value, 'lid')
  const languageItem = computed(() => {
    return languageList.value.find((item: any) => item.lid === languageId.value)
  })
  watchEffect(() => {
    if (languageItem.value && requiredField.value.length > 0) {
      mapItemIcon(requiredField.value, languageItem.value)
    }
  })
  // 改变多语言
  const handleChangeLanguage = async (id: any) => {
    languageId.value = id
    await nextTick()
    try {
      editorRef.value.setEditorValue()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    editorRef,
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    handleChangeLanguage,
    requiredField,
    mapIconState,
    mapDifferentLanguage,
    mapDifferentRequired
  }
}

export function usePageList() {
  const jumpList = ref<any>([])
  // 指南。系列，问题,VIP类型
  const otherList = ref<any>({
    guideList: [],
    seriesList: [],
    questionList: [],
    vipList: [
      {
        value: 0,
        title: 'Free'
      },
      {
        value: 1,
        title: 'Pro'
      },
      {
        value: 2,
        title: 'Plus'
      }
    ]
  })
  const getOtherList = () => {
    getCommonSelectList('jumpOtherType').then((res) => {
      if (res.state) {
        const data = res.data
        otherList.value!.guideList = data!.guideList
        otherList.value!.seriesList = data!.seriesList
        otherList.value!.questionList = data!.qaList
      } else errorTip(res.msg)
    })
  }
  const getJumpList = () => {
    getCommonSelectList('jumpType').then((res) => {
      if (res.state) {
        let result = res.data as any[]
        result = result.filter((item: any) => item.type !== -999)
        jumpList.value = result
      } else errorTip(res.msg)
    })
  }
  const getEquityList = (funcType: any) => {
    getCommonSelectList('equityType', { funcType: funcType }, false).then(
      (res) => {
        if (res.state) {
          const result = res.data as any[]
          equityList.value = result.map((item: any) => {
            return {
              title: item.name,
              value: item.id
            }
          })
        } else errorTip(res.msg)
      }
    )
  }
  getOtherList()
  getJumpList()
  getEquityList(undefined)
  return [jumpList, otherList, getEquityList]
}
