<template>
  <div class="resource-classify">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="explains"
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
      pageName="explains"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <page-language
        :languageList="languageList"
        :languageId="languageId"
        :languageBtnList="languageBtnList"
        @changeLanguage="handleChangeLanguage"
      >
        <template #formItem>
          <el-row :gutter="12">
            <el-col :span="12">
              <div class="item-flex">
                <div class="item-title">
                  <span class="item-tip">*</span>
                  功能分类标题
                </div>
                <el-input
                  v-model.trim="languageItem.title"
                  placeholder="请输入功能分类标题"
                  required
                  clearable
                ></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="item-flex">
                <span class="item-title">
                  <span class="item-tip">*</span>
                  描述
                </span>
                <el-input
                  v-model.trim="languageItem.desc"
                  placeholder="请输入描述"
                  clearable
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="12">
              <div class="item-flex">
                <div class="item-title">Pro标签</div>
                <el-input
                  v-model.trim="languageItem.proTag"
                  placeholder="请输入Pro标签"
                  required
                  clearable
                ></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="item-flex">
                <span class="item-title"> Plus标签 </span>
                <el-input
                  v-model.trim="languageItem.plusTag"
                  placeholder="请输入Plus标签"
                  clearable
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="12">
              <div class="item-flex">
                <span class="item-title"> 小提示 </span>
                <el-input
                  v-model.trim="languageItem.tips"
                  placeholder="请输入描述"
                  clearable
                ></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="item-flex">
                <span class="item-title">演示图</span>
                <hy-upload
                  :limit="imgLimit"
                  fileTypeName="helpFunction/"
                  v-model:value="languageItem.icon"
                ></hy-upload>
              </div>
            </el-col>
          </el-row>
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
  useImageUpload,
  usePageList
} from './hooks/use-page-list'
import { getItemData } from '@/service/common-api'
import hyUpload from '@/base-ui/upload'
import { mapImageToObject } from '@/utils/index'
import { errorTip } from '@/utils/tip-info'
export default defineComponent({
  name: 'helpFunctionTest',
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
      mapIconState,
      requiredField
    ] = useSetLanguage()
    const [typeList] = usePageList()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [imgLimit, imgList] = useImageUpload()
    const otherInfo = ref<any>({})
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        functionExplainJson: JSON.stringify(languageList.value)
      }
    })
    // 监听多语言图片设置
    watchEffect(() => {
      if (languageItem.value) {
        if (languageItem.value.icon.length > 0) {
          languageItem.value.url = languageItem.value.icon[0].url
          languageItem.value = {
            ...languageItem.value,
            url: languageItem.value.icon[0].url
          }
          console.log(languageItem.value, '用户选中图片')
        } else {
          languageItem.value.url = undefined
          languageItem.value.icon = []
        }
      }
    })
    const searchFormConfigRef = computed(() => {
      const typeItem = searchFormConfig.formItems.find(
        (item) => item.field === 'type'
      )
      typeItem!.options = typeList.value.map((item: any) => {
        return {
          title: item.name,
          value: item.typeId
        }
      })
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      const typeItem = modalConfig.formItems.find(
        (item) => item.field === 'typeId'
      )
      typeItem!.options = typeList.value.map((item: any) => {
        return {
          title: item.name,
          value: item.typeId
        }
      })
      return modalConfig
    })
    const newData = () => {
      imgList.value = []
      resetLanguageList()
    }
    const editData = (item: any) => {
      getItemData('functionItem', {
        id: item.id,
        language: 1
      }).then((res: any) => {
        if (res.result === 0) {
          otherInfo.value = {
            id: res.data.id,
            rank: res.data.rank
          }
          if (
            res.data.functionExplainList &&
            res.data.functionExplainList.length > 0
          ) {
            let result: any[] = []
            result = res?.data?.functionExplainList.map((item: any) => {
              return {
                ...item,
                icon: item.url ? [mapImageToObject(item.url)] : []
              }
            })
            languageList.value = result
            languageId.value = res?.data?.functionExplainList[0].lid
          }
          mapIconState(res.data.functionExplainList, requiredField.value)
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
