<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 14:45:00
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
          <el-col :span="21">
            <div class="item-flex">
              <div class="item-title">
                <span class="item-tip">*</span>
                关键词(多语言)
              </div>
              <el-input
                v-model="languageItem.name"
                placeholder="请输入多语言关键词"
                required
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">描述</span>
              <el-input
                type="textarea"
                :rows="3"
                v-model="languageItem.desc"
                placeholder="请输入描述"
              ></el-input>
            </div>
          </el-col>
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
import { errorTip } from '@/utils/tip-info'
export default defineComponent({
  name: 'resourceKeywords',
  setup() {
    const [
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage
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
