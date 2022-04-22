<template>
  <div class="hg-flex base-version" v-if="1">
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
        <template #isOsType="scope">
          {{ scope.row.osType ? 'IOS' : 'Android' }}
        </template>
        <template #isHost="scope">
          {{ $filters.formatSelectTitle(scope.row.host, hostList) }}
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
      <editor-table
        :listData="selectCountryList"
        v-bind="contentTableEditConfigRef"
      >
        <template #isNotice="{ row }">
          <el-button type="text" @click="handleChangeEditTableNotice(row)">
            {{ row.isNotice ? '开' : '关' }}
          </el-button>
        </template>
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
    const otherInfo = ref<any>({})
    // 下拉地区
    const areaIds = ref<any>([])
    // 用户选中的地区
    const selectCountryList = ref<any>([])
    const {
      searchFormConfig,
      searchFormConfigRef,
      modalConfigRef,
      modalConfig,
      contentTableEditConfigRef,
      contentTableEditConfig,
      hostList
    } = useMapFormData()
    // 编辑表格
    const [listData, newTableData, deleteTableData] = useEditTableData()
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

    // 编辑表格操作
    const handleDeleteEditTableData = (id: any) => {
      const index = selectCountryList.value.findIndex((i: any) => i.id === id)
      const selectIndex = areaIds.value.findIndex((i: any) => i === id)
      selectCountryList.value.splice(index, 1)
      areaIds.value.splice(selectIndex, 1)
    }
    const handleChangeEditTableNotice = (item: any) => {
      item.isNotice = item.isNotice ? 0 : 1
    }
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: areaIds.value.toString(),
        topicJson: JSON.stringify(languageList.value),
        childListStr: JSON.stringify(listData.value)
      }
    })
    const handleChangeCountry = (value: any[]) => {
      if (value.length > 0) {
        let prpObj: any = {}
        let prepEditObj: any = {}
        let prepEditList2: any = []
        countryList.value.map((v: any) => {
          prpObj[v.id] = v
        })
        selectCountryList.value.map((v: any) => {
          prepEditObj[v.id] = v
        })
        value.map((v: any) => {
          if (prepEditObj[v]) {
            prepEditList2.push(prepEditObj[v])
          } else if (prpObj[v]) {
            let d = prpObj[v]
            prepEditList2.push({
              name: d.name,
              id: d.id,
              status: 1,
              onlineTime: '',
              endTime: '',
              isNotice: 0
            })
          }
          prepEditObj[v] = v
        })
        selectCountryList.value = prepEditList2
      } else selectCountryList.value = []
    }
    const newData = () => {
      areaIds.value = []
      listData.value = []
      resetLanguageList()
    }

    const editData = (item: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: item.areaIds
      }
      areaIds.value = item.areaIds
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData, editData)
    return {
      searchFormConfig,
      searchFormConfigRef,
      modalConfigRef,
      modalConfig,
      contentTableEditConfigRef,
      contentTableEditConfig,
      hostList,
      // 编辑表格
      handleDeleteEditTableData,
      handleChangeEditTableNotice,
      selectCountryList,
      deleteTableData,
      // 侧边国家
      ...useMapCountry(false),
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
