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
        @editBtnClick="editData"
      >
        <template #otherHandler>
          <el-dropdown trigger="click" style="margin-right: 10px">
            <el-button
              size="mini"
              type="primary"
              plain
              class="hg-flex hg-items-center"
            >
              新增<i class="el-icon-arrow-down hg-ml-1"></i>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="newData($event, 1)"
                  >IOS</el-dropdown-item
                >
                <el-dropdown-item @click="newData($event, 0)"
                  >Android</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template #isOsType="scope">
          {{ scope.row.osType ? 'IOS' : 'Android' }}
        </template>
        <template #isStatus="scope">
          {{ scope.row.status ? '生效' : '失效' }}
        </template>
        <template #isHost="scope">
          {{ $filters.formatSelectTitle(scope.row.host, hostList) }}
        </template>
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
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">批量操作</span>
            <el-tag>已下选项为批量操作版本信息，请勾选地区后再操作</el-tag>
          </div>
        </el-col>
      </el-row>
      <!-- 批量操作 -->
      <el-row :gutter="12">
        <el-col :span="8">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              发布时间
            </span>
            <el-date-picker
              v-model="changeTableData.onlineTime"
              type="datetime"
              style="width: 100%"
              placeholder="请选择发布时间"
              value-format="YYYY-MM-DD HH:ss:mm"
              :disabled="selectList.length === 0"
              @change="handleChangeAllData('time')"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item-flex">
            <span class="item-title">停运时间</span>
            <el-date-picker
              v-model="changeTableData.endTime"
              type="datetime"
              style="width: 100%"
              placeholder="请选择停运时间"
              value-format="YYYY-MM-DD HH:ss:mm"
              :disabled="selectList.length === 0"
              @change="handleChangeAllData('time')"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              更新公告
            </span>
            <el-select
              placeholder="请选择公告状态"
              style="width: 100%"
              clearable
              v-model="changeTableData.isNotice"
              :disabled="selectList.length === 0"
              @change="handleChangeAllData('notice')"
            >
              <el-option :value="1" label="开">开</el-option>
              <el-option :value="0" label="关">关</el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- 可编辑表格 -->
      <editor-table
        :listData="selectCountryList"
        v-bind="contentTableEditConfigRef"
        @change-picker="handleChangePicker"
        @selectionChange="handleSelectChange"
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
            <el-input
              v-model="languageItem.notice"
              type="textarea"
              :rows="3"
              placeholder="请输入更新内容"
            ></el-input>
            <!-- <hy-editor
              ref="editorRef"
              v-model:value="languageItem.notice"
              fileTypeName="baseVersion/"
            ></hy-editor> -->
          </div>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, nextTick } from 'vue'

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
// import hyEditor from '@/base-ui/editor'
import { getItemData, deleteItemData } from '@/service/common-api'
import { errorTip } from '@/utils/tip-info'
import { mapVersionState } from '@/utils'
export default defineComponent({
  name: 'baseVersion',
  components: {
    editorTable
    // hyEditor
  },
  setup() {
    const otherInfo = ref<any>({})
    // 下拉地区
    const areaIds = ref<any>([])
    // 用户选中的地区
    const selectCountryList = ref<any>([])
    const operationType = ref<any>('add')
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
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: areaIds.value.toString(),
        versionJson: JSON.stringify(languageList.value),
        childListStr: JSON.stringify(selectCountryList.value)
      }
    })
    const changeTableData = ref<any>({
      onlineTime: '',
      endTime: '',
      isNotice: ''
    })
    // 编辑表格操作
    // 单选改变时间
    const handleChangePicker = (data: any) => {
      const status = mapVersionState(data.onlineTime, data.endTime)
      const selectItem = selectCountryList.value.find(
        (item: any) => item.rid === data.rid
      )
      selectItem['status'] = status
    }
    // 多选改变时间
    const selectList = ref<any>([])
    const handleSelectChange = (data: any) => {
      selectList.value = [...selectList.value, ...data]
    }
    const handleChangeAllData = async (type: string) => {
      if (type === 'notice') {
        selectList.value = selectList.value.map((item: any) => {
          return {
            ...item,
            isNotice: changeTableData.value.isNotice
          }
        })
        await nextTick()
        selectCountryList.value = selectCountryList.value.map((item: any) => {
          let result = selectList.value.find((i: any) => i.rid === item.rid)
          if (result) {
            return {
              ...item,
              ...result
            }
          } else {
            return {
              ...item
            }
          }
        })
      } else {
        selectList.value = selectList.value.map((item: any) => {
          return {
            ...item,
            onlineTime: changeTableData.value.onlineTime,
            endTime: changeTableData.value.endTime,
            status: mapVersionState(
              changeTableData.value.onlineTime,
              changeTableData.value.endTime
            )
          }
        })
        await nextTick()
        selectCountryList.value = selectCountryList.value.map((item: any) => {
          let result = selectList.value.find((i: any) => i.rid === item.rid)
          if (result) {
            return {
              ...item,
              ...result
            }
          } else {
            return {
              ...item
            }
          }
        })
      }
    }
    // 删除操作
    const handleDeleteEditTableData = (id: any) => {
      if (operationType.value === 'add') {
        const index = selectCountryList.value.findIndex((i: any) => i.id === id)
        const selectIndex = areaIds.value.findIndex((i: any) => i === id)
        selectCountryList.value.splice(index, 1)
        areaIds.value.splice(selectIndex, 1)
      } else {
        deleteItemData('/cms/version/child/del', { id: id }).then((res) => {
          getItem(otherInfo.value.id)
        })
      }
    }
    const handleChangeEditTableNotice = (item: any) => {
      item.isNotice = item.isNotice ? 0 : 1
    }
    const handleChangeCountry = (value: any[]) => {
      if (value.length > 0) {
        let prpObj: any = {}
        let prepEditObj: any = {}
        let prepEditList2: any = []
        countryList.value.map((v: any) => {
          prpObj[v.id] = v
        })
        selectCountryList.value.map((v: any) => {
          prepEditObj[v.rid] = v
        })
        value.map((v: any) => {
          debugger
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
              isNotice: 0,
              rid: d.id
            })
          }
          prepEditObj[v] = v
        })
        selectCountryList.value = prepEditList2
      } else selectCountryList.value = []
    }
    const newData = (item: any, osType: any) => {
      operationType.value = 'add'
      modalConfigRef.value.title = osType
        ? '版本管理操作 (IOS)'
        : '版本管理操作 (Android)'
      contentTableEditConfigRef.value.title = osType
        ? '内容设置(IOS)'
        : '内容设置(Android)'
      otherInfo.value = {
        osType: osType
      }
      areaIds.value = []
      selectCountryList.value = []
      selectList.value = []
      changeTableData.value = {
        onlineTime: '',
        endTime: '',
        isNotice: ''
      }
      resetLanguageList()
      handleNewData(item)
    }
    const getItem = (id: any) => {
      getItemData('versionItem', { id: id }).then(async (res) => {
        if (res.result === 0) {
          modalConfigRef.value.title = res.data.osType
            ? '版本管理操作 (IOS)'
            : '版本管理操作 (Android)'
          contentTableEditConfigRef.value.title = res.data.osType
            ? '内容设置(IOS)'
            : '内容设置(Android)'
          selectCountryList.value = res.data.childList
          if (res?.data?.versionList?.length > 0) {
            const info = languageList.value.map((item: any) => {
              let result = res.data.versionList.find(
                (i: any) => i.lid === item.lid
              )
              if (result) {
                return {
                  ...item,
                  ...result
                }
              } else {
                return {
                  ...item
                }
              }
            })
            await nextTick()
            languageList.value = info
            languageId.value = info[0].lid
            mapIconState(info, requiredField.value)
          }
          otherInfo.value = {
            ...otherInfo.value,
            areaIds: res.data.areaIds
          }
          areaIds.value = res.data.areaIds ?? []
          handleEditData({
            ...res.data
          })
        } else errorTip(res.msg)
      })
    }
    const editData = (item: any) => {
      operationType.value = 'edit'
      selectCountryList.value = []
      selectList.value = []
      changeTableData.value = {
        onlineTime: '',
        endTime: '',
        isNotice: ''
      }
      otherInfo.value = {
        ...otherInfo.value,
        id: item.id
      }
      getItem(item.id)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      handleChangePicker,
      handleSelectChange,
      handleChangeAllData,
      operationType,
      selectList,
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
      changeTableData,
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
      newData,
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
