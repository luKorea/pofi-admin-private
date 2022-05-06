<template>
  <div class="base-languages">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="functionTypes"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
      <template #isImage="{ row }">
        <page-image :img-src="row.url"></page-image>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="functionTypes"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">图片上传</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="functionType/"
              v-model:value="imgList"
            ></hy-upload>
          </div>
        </el-col>
      </el-row>
      <page-language
        :languageList="languageList"
        :languageId="languageId"
        :languageBtnList="languageBtnList"
        @changeLanguage="handleChangeLanguage"
      >
        <template #formItem>
          <div class="item-flex">
            <div class="item-title">
              <span class="item-tip">*</span>
              功能分类标题
            </div>
            <el-input
              v-model="languageItem.title"
              placeholder="请输入功能分类标题"
              required
              clearable
            ></el-input>
          </div>
          <div class="item-flex">
            <span class="item-title">副标题 </span>
            <el-input
              v-model="languageItem.subTitle"
              placeholder="副标题"
              clearable
            ></el-input>
          </div>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  useSetLanguage,
  useImageUpload
} from './hooks/use-page-list'
import { getItemData } from '@/service/common-api'
import { errorTip } from '@/utils/tip-info'
import { mapImageToObject } from '@/utils/index'
import hyUpload from '@/base-ui/upload'
export default defineComponent({
  name: 'helpFunctionType',
  components: {
    hyUpload
  },
  setup() {
    const [
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      requiredField,
      mapIconState
    ] = useSetLanguage()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const otherInfo = ref<any>({})
    const [imgLimit, imgList] = useImageUpload()
    watchEffect(() => {
      if (imgList.value.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          url: imgList.value[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          url: undefined
        }
      }
      otherInfo.value = {
        ...otherInfo.value,
        functionExplainTypeJson: JSON.stringify(languageList.value)
      }
    })
    const searchFormConfigRef = computed(() => {
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      return modalConfig
    })
    const newData = () => {
      otherInfo.value = {}
      imgList.value = []
      resetLanguageList()
    }
    const editData = (item: any) => {
      getItemData('functionTypeItem', {
        id: item.id,
        language: 1
      }).then((res: any) => {
        if (res.result === 0) {
          imgList.value = []
          if (res.data.url) {
            imgList.value.push(mapImageToObject(res.data.url))
          }
          otherInfo.value = {
            id: res.data.id,
            rank: res.data.rank
          }
          if (
            res.data.functionExplainTypeList &&
            res.data.functionExplainTypeList.length > 0
          ) {
            languageList.value = res?.data?.functionExplainTypeList
            languageId.value = res?.data?.functionExplainTypeList[0].lid
          }
          mapIconState(res.data.functionExplainTypeList, requiredField.value)
          handleEditData(res.data)
        } else errorTip(res.msg)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      imgLimit,
      imgList,
      // 多语言编辑
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      searchFormConfigRef,
      handleResetClick,
      handleQueryClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      editData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
