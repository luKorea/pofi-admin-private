/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-16 10:21:29
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
  // ??????????????????????????????????????????????????????????????????????????????????????????
  // ????????????
  const versionItem = ref<any>({
    vipName: '', // ????????????
    enName: '', // ??????
    desc: '', // ????????????
    subDesc: '', // ???????????????
    discountLabel: '' // ????????????
  })
  const versionField = ref<any>(['vipName', 'enName', 'desc', 'subDesc'])
  // ????????????
  const benefitItem = ref<any>({
    benefitName: '', // ????????????
    benefitLabel: '', // ?????????
    benefitSubtitle: '', // ?????????1
    benefitThreetitle: '', // ?????????2
    benefitDesc: '' // ?????????
  })
  const benefitField = ref<any>([
    'benefitName',
    'benefitLabel',
    'benefitSubtitle',
    'benefitThreetitle',
    'benefitDesc'
  ])
  // ??????
  const functionItem = ref<any>({
    funcName: '', // ????????????
    funcFile: '', // ?????????(?????????)
    imgList: [],
    funcSubtitle: '', // ??????
    funcDesc: '', // ??????
    funcTips: '' // ?????????
  })
  const functionField = ref<any>(['funcName', 'funcSubtitle', 'funcDesc'])
  // ??????
  const privilegeItem = ref<any>({
    privilegeName: '', // ????????????
    funcFile: '', // ?????????(?????????)
    imgList: [],
    privilegeName2: '', // ??????
    privilegeDesc: '', // ??????
    privilegeButName: '' // ????????????
  })
  const privilegeField = ref<any>([
    'privilegeName',
    'privilegeName2',
    'privilegeDesc'
  ])
  // ?????????
  const editorItem = ref<any>({
    ghost: ''
  })
  const editorField = ref<any>(['ghost'])
  // ????????????
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
  // ???????????????
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
  // ????????????????????????,VIP??????
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
        if (!res.result) {
          const result = res.data as any[]
          equityList.value = result.map((item: any) => {
            return {
              title: item.name,
              value: item.id
            }
          })
        }
      }
    )
  }
  getOtherList()
  getJumpList()
  getEquityList(0)
  return [jumpList, otherList, getEquityList]
}
