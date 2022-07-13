<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-13 09:18:03
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/tradeRecord.vue
-->
<template>
  <div class="user-experience">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="creativeInspirations"
      @newBtnClick="handleNewData"
      @editBtnClick="editData"
    >
      <template #isID="{ row }">
        <span>FL{{ row.id }}</span>
      </template>
      <template #isAuthor="{ row }">
        <div>{{ row.nickName }}</div>
        <div style="font-size: 12px">{{ row.nickId }}</div>
      </template>
      <template #isType="{ row }">
        {{ $filters.formatSelectTitle(row.feelType, feelList) }}
      </template>
      <template #isState="{ row }">
        {{ row.show ? '显示' : '隐藏' }}
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="creativeInspirations"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
      @changeSelect="handleChangeSelect"
    >
      <template v-if="showEditTable">
        <el-row :gutter="12">
          <el-col v-bind="modalConfigRef.colLayout">
            <div class="item-flex">
              <span class="item-title">
                <span class="item-tip">*</span>
                主关联资源
              </span>
              <el-select
                style="width: 100%"
                v-model="otherInfo.prep"
                placeholder="请选择主关联资源"
                multiple
                @change="handleChangePrep"
              >
                <el-option
                  v-for="item in prpeList"
                  :label="item.pname"
                  :value="item.moId"
                  :key="item.moId"
                  >{{ item.pname }}</el-option
                >
              </el-select>
            </div>
          </el-col>
          <el-col v-bind="modalConfigRef.colLayout">
            <div class="item-flex">
              <span class="item-title"> 副关联资源 </span>
              <el-select
                style="width: 100%"
                v-model="otherInfo.subPrep"
                multiple
                placeholder="请选择副关联资源"
                @change="handleChangeSubPrep"
              >
                <el-option
                  v-for="item in prpeList"
                  :label="item.pname"
                  :value="item.moId"
                  :key="item.moId"
                  >{{ item.pname }}</el-option
                >
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-divider
          >主副资源表格管理（选择对应资源后请填写对应的字段）</el-divider
        >
        <el-row>
          <!-- 主关联可编辑表格 -->
          <el-col :span="24">
            <div class="item-flex">
              <span class="item-title">主关联资源表格</span>
              <editor-table
                :listData="prepEditList"
                v-bind="prepModalConfig"
                :showHeader="false"
                style="width: 100%"
              >
                <template #handler="{ row }">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="handleDeletePrep(row, 'prep')"
                    >删除</el-button
                  >
                </template>
              </editor-table>
            </div>
          </el-col>
        </el-row>
        <!-- 副关联可编辑表格 -->
        <el-row>
          <el-col :span="24">
            <div class="item-flex">
              <span class="item-title">副关联表格</span>
              <editor-table
                :listData="subPrepEditList"
                v-bind="prepModalConfig"
                :showHeader="false"
                style="width: 100%"
              >
                <template #handler="{ row }">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="handleDeletePrep(row, 'subPrep')"
                    >删除</el-button
                  >
                </template>
              </editor-table>
            </div>
          </el-col>
        </el-row>
      </template>
      <!-- 国家/作者 -->
      <el-row :gutter="12">
        <el-col :span="12">
          <div class="item-flex">
            <span class="item-title">国家/地区</span>
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
        <el-col :span="12" v-if="showSearchAuthor">
          <div class="item-flex">
            <span class="item-title">作者名称</span>
            <el-select
              placeholder="请输入作者名称"
              style="width: 100%"
              filterable
              remote
              reserve-keyword
              clearable
              :remote-method="getAuthorList"
              :loading="loading"
              @change="handleChangeAuthor($event)"
              v-model="otherInfo.nickName"
            >
              <el-option
                v-for="option in authorList"
                :key="option.uid"
                :value="option.uid"
                :label="option.nickName"
                >{{ option.nickName }}</el-option
              >
            </el-select>
          </div>
        </el-col>
      </el-row>

      <!-- 图片 -->
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>作品图</span
            >
            <hy-upload
              fileTypeName="userExperience/"
              v-model:value="otherInfo.imageList"
            ></hy-upload>
          </div>
        </el-col>
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title"> <span class="item-tip">*</span>正文</span>
            <hy-editor
              ref="editorRef"
              fileTypeName="resourceCenterResource/"
              v-model:value="otherInfo.content"
            ></hy-editor>
          </div>
        </el-col>
      </el-row>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { prepModalConfig } from './config/edit.modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName, usePageList } from './hooks/use-page-list'
import { errorTip } from '@/utils/tip-info'
import { getCommonSelectList } from '@/service/common'
import { _debounce, mapTimeToSearch, mapSelectListTitle } from '@/utils'
import {
  userExperienceAuditList,
  resourceConditionList
} from '@/utils/select-list/map-resource-list'
import editorTable from '@/base-ui/table'
import hyEditor from '@/base-ui/editor'
import hyUpload from '@/base-ui/upload'
import { getItemData } from '@/service/common-api'
import { mapImageToObject } from '@/utils/index'
export default defineComponent({
  name: 'contentCenterCreativeInspiration',
  components: {
    editorTable,
    hyEditor,
    hyUpload
  },
  setup() {
    const otherInfo = ref<any>({
      author: '',
      imageList: [],
      imgList: [],
      content: null
    })
    const areaIds = ref<any>([])
    const [countryList] = usePageList()
    const prepEditList = ref<any>([]) // 主关联资源
    const subPrepEditList = ref<any>([]) // 副关联资源
    const showEditTable = ref<boolean>(false) // 是否展示可编辑表格
    const prpeList = ref<any>([])
    // 国家
    const handleChangeCountry = (item: any[]) => {
      const all: any[] = []
      const check = item.find((i: any) => i === -1)
      if (check === -1) {
        countryList.value
          .filter((i: any) => i.id !== -1)
          .forEach((item: any) => {
            all.push(item.id)
          })
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: all
        }
        areaIds.value = all
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: item
        }
      }
    }
    watchEffect(() => {
      if (areaIds.value.length === 0) {
        const region: any[] = []
        countryList.value
          .filter((i: any) => i.id !== -1)
          .forEach((item: any) => {
            region.push(item.id)
          })
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: region
        }
      }
    })
    watchEffect(() => {
      if (otherInfo?.value?.imageList?.length > 0) {
        otherInfo.value.imgList = otherInfo.value.imageList.map((item: any) => {
          return {
            img: item.url,
            signJson: JSON.stringify([])
          }
        })
      } else {
        otherInfo.value.imgList = []
        otherInfo.value.imageList = []
      }
    })
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const handleQueryBtnClick = (data: any) => {
      const beginDate = mapTimeToSearch(data.dateTime).start
      const endDate = mapTimeToSearch(data.dateTime).end
      handleQueryClick({
        ...data,
        beginDate,
        endDate
      })
    }
    const loading = ref<boolean>(false)
    const showSearchAuthor = ref<any>(true)
    const authorList = ref<any>([])
    const getAuthorList = _debounce(
      (keyword: string) => {
        loading.value = true
        getCommonSelectList('authorType', { author: keyword }, false)
          .then((res) => {
            if (res.result == 0) {
              authorList.value = res.data
            } else errorTip(res.msg)
          })
          .finally(() => (loading.value = false))
      },
      300,
      true
    )
    const handleChangeAuthor = (row: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        suid: row
      }
    }
    // 编辑新增操作

    const newData = () => {
      otherInfo.value = {
        author: '',
        imageList: [],
        imgList: [],
        content: null
      }
      areaIds.value = []
      prepEditList.value = []
      subPrepEditList.value = []
      showEditTable.value = false
    }
    const getData = (id: any) => {
      getItemData('contentCenterItem', { id: id, type: 2 }).then((res: any) => {
        if (!res.result) {
          res.data.isPrep
            ? (showEditTable.value = true)
            : (showEditTable.value = false)
          // 作品图
          let d0List = []
          d0List =
            res.data.imgList && res.data.imgList.length > 0
              ? res.data.imgList.map((i: any) => {
                  return mapImageToObject(i.img)
                })
              : []
          otherInfo.value = {
            ...otherInfo.value,
            id: id,
            suid: res.data.suid,
            areaIds: res.data.areaIds,
            nickName: res.data.nickName ? res.data.nickName : '',
            prep: res.data?.prep?.length > 0 ? res.data?.prep.split(',') : [],
            content: res.data.content,
            imageList: d0List
          }
          // 主副关联
          prepEditList.value =
            res.data.chief && res.data.chief.length > 0
              ? res.data.chief.map((i: any) => {
                  return {
                    ...i,
                    openType: mapSelectListTitle(
                      i.open,
                      resourceConditionList as any
                    )
                  }
                })
              : []
          subPrepEditList.value =
            res.data.noChief && res.data.noChief.length > 0
              ? res.data.noChief.map((i: any) => {
                  return {
                    ...i,
                    openType: mapSelectListTitle(
                      i.open,
                      resourceConditionList as any
                    )
                  }
                })
              : []
          areaIds.value = res.data.areaIds
          handleEditData({
            ...res.data,
            kid: 'FL' + id
          })
        } else errorTip(res.msg)
      })
    }
    const editData = (item: any) => {
      getData(item.id)
      // handleEditData({
      //   ...item
      // })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    // 获取下拉列表数据
    const feelList = ref<any>([])
    const labelList = ref<any>([])
    const getFeelType = () => {
      getCommonSelectList('contentCenter', { type: 2 }).then((res: any) => {
        if (!res.result) {
          feelList.value = res?.data.map((item: any) => {
            return {
              value: item.type,
              title: item.dec
            }
          })
        }
      })
    }
    getCommonSelectList('otherKeyType').then((res: any) => {
      if (!res.result) {
        labelList.value = res?.data.faceList.map((item: any) => {
          return {
            value: item.id,
            title: item.name
          }
        })
      }
    })
    getFeelType()
    const searchFormConfigRef = computed(() => {
      // const state = searchFormConfig.formItems.find(
      //   (i: any) => i.field === 'state'
      // )
      const feelType = searchFormConfig.formItems.find(
        (i: any) => i.field === 'feelType'
      )
      const prep = searchFormConfig.formItems.find(
        (i: any) => i.field === 'prep'
      )
      const subPrep = searchFormConfig.formItems.find(
        (i: any) => i.field === 'subPrep'
      )
      // state!.options = userExperienceAuditList
      feelType!.options = feelList.value
      prep!.options = prpeList.value.map((item: any) => {
        return {
          value: item.moId,
          title: item.pname
        }
      })
      subPrep!.options = prpeList.value.map((item: any) => {
        return {
          value: item.moId,
          title: item.pname
        }
      })
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      const keywordList = modalConfig.formItems.find(
        (i: any) => i.field === 'keywordList'
      )
      keywordList!.options = labelList.value
      // const state = modalConfig.formItems.find((i: any) => i.field === 'state')
      // state!.options = userExperienceAuditList
      const feelType = modalConfig.formItems.find(
        (i: any) => i.field === 'feelType'
      )
      feelType!.options = feelList.value
      return modalConfig
    })

    getCommonSelectList('prpeType').then((res) => {
      if (res.result === 0) {
        prpeList.value = res.data
      } else errorTip(res.msg)
    })
    const handleChangePrep = (value: any) => {
      if (value.length > 0) {
        let prpObj: any = {}
        let prepEditObj: any = {}
        let prepEditList2: any = []
        prpeList.value.map((v: any) => {
          prpObj[v.moId] = v
        })
        prepEditList.value.map((v: any) => {
          prepEditObj[v.moId] = v
        })
        value.map((v: any) => {
          if (prepEditObj[v]) {
            prepEditList2.push(prepEditObj[v])
          } else if (prpObj[v]) {
            let d = prpObj[v]
            prepEditList2.push({
              ...d,
              openType: mapSelectListTitle(d.open, resourceConditionList)
            })
          }
          prepEditObj[v] = v
        })
        prepEditList.value = prepEditList2
      } else prepEditList.value = []
    }
    const handleChangeSubPrep = (value: any) => {
      if (value.length > 0) {
        let prpObj: any = {}
        let prepEditObj: any = {}
        let prepEditList2: any = []
        prpeList.value.map((v: any) => {
          prpObj[v.moId] = v
        })
        subPrepEditList.value.map((v: any) => {
          prepEditObj[v.moId] = v
        })
        value.map((v: any) => {
          if (prepEditObj[v]) {
            prepEditList2.push(prepEditObj[v])
          } else if (prpObj[v]) {
            let d = prpObj[v]
            prepEditList2.push({
              ...d,
              openType: mapSelectListTitle(d.open, resourceConditionList)
            })
          }
          prepEditObj[v] = v
        })
        subPrepEditList.value = prepEditList2
      } else subPrepEditList.value = []
    }
    const handleDeletePrep = (row: any, type: string) => {
      if (type === 'prep') {
        const checkItem = prepEditList.value.findIndex(
          (i: any) => i.moId === row.moId
        )
        const selectItem = otherInfo.value.prep.findIndex(
          (i: any) => i === row.moId
        )
        prepEditList.value.splice(checkItem, 1)
        otherInfo.value.prep.splice(selectItem, 1)
      } else {
        const checkItem = subPrepEditList.value.findIndex(
          (i: any) => i.moId === row.moId
        )
        const selectItem = otherInfo.value.subPrep.findIndex(
          (i: any) => i === row.moId
        )
        subPrepEditList.value.splice(checkItem, 1)
        otherInfo.value.subPrep.splice(selectItem, 1)
      }
    }
    // 暂时不用这里的逻辑
    const handleChangeSelect = (item: any) => {
      const { field, value } = item
      if (field === 'isPrep' && +value === 1) {
        showEditTable.value = true
      }
      if (+value === 0 && field === 'isPrep') {
        showEditTable.value = false
      }
    }
    return {
      userExperienceAuditList,
      feelList,
      handleChangeCountry,
      handleChangeAuthor,
      countryList,
      areaIds,
      searchFormConfig,
      searchFormConfigRef,
      handleResetClick,
      handleQueryClick,
      handleQueryBtnClick,
      // 主副关联区域
      prepModalConfig,
      handleChangeSubPrep,
      handleChangePrep,
      handleChangeSelect,
      handleDeletePrep,
      prepEditList,
      subPrepEditList,
      showEditTable,
      prpeList,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo,
      editData,
      getAuthorList,
      authorList,
      showSearchAuthor,
      loading
    }
  }
})
</script>
