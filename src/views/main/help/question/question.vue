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
      pageName="questions"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
      <template #isHot="{ row }">
        {{ row.isHot == 1 ? '是' : '否' }}
      </template>
      <template #isState="{ row }">
        {{ row.state == 1 ? '显示' : '不显示' }}
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="questions"
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
                问题标题
              </div>
              <el-input
                v-model="languageItem.name"
                placeholder="请输入问题标题"
                required
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                回答内容
              </span>
              <hy-editor
                v-model:value="languageItem.desc"
                fileTypeName="helpQuestion/"
              ></hy-editor>
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
  useSetLanguage,
  usePageList
} from './hooks/use-page-list'
import { getItemData } from '@/service/common-api'
import { errorTip } from '@/utils/tip-info'
import hyEditor from '@/base-ui/editor'
export default defineComponent({
  name: 'helpQuestion',
  components: {
    hyEditor
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
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const otherInfo = ref<any>({})
    const [questionTypeList] = usePageList()
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        moldKeywordJson: JSON.stringify(languageList.value)
      }
    })
    const searchFormConfigRef = computed(() => {
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      const questionTypeItem = modalConfig.formItems.find(
        (item) => item.field === 'typeId'
      )
      questionTypeItem!.options = questionTypeList.value.map((item: any) => {
        return {
          title: item.title,
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
