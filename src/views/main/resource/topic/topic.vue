<template>
  <div class="hg-flex help-questionType">
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
        pageName="topics"
        @newBtnClick="handleNewData"
        @editBtnClick="editData"
      >
        <template #isStatus="scope">
          {{ scope.row.status == 1 ? '有效' : '无效' }}
        </template>
      </page-content>
    </div>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="topics"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
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
            <span class="item-title">作者</span>
            <el-select
              placeholder="请输入Pofi ID或昵称"
              style="width: 100%"
              filterable
              remote
              reserve-keyword
              clearable
              :remote-method="getAuthorList"
              :loading="loading"
              v-model="author"
            >
              <el-option
                v-for="option in authorList"
                :key="option.nickName"
                :value="option.nickName"
                :label="option.nickName"
                >{{ option.nickName }}</el-option
              >
            </el-select>
          </div>
        </el-col>
      </el-row>
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
              专题名称
            </span>
            <el-input
              v-model="languageItem.name"
              placeholder="请输入专题名称"
            ></el-input>
          </div>
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              副标题
            </span>
            <el-input
              v-model="languageItem.subTitle"
              placeholder="请输入副标题"
            ></el-input>
          </div>

          <div class="item-flex">
            <span class="item-title">主图</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="helpQuestionType/"
              v-model:value="languageItem.url"
            ></hy-upload>
          </div>
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>专题内容</span
            >
            <hy-editor
              ref="editorRef"
              fileTypeName="helpQuestionType/"
              v-model:value="languageItem.desc"
            ></hy-editor>
          </div>
        </template>
      </page-language>
      <!-- 可编辑表格 -->
      <editor-table :listData="listData" v-bind="contentTableEditConfig">
        <template #otherHandler>
          <el-button type="primary" size="mini" @click="handleNewTableData"
            >新增</el-button
          >
        </template>
        <template #other="{ row }">
          <el-select
            placeholder="资源搜索"
            style="width: 100%"
            filterable
            remote
            reserve-keyword
            :loading="loading"
            :remote-method="handleChangeResourceData"
            @change="handleChangeResourceItemData(row.mid)"
            v-model="row.mid"
            clearable
          >
            <el-option
              v-for="option in resourceList"
              :key="option.moId"
              :value="option.moId"
              :label="option.pname"
            ></el-option>
          </el-select>
        </template>
        <template #handler="{ row }">
          <el-button type="danger" size="mini" @click="deleteTableData(row.id)"
            >删除</el-button
          >
        </template>
      </editor-table>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, watch } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { contentTableEditConfig } from './config/content.edit-config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  useSetLanguage,
  usePageList,
  useImageUpload,
  useEditTableData
} from './hooks/use-page-list'
import { getItemData } from '@/service/common-api'
import hyUpload from '@/base-ui/upload'
import hyEditor from '@/base-ui/editor'
import editorTable from '@/base-ui/table'
import { mapImageToObject } from '@/utils/index'
import { warnTip, errorTip } from '@/utils/tip-info'
export default defineComponent({
  name: 'resourceTopic',
  components: {
    hyUpload,
    hyEditor,
    editorTable
  },
  setup() {
    // 编辑表格
    const [listData, newTableData, deleteTableData] = useEditTableData()
    const handleNewTableData = () => {
      newTableData({
        id: '',
        rank: '',
        mid: '',
        subTitle: '',
        url: [],
        cover: ''
      })
    }
    watch(listData.value, () => {
      listData.value = listData.value.map((item: any) => {
        return {
          ...item,
          cover: item.url && item.cover.length > 0 ? item.cover[0].url : ''
        }
      })
    })
    // 多语言
    const [
      editorRef,
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage
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
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [imgLimit] = useImageUpload()
    const author = ref<any>()
    const otherInfo = ref<any>({})
    // 资源管理
    const handleChangeResourceData = (keyword: string) => {
      getResourceList(keyword)
    }
    const handleChangeResourceItemData = (mid: any) => {
      const selectItem = resourceList.value.find(
        (item: any) => item.moId === mid
      )
      const index = listData.value.findIndex((item: any) => item.mid === mid)
      listData.value.splice(index, 1, {
        id: selectItem.id,
        rank: '',
        cover: selectItem.cover,
        title: selectItem.name,
        subTitle: selectItem.seriesName,
        mid: selectItem.moId,
        url: selectItem.cover ? [mapImageToObject(selectItem.cover)] : []
      })
      // listData.value = result
      console.log(listData.value, index, 'value')
    }
    // 侧边地区
    const countryRef = ref()
    const countryID = ref(-999)
    // 下拉地区
    const areaIds = ref<any>([])
    const handleCountryList = computed(() => {
      const list = [
        {
          name: '全部',
          id: -999
        },
        ...countryList.value
      ]
      return list
    })
    const copyQueryInfo = ref({})
    const selectCountryClick = (item: any) => {
      countryID.value = item.id
      handleQueryClick({
        ...copyQueryInfo.value,
        rid: countryID.value
      })
    }
    const handleQueryBtnClick = (queryInfo: any) => {
      copyQueryInfo.value = queryInfo
      handleQueryClick({
        ...queryInfo,
        rid: countryID.value
      })
    }
    // 刷新时重新选择第一条数据
    const handleResetBtnClick = () => {
      countryRef.value.currentIndex = 0
      countryID.value = -999
      handleResetClick()
    }
    watchEffect(() => {
      if (areaIds.value && areaIds.value.length === 0) {
        const region: any[] = []
        countryList.value.forEach((item: any) => {
          region.push(item.id)
        })
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: region.toString()
        }
      }
      if (languageItem.value) {
        if (languageItem.value.url.length > 0) {
          languageItem.value.cover = languageItem.value.url[0].url
          languageItem.value = {
            ...languageItem.value,
            cover: languageItem.value.url[0].url
          }
        } else {
          languageItem.value.cover = undefined
          languageItem.value.url = []
        }
      }
      otherInfo.value = {
        ...otherInfo.value,
        topicJson: JSON.stringify(languageList.value),
        childListStr: JSON.stringify(listData.value)
      }
    })
    // 监听多语言图片设置
    const handleChangeCountry = (item: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: item.toString()
      }
    }
    const searchFormConfigRef = computed(() => {
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      return modalConfig
    })
    const newData = () => {
      areaIds.value = []
      listData.value = []
      resetLanguageList()
    }
    const editData = (item: any) => {
      if (item.parent === 0) {
        warnTip('当前系列暂不支持编辑')
        return
      } else {
        getItemData('topicItem', {
          mtId: item.mtId
        }).then((res: any) => {
          if (res.result === 0) {
            areaIds.value = res.data.areaIds
            otherInfo.value = {
              id: res.data.id,
              areaIds: res.data.areaIds.toString(),
              rank: res.data.rank
            }
            if (res.data.topicList && res.data.topicList.length > 0) {
              let result: any[] = []
              result = res?.data?.topicList.map((item: any) => {
                return {
                  ...item,
                  url: item.cover ? [mapImageToObject(item.cover)] : []
                }
              })
              console.log(result)
              languageList.value = result
              let info: any[] = []
              info = res?.data?.childList.map((item: any) => {
                return {
                  ...item,
                  url: item.cover ? [mapImageToObject(item.cover)] : []
                }
              })
              listData.value = info
              languageId.value = res?.data?.topicList[0].lid
            }
            handleEditData(res.data)
          } else errorTip(res.msg)
        })
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      // 编辑表格
      contentTableEditConfig,
      handleNewTableData,
      listData,
      deleteTableData,
      // 侧边国家
      countryRef,
      handleCountryList,
      selectCountryClick,
      // 下拉框数据
      areaIds,
      author,
      countryList,
      handleChangeCountry,
      authorList,
      getAuthorList,
      resourceList,
      getResourceList,
      handleChangeResourceData,
      handleChangeResourceItemData,
      loading,
      // 多语言编辑
      imgLimit,
      editorRef,
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      searchFormConfigRef,
      handleQueryBtnClick,
      handleResetBtnClick,
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
