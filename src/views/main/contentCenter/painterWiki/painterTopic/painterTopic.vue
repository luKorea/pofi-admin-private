<template>
  <div class="painterLibrary-wrap hg-flex">
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
      >
      </page-search>
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="painterTopics"
        @newBtnClick="handleNewData"
        @editBtnClick="editData"
      >
        <template #isId="{ row }"> PR{{ row.id }} </template>
        <!-- <template #isJob="{ row }">
        {{ $filters.formatSelectTitle(row.job, otherFieldList.jobList) }}
      </template> -->
        isRegion
        <template #isType="{ row }">
          {{ $filters.formatSelectTitle(row.type, painterTopicList) }}
        </template>
        <template #isImage="{ row }">
          <page-image :img-src="row.iconUrl"></page-image>
        </template>
        <template #isState="{ row }">
          {{ row.status ? '启用' : '禁用' }}</template
        >
        <template #isUp="{ row }"> {{ row.status ? '是' : '否' }}</template>
      </page-content>
      <page-modal
        :defaultInfo="defaultInfo"
        ref="pageModalRef"
        pageName="painterTopics"
        :modalConfig="modalConfigRef"
        :operationName="operationName"
        :otherInfo="otherInfo"
        @changeSelect="handleChangeSelect"
      >
        <el-row :gutter="12">
          <el-col v-bind="modalConfigRef.colLayout">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span> 封面图
              </span>
              <hy-upload
                :limit="1"
                fileTypeName="painterLibrary/"
                v-model:value="otherInfo.coverList"
              ></hy-upload>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12" v-if="showDifferentContent === 1">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>画师</span
              >
              <el-select
                placeholder="请选择画师"
                style="width: 100%"
                v-model="otherInfo.paid"
              >
                <el-option
                  v-for="option in otherFieldList.allPainterList"
                  :key="option.value"
                  :value="option.title"
                  :label="option.title"
                  >{{ option.title }}</el-option
                >
              </el-select>
            </div>
          </el-col>
          <el-col :span="12" v-if="showDifferentContent === 2">
            <div class="item-flex">
              <span class="item-title">画师专题</span>
              <el-select
                placeholder="请选择画师专题"
                style="width: 100%"
                multiple
                v-model="otherInfo.contactList1"
                @change="handleChangePrep"
              >
                <el-option
                  v-for="option in otherFieldList.painterTopicList"
                  :key="option.value"
                  :value="option.value"
                  :label="option.title"
                  >{{ option.title }}</el-option
                >
              </el-select>
            </div>
          </el-col>
          <el-col v-bind="modalConfigRef.colLayout">
            <div class="item-flex">
              <span class="item-title">地区</span>
              <el-select
                placeholder="请选择国家地区，不选默认全部"
                style="width: 100%"
                clearable
                v-model="areaIds"
                multiple
                collapse-tags
                @change="handleChangeCountry($event)"
              >
                <el-option
                  v-for="option in otherFieldList.countryList"
                  :key="option.id"
                  :value="option.id"
                  :label="option.name"
                  >{{ option.name }}</el-option
                >
              </el-select>
            </div>
          </el-col>
        </el-row>
        <!-- 画师专题列表 -->
        <el-row v-if="showDifferentContent === 2">
          <!-- 画师专题列表 -->
          <el-col :span="24">
            <div class="item-flex">
              <span class="item-title">画师专题列表</span>
              <editor-table
                :listData="prepEditList"
                v-bind="urlModalConfig"
                :showHeader="false"
                style="width: 100%"
              >
                <template #handler="{ row }">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="handleDeletePrep(row)"
                    >删除</el-button
                  >
                </template>
              </editor-table>
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
                标题
              </div>
              <el-input
                v-model="languageItem.title"
                placeholder="请输入标题"
                required
                clearable
              ></el-input>
            </div>
            <div class="item-flex">
              <span class="item-title"> 副标题 </span>
              <el-input
                v-model="languageItem.subtitle"
                placeholder="请输入副标题"
                clearable
              ></el-input>
            </div>
            <div class="item-flex" v-show="showDifferentContent === 1">
              <span class="item-title"> 正文 </span>
              <hy-editor
                ref="editorRef"
                v-model:value="languageItem.about"
                fileTypeName="painterTopic/"
              ></hy-editor>
            </div>
          </template>
        </page-language>
      </page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, nextTick } from 'vue'

import { contentTableConfig } from './config/content.config'
import { urlModalConfig } from './config/edit.modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  useSetLanguage,
  useMapField,
  useCountrySelect
} from './hooks/use-page-list'
import { getItemData, deleteItemData } from '@/service/common-api'
import { errorTip } from '@/utils/tip-info'
import { mapImageToObject } from '@/utils/index'
import HyEditor from '@/base-ui/editor'
import HyUpload from '@/base-ui/upload'
import PageCountry from '@/components/page-country'
import { useMapCountry } from '@/hooks/use-page-side-country'

import editorTable from '@/base-ui/table'
import { successTip } from '@/utils/tip-info'
export default defineComponent({
  name: 'contentCenterPainterTopic',
  components: {
    HyEditor,
    HyUpload,
    PageCountry,
    editorTable
  },
  setup() {
    const showDifferentContent = ref<number>(1)
    const handleChangeSelect = (item: any) => {
      if (item.field === 'type' && item.value === 1) {
        mapState(1)
      } else if (item.field === 'type' && item.value === 2) {
        mapState(2)
      }
    }
    const mapState = (type: number) => {
      showDifferentContent.value = type
      const color = modalConfigRef.value.formItems.find(
        (i: any) => i.field === 'color'
      )
      color!.isHidden = type === 1 ? false : true
    }
    const [
      searchFormConfigRef,
      modalConfigRef,
      otherFieldList,
      painterTopicList
    ] = useMapField()
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
    const [storeTypeInfo, operationName] = useStoreName()
    const [otherInfo, areaIds, handleChangeCountry] = useCountrySelect()
    // 第三方链接
    const prepEditList = ref<any>([]) // 主关联资源
    const editTableStatus = ref<string>('add')
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        indexVoList: languageList.value,
        opusList: prepEditList.value
      }
    })
    watchEffect(() => {
      if (otherInfo.value?.coverList?.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          cover: otherInfo.value.coverList[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          cover: undefined
        }
      }
    })
    const newData = () => {
      showDifferentContent.value = 1
      otherInfo.value = {
        coverList: []
      }
      areaIds.value = []
      editTableStatus.value = 'add'
      prepEditList.value = []
      resetLanguageList()
    }
    const editData = (item: any) => {
      mapState(item.type)
      resetLanguageList()
      editTableStatus.value = 'edit'
      getItemData('painterTopicItem', {
        id: item.id,
        type: item.type
      }).then(async (res: any) => {
        if (res.result === 0) {
          areaIds.value = res.data.areaIds
          otherInfo.value = {
            id: res.data.id,
            uid: res.data.uid,
            paid: res.data.paid,
            areaIds: res.data.areaIds,
            type: item.type
          }
          if (res.data.cover) {
            otherInfo.value = {
              ...otherInfo.value,
              coverList: [mapImageToObject(res.data.cover)]
            }
          }
          if (res.data?.opusList?.length > 0) {
            prepEditList.value = res.data.opusList
            otherInfo.value = {
              ...otherInfo.value,
              contactList1: res.data.rcmdPo.split(',')
            }
          }
          if (res.data?.indexVoList?.length > 0) {
            const info = languageList.value.map((item: any) => {
              let result = res.data.indexVoList.find(
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
          handleEditData({
            ...res.data
          })
        } else errorTip(res.msg)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    const handleChangePrep = (value: any) => {
      if (value.length > 0) {
        let prpObj: any = {}
        let prepEditObj: any = {}
        let prepEditList2: any = []
        otherFieldList.value.painterTopicList.map((v: any) => {
          prpObj[v.value] = v
        })
        prepEditList.value.map((v: any) => {
          prepEditObj[v.poid] = v
        })
        value.map((v: any) => {
          console.log(v, 'v')
          if (prepEditObj[v]) {
            prepEditList2.push(prepEditObj[v])
          } else if (prpObj[v]) {
            let d = prpObj[v]
            prepEditList2.push(d)
          }
          prepEditObj[v] = v
        })
        prepEditList.value = prepEditList2
      } else prepEditList.value = []
    }
    const handleDeletePrep = (row: any) => {
      if (editTableStatus.value === 'add') {
        const checkItem = prepEditList.value.findIndex(
          (i: any) => i.value === row.value
        )
        const selectItem = otherInfo.value.contactList1.findIndex(
          (i: any) => i === row.value
        )
        prepEditList.value.splice(checkItem, 1)
        otherInfo.value.contactList1.splice(selectItem, 1)
      } else {
        deleteItemData('/cms/painter/index/deleteChild', {
          id: row.id,
          paid: otherInfo.value.paid
        }).then((res) => {
          if (res.result === 0) {
            successTip(res.msg)
            getItemData('painterTopicItem', {
              paid: otherInfo.value.id,
              type: otherInfo.value.type
            }).then(async (res: any) => {
              if (res.result === 0) {
                console.log(res.data, '删除后的数据')
              } else errorTip(res.msg)
            })
          }
        })
      }
    }
    return {
      ...useMapCountry(),
      showDifferentContent,
      handleChangeSelect,
      // 国家地区
      areaIds,
      handleChangeCountry,
      // 可编辑表格
      urlModalConfig,
      editTableStatus,
      handleChangePrep,
      handleDeletePrep,
      prepEditList,
      otherFieldList,
      painterTopicList,
      // 多语言编辑
      editorRef,
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      searchFormConfigRef,
      storeTypeInfo,
      contentTableConfig,
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
