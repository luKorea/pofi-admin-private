<template>
  <div class="hg-flex base-version" v-if="0">
    <page-country
      ref="countryRef"
      :countryList="handleCountryList"
      @selectCountryItem="selectCountryClick"
    ></page-country>
    <div class="page-country-wrap">
      <page-search
        :searchFormConfig="searchFormConfigRef"
        @resetBtnClick="handleResetBtnClick"
        @queryBtnClick="handleQueryBtnClick"
      />
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="versions"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
        <template #isHost="scope">
          {{ scope.row.host }}
        </template>
        <!-- <template #isStatus="scope">
          {{ scope.row.status == 1 ? '有效' : '无效' }}
        </template> -->
      </page-content>
    </div>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="versions"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">地区</span>
            <el-select
              placeholder="至少选择一个"
              style="width: 100%"
              clearable
              v-model="areaIds"
              multiple
              collapse-tags
              @change="handleChangeCountry($event)"
            >
              <el-option
                v-for="option in countryList"
                :key="option.id"
                :value="option.id"
                :label="option.name"
                >{{ option.name }}</el-option
              >
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- 可编辑表格 -->
      <editor-table :listData="listData" v-bind="contentTableEditConfigRef">
        <template #handler="{ row }">
          <el-button
            type="danger"
            size="mini"
            @click="handleDeleteEditTableData(row.id)"
            >删除</el-button
          >
        </template>
      </editor-table>
      <!-- 多语言 -->
      <page-language
        :languageList="languageList"
        :languageId="languageId"
        :languageBtnList="languageBtnList"
        @changeLanguage="handleChangeLanguage"
      >
        <template #formItem>
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              更新内容
            </span>
            <hy-editor
              ref="editorRef"
              v-model:value="languageItem.notice"
              fileTypeName="baseVersion/"
            ></hy-editor>
          </div>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import { contentTableConfig } from './config/content.config'

import { useMapCountry } from '@/hooks/use-page-side-country'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  useSetLanguage,
  usePageList,
  useEditTableData,
  useMapFormData
} from './hooks/use-page-list'
import editorTable from '@/base-ui/table'
import hyEditor from '@/base-ui/editor'
export default defineComponent({
  name: 'baseVersion',
  components: {
    editorTable,
    hyEditor
  },
  setup() {
    // 编辑表格
    const [listData, newTableData, deleteTableData] = useEditTableData()
    const handleNewTableData = (name: string) => {
      newTableData({
        name,
        status: 1,
        onlineTime: '',
        endTime: '',
        isNotice: ''
      })
    }
    const handleDeleteEditTableData = (item: any) => deleteTableData(item)
    // 多语言
    const [
      editorRef,
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      requiredField,
      mapIconState
    ] = useSetLanguage()
    const [
      countryList,
      authorList,
      getAuthorList,
      resourceList,
      getResourceList,
      loading
    ] = usePageList()
    const [storeTypeInfo, operationName] = useStoreName()
    const otherInfo = ref<any>({})
    // 下拉地区
    const areaIds = ref<any>([])
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: areaIds.value.toString(),
        topicJson: JSON.stringify(languageList.value),
        childListStr: JSON.stringify(listData.value)
      }
    })
    const handleChangeCountry = (item: any[]) => {
      const name = item.map((i: any) => {
        return countryList.value.filter((item: any) => item.id === i)
      })
      console.log(name)
      // handleNewTableData(item.name)
      // const all: any[] = []
      // const check = item.find((i: any) => i === -1)
      // if (check === -1) {
      //   countryList.value
      //     .filter((i: any) => i.id !== -1)
      //     .forEach((item: any) => {
      //       all.push(item.id)
      //     })
      //   otherInfo.value = {
      //     ...otherInfo.value,
      //     areaIds: all.toString()
      //   }
      //   areaIds.value = all
      // } else {
      //   otherInfo.value = {
      //     ...otherInfo.value,
      //     areaIds: item.toString()
      //   }
      // }
    }
    const newData = () => {
      areaIds.value = []
      listData.value = []
      resetLanguageList()
    }

    const editData = (item: any) => {
      console.log(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      ...useMapFormData(),
      // 编辑表格
      handleNewTableData,
      handleDeleteEditTableData,
      listData,
      deleteTableData,
      // 侧边国家
      ...useMapCountry(),
      // 下拉框数据
      areaIds,
      countryList,
      handleChangeCountry,
      authorList,
      getAuthorList,
      resourceList,
      getResourceList,
      loading,
      // 多语言编辑
      editorRef,
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      storeTypeInfo,
      contentTableConfig,
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
