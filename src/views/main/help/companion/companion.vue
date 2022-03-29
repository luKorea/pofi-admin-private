<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-25 09:43:18
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/help/companion/companion.vue
-->
<template>
  <div class="help-companion">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="companions"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
      <template #state="scope">
        <span>{{ scope.row.state ? '启用' : '禁用' }}</span>
      </template>
      <template #image="scope">
        <page-image :img-src="scope.row.bgUrl"></page-image>
      </template>
      <template #video="scope">
        <preview-video
          :fileUrl="scope.row.fileUrl"
          :title="scope.row.title"
        ></preview-video>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="companions"
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
          <div class="item-flex">
            <div class="item-title">
              <span class="item-tip">*</span>
              标题
            </div>
            <el-input
              v-model="languageItem.title"
              placeholder="请输入标题"
              required
            ></el-input>
          </div>
          <el-row :gutter="12">
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <span class="item-title">图片上传</span>
                <hy-upload
                  :limit="imgLimit"
                  fileTypeName="helpCompanion/"
                  v-model:value="languageItem.bgList"
                ></hy-upload>
              </div>
            </el-col>
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <span class="item-title">视频上传</span>
                <hy-upload
                  :limit="videoLimit"
                  fileTypeName="helpCompanion/"
                  v-model:value="languageItem.fileList"
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
import { computed, defineComponent, watchEffect, ref } from 'vue'
import PreviewVideo from '@/base-ui/preview-video'

import {
  useStoreName,
  useImageUpload,
  useVideoUpload,
  useSetLanguage
} from './hooks/use-page-list'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import HyUpload from '@/base-ui/upload'
import { getItemData } from '@/service/common-api'
import { mapImageToObject } from '@/utils/index'
import { errorTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'companion',
  components: {
    HyUpload,
    PreviewVideo
  },
  setup() {
    const [
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage
    ] = useSetLanguage()
    const [storeTypeInfo, operationName] = useStoreName()
    const [imgLimit, imgList] = useImageUpload()
    const [videoLimit, videoList] = useVideoUpload()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const newData = () => resetLanguageList()
    const editData = (item: any) => {
      getItemData('companionItem', {
        id: item.id,
        language: 1
      }).then((res: any) => {
        if (res.result === 0) {
          otherInfo.value = {
            id: res.data.id,
            rank: res.data.rank
          }
          if (res.data.companionList && res.data.companionList.length > 0) {
            let result: any[] = []
            result = res?.data?.companionList.map((item: any) => {
              return {
                ...item,
                bgList: item.bgUrl ? [mapImageToObject(item.bgUrl)] : [],
                fileList: item.fileUrl ? [mapImageToObject(item.fileUrl)] : []
              }
            })
            languageList.value = result
            languageId.value = res?.data?.companionList[0].languageId
          }
          handleEditData(res.data)
        } else errorTip(res.msg)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    const otherInfo = ref<any>({})
    // 监听多语言图片设置
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        CompanionJson: JSON.stringify(languageList.value)
      }
      if (languageItem.value) {
        if (languageItem.value.bgList.length > 0) {
          languageItem.value.bgUrl = languageItem.value.bgList[0].url
        } else {
          languageItem.value.bgUrl = undefined
          languageItem.value.bgList = []
        }
        if (languageItem.value.fileList.length > 0) {
          languageItem.value.fileUrl = languageItem.value.fileList[0].url
        } else {
          languageItem.value.fileUrl = undefined
          languageItem.value.fileList = []
        }
      }
    })
    // 表单
    const modalConfigRef = computed(() => {
      return modalConfig
    })
    return {
      //多语言
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      otherInfo,
      imgLimit,
      imgList,
      videoLimit,
      videoList,
      storeTypeInfo,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      contentTableConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      editData,
      handleEditData,
      modalConfigRef,
      operationName
    }
  }
})
</script>
