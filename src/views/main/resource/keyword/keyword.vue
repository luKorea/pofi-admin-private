<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-22 09:54:38
 * @Description: 完成
 * @FilePath: /pofi-admin/src/views/main/base/language/language.vue
-->
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
      pageName="keywords"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
      <template #isType="{ row }">
        <span>{{ mapType(row.type) }}</span>
      </template>
      <template #isState="scope">
        <el-button
          size="mini"
          :type="scope.row.status ? 'info' : 'primary'"
          @click="changeState(scope.row)"
          >{{ scope.row.status ? '隐藏' : '显示' }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="keywords"
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
              关键词(多语言)
            </div>
            <el-input
              v-model="languageItem.name"
              placeholder="请输入多语言关键词"
              required
              clearable
            ></el-input>
            <!-- <el-form :model="languageItem">
                <el-form-item
                  prop="name"
                  :rules="[
                    {
                      required: true,
                      message: '请输入内部编码',
                      trigger: 'blur'
                    }
                  ]"
                >

                </el-form-item>
              </el-form> -->
          </div>
          <div class="item-flex">
            <span class="item-title">描述</span>
            <el-input
              type="textarea"
              :rows="3"
              v-model="languageItem.desc"
              placeholder="请输入描述"
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
  usePageList,
  useSetLanguage
} from './hooks/use-page-list'
import { getItemData } from '@/service/common-api'
import { errorTip, infoTipBox, successTip } from '@/utils/tip-info'
import { useStore } from '@/store'
import { updateKeywordState } from '@/service/main/resource/keywords'
export default defineComponent({
  name: 'resourceKeywords',
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
    const [keyTypeList] = usePageList()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const otherInfo = ref<any>({})
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        moldKeywordJson: JSON.stringify(languageList.value)
      }
    })
    const searchFormConfigRef = computed(() => {
      const typeItem = searchFormConfig.formItems.find((item: any) => {
        return item.field === 'type'
      })
      typeItem!.options = keyTypeList.value.map((item: any) => {
        return {
          title: item.desc,
          value: item.id
        }
      })
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      const typeItem = modalConfig.formItems.find((item: any) => {
        return item.field === 'type'
      })
      typeItem!.options = keyTypeList.value.map((item: any) => {
        return {
          title: item.desc,
          value: item.id
        }
      })
      return modalConfig
    })
    const newData = () => {
      otherInfo.value = {}
      resetLanguageList()
    }
    const editData = (item: any) => {
      getItemData('resourceKeyword', {
        id: item.id,
        language: 1
      }).then((res: any) => {
        if (res.result === 0) {
          otherInfo.value = {
            id: res.data.id
          }
          if (res.data.moldKeywordList && res.data.moldKeywordList.length > 0) {
            languageList.value = res?.data?.moldKeywordList
            languageId.value = res?.data?.moldKeywordList[0].lid
            mapIconState(res?.data?.moldKeywordList, requiredField.value)
          }
          handleEditData(res.data)
        } else errorTip(res.msg)
      })
    }
    const mapType = (type: any) => {
      switch (type) {
        case 1:
          return '外貌类型'
        case 2:
          return '风格主题'
        case 3:
          return '场景应用'
        case 4:
          return '其他关联'
        case 9:
          return '隐藏标签'
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    const changeState = (item: any) => {
      infoTipBox({
        title: '修改关键词状态',
        message: `您确定将当前关键词为${item.name}的状态修改为:${
          item.status ? '显示' : '隐藏'
        }吗`
      }).then(() => {
        updateKeywordState({
          ...item,
          status: item.status ? 0 : 1
        }).then((res) => {
          if (res.result === 0) {
            successTip(res.msg)
            handleResetClick()
          } else errorTip(res.msg)
        })
      })
    }
    return {
      // 多语言编辑
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      searchFormConfigRef,
      mapType,
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
      otherInfo,
      changeState
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
