<template>
  <div class="hg-flex help-questionType">
    <page-country
      ref="countryRef"
      :countryList="handleCountryList"
      @selectCountryItem="selectCountryClick"
    ></page-country>
    <div class="page-country-wrap">
      <el-row :gutter="12">
        <el-col :span="12">
          <seriesComponent @nodeClick="nodeClick"></seriesComponent>
        </el-col>
        <el-col :span="12">
          <page-search
            :searchFormConfig="searchFormConfigRef"
            @resetBtnClick="handleResetBtnClick"
            @queryBtnClick="handleQueryBtnClick"
          />
        </el-col>
      </el-row>
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="resourceHomes"
        @newBtnClick="handleNewData"
        @editBtnClick="editData"
      >
        <template #isStatus="scope">
          {{ scope.row.status == 1 ? '显示' : '不显示' }}
        </template>
        <template #isLibrary="scope">
          {{ scope.row.library == 1 ? '人偶库' : 'pose库' }}
        </template>
        <template #isType="scope">
          {{ $filters.formatSelectTitle(scope.row.type, contentList) }}
        </template>
        <template #isCountry="scope">
          {{ $filters.formatSelectTitle(scope.row.rid, countryListMap) }}
        </template>
        <template #isCategory="scope">
          {{ $filters.formatSelectTitle(scope.row.category, categoryList) }}
        </template>
      </page-content>
    </div>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="resourceHomes"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
      @changeSelect="handleChangeSelect"
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
              内容标题
            </span>
            <el-input
              v-model="languageItem.title"
              placeholder="请输入内容标题"
              clearable
            ></el-input>
          </div>
          <!-- 可编辑表格 -->
          <editor-table
            :listData="languageItem.childListStr"
            v-bind="contentTableEditConfigRef"
            :handleDraw="operationType == 'add' ? false : true"
            :editTableDraw="operationType == 'add' ? false : true"
            @drawTable="handleDrawTable"
          >
            <template #otherHandler>
              <el-button type="primary" size="mini" @click="handleNewTableData"
                >新增</el-button
              >
            </template>
            <template #isShare="{ row }">
              <el-button
                type="text"
                size="mini"
                @click="handleChangeEditTableShape(row)"
                >{{
                  +row.shape === 1
                    ? '大横矩形'
                    : +row.shape === 2
                    ? '小横矩形'
                    : '无'
                }}</el-button
              >
            </template>
            <template #isStatus="{ row }">
              <el-button
                type="primary"
                size="mini"
                @click="handleChangeEditTableStatus(row)"
                >{{ +row.state === 1 ? '显示' : '隐藏' }}</el-button
              >
            </template>
            <template #isSelect="{ row }">
              <el-select
                placeholder="资源搜索"
                style="width: 100%"
                filterable
                remote
                reserve-keyword
                :loading="loading"
                :remote-method="handleChangeResourceData"
                @change="handleChangeResourceItemData(row.tid)"
                v-model="row.tid"
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
              <el-button
                type="danger"
                size="mini"
                @click="handleDeleteEditTableData(row.tempId, row)"
                >删除</el-button
              >
            </template>
          </editor-table>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
  watch,
  nextTick
} from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { contentTableEditConfig } from './config/content.edit-config'
import { modalConfig } from './config/modal.config'

import { useMapCountry } from '@/hooks/use-page-side-country'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useStoreName,
  useSetLanguage,
  usePageList,
  useImageUpload,
  useEditTableData,
  mapFormConfigData
} from './hooks/use-page-list'
import { getItemData, sortPageTableData } from '@/service/common-api'
import editorTable from '@/base-ui/table'
import { mapImageToObject } from '@/utils/index'
import { successTip, errorTip, warnTip } from '@/utils/tip-info'
import seriesComponent from './components/indexSeries.vue'
import { uid } from 'uid'
import { getCommonSelectList } from '@/service/common'
export default defineComponent({
  name: 'resourceHome',
  components: {
    editorTable,
    seriesComponent
  },
  setup() {
    // 变量声明
    const [imgLimit] = useImageUpload()
    const otherInfo = ref<any>({})
    const operationType = ref<string>('add')
    // 下拉地区
    const areaIds = ref<any>([])
    const searchFormConfigRef = computed(() => {
      searchFormConfig.formItems.map((item: any) => {
        if (item.field === 'type') item!.options = contentList.value
      })
      return searchFormConfig
    })
    const modalConfigRef = computed(() => {
      modalConfig.formItems.map((item: any) => {
        if (item.field === 'type') item!.options = contentList.value
      })
      return modalConfig
    })
    const contentTableEditConfigRef = computed(() => {
      return contentTableEditConfig
    })
    // 资源搜索下拉
    // 资源管理
    let Temp: any[] = []
    let TempLength: any = 0
    function unique(arr: any) {
      let res: any = new Set()
      return arr.filter((item: any) => {
        let id = item.tid
        if (res.has(id)) {
          return false
        } else {
          res.add(id)
          return true
        }
      })
    }
    function handlechildListStr() {
      let childListStr = unique(languageItem.value.childListStr || [])
      let length = childListStr.length
      if (languageItem.value.childListStr.length > length) {
        languageItem.value.childListStr = childListStr
      }
      return childListStr.length
    }
    const handleChangeLanguage = async (id: any) => {
      let length
      if (editTableType.value !== 1 && editTableType.value !== undefined) {
        length = handlechildListStr()
        if (TempLength < length) {
          TempLength = length
          Temp = languageItem.value.childListStr
        }
      }
      languageId.value = id
      await nextTick()
      if (editTableType.value !== 1 && editTableType.value !== undefined) {
        length = handlechildListStr()
        if (TempLength > length) {
          for (let index = length; index < TempLength; index++) {
            handleNewTableData2(Temp[index])
          }
          await nextTick()
          console.log('Temp', languageItem.value.childListStr)
          for (
            let index = 0;
            index < languageItem.value.childListStr.length;
            index++
          ) {
            const item = languageItem.value.childListStr[index]
            getCommonSelectList(
              'resourceType',
              { keyword: item.tid, lid: languageItem.value.lid },
              false
            )
              .then((res) => {
                if (res.state) {
                  handleChangeResourceItemData2(item.tid, res.data ?? [])
                } else errorTip(res.msg)
              })
              .finally(() => (loading.value = false))
          }
        } else {
          const info1 = [...languageItem.value.childListStr]
          const newArr = [
            ...new Set(info1.map((e: any) => JSON.stringify(e)))
          ].map((e) => JSON.parse(e))
          languageItem.value.childListStr = newArr
        }
      }
    }
    const handleChangeResourceData = async (keyword: string) => {
      getResourceList(keyword, languageItem.value.lid)
      await nextTick()
      resourceList.value = []
    }
    const handleChangeResourceItemData = (tid: any) => {
      const listData = languageItem.value.childListStr
      const selectItem = resourceList.value.find(
        (item: any) => item.moId === tid
      )
      const index = listData.findIndex((item: any) => item.tid === tid)
      listData.splice(index, 1, {
        cover: selectItem.cover,
        gift: selectItem.gift,
        title: selectItem.name,
        subTitle: selectItem.seriesName,
        tid: selectItem.moId,
        coverList: selectItem.cover ? [mapImageToObject(selectItem.cover)] : [],
        giftList: selectItem.gift ? [mapImageToObject(selectItem.gift)] : [],
        state: 1,
        lid: languageItem.value.lid,
        tempId: uid(8),
        newField: true
      })
    }
    const handleChangeResourceItemData2 = (tid: any, rList: any) => {
      const listData = languageItem.value.childListStr
      const selectItem = rList.find((item: any) => item.moId === tid)
      const index = languageItem.value.childListStr.findIndex(
        (item: any) => item.tid === tid
      )
      if (selectItem) {
        listData.splice(index, 1, {
          cover: selectItem.cover,
          gift: selectItem.gift,
          title: selectItem.name,
          subTitle: selectItem.seriesName,
          tid: selectItem.moId,
          coverList: selectItem.cover
            ? [mapImageToObject(selectItem.cover)]
            : [],
          giftList: selectItem.gift ? [mapImageToObject(selectItem.gift)] : [],
          state: 1,
          lid: languageItem.value.lid,
          tempId: uid(8),
          newField: true
        })
      }
    }
    // 下拉数据搜索
    const editTableType = ref<any>(undefined)
    const {
      pageContentRef,
      handleCountryList,
      countryRef,
      selectCountryClick,
      selectNodeClick,
      handleQueryBtnClick,
      handleResetBtnClick
    } = useMapCountry(false)
    const nodeClick = (data: any) => {
      selectNodeClick(data)
    }
    // 下拉数据
    const [contentList, categoryList] = mapFormConfigData()
    // 编辑表格
    // 用来保存所有语言新增的内容
    const backList = ref<any>([])
    const [listData, newTableData, deleteTableData] = useEditTableData()
    const handleNewTableData = () => {
      if (editTableType.value) {
        let res = []
        res.push({
          title: '',
          subTitle: '',
          cover: '',
          coverList: [],
          gift: '',
          giftList: [],
          state: 1, // 1. 显示 0. 不显示
          tid: '',
          shape: editTableType.value === 8 ? 1 : 0, // shape 0:无,1:大横矩形,2:小横矩形
          jump: '',
          lid: languageItem.value.lid,
          tempId: uid(8),
          newField: true
        })
        const info1 = [...languageItem.value.childListStr, ...res]
        const newArr = [
          ...new Set(info1.map((e: any) => JSON.stringify(e)))
        ].map((e) => JSON.parse(e))
        languageItem.value.childListStr = newArr
      } else warnTip('请先选择样式类型')
    }
    const handleNewTableData2 = (info: any) => {
      console.log(info, 'info')
      let res: any[] = []
      let obj: any = {
        title: '',
        subTitle: '',
        cover: '',
        coverList: [],
        gift: '',
        giftList: [],
        state: 1, // 1. 显示 0. 不显示
        tid: info.tid,
        shape: editTableType.value === 8 ? 1 : 0, // shape 0:无,1:大横矩形,2:小横矩形
        jump: '',
        lid: languageItem.value.lid,
        tempId: uid(8),
        newField: true
      }
      console.log(obj, 'obj')
      res.push(obj)
      const info1 = [...languageItem.value.childListStr, ...res]
      const newArr = [...new Set(info1.map((e: any) => JSON.stringify(e)))].map(
        (e) => JSON.parse(e)
      )
      languageItem.value.childListStr = newArr
    }
    const handleDeleteEditTableData = (tempId: any, row: any) => {
      if (operationType.value === 'add') {
        const index = languageItem.value.childListStr.findIndex(
          (res: any) => res.tempId === tempId
        )
        languageItem.value.childListStr.splice(index, 1)
      } else {
        if (row.id) {
          const index = languageItem.value.childListStr.findIndex(
            (res: any) => res.id === row.id
          )
          languageItem.value.childListStr.splice(index, 1)
        } else {
          const index = languageItem.value.childListStr.findIndex(
            (res: any) => res.tempId === tempId
          )
          languageItem.value.childListStr.splice(index, 1)
        }
      }
      // 暂时不做处理
      // if (operationType.value === 'add') deleteTableData(item)
      // else {
      //   console.log(1111)
      // }
    }
    // 多语言
    const [
      editorRef,
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      requiredField,
      mapIconState
    ] = useSetLanguage()
    watchEffect(() => {
      if (languageItem?.value?.childListStr?.length > 0) {
        languageItem.value.childListStr = languageItem.value.childListStr.map(
          (item: any) => {
            return {
              ...item,
              cover:
                item.coverList && item.coverList.length > 0
                  ? item.coverList[0].url
                  : '',
              gift:
                item.giftList && item.giftList.length > 0
                  ? item.giftList[0].url
                  : ''
            }
          }
        )
        console.log(languageItem.value.childListStr, 'demo')
      }
    })
    const [countryList, resourceList, getResourceList, loading] = usePageList()
    const countryListMap = computed(() => {
      return countryList.value.map((item: any) => {
        return {
          title: item.name,
          value: item.id
        }
      })
    })
    const [storeTypeInfo, operationName] = useStoreName()
    const backId = ref<any>()
    const handleDrawTable = (data: any) => {
      backId.value = languageId.value
      const nothing = data.find((i: any) => i.newField)
      if (nothing) {
        warnTip('当前表格有新增项，请填写保存后，再排序，否则排序无效', 2000)
      } else {
        const idList = data.map((item: any) => +item.id)
        const lid = data[0].lid
        sortPageTableData('/cms/index/child/updateSort', {
          idList: JSON.stringify(idList),
          rid: otherInfo.value.rid,
          parent: otherInfo.value.id,
          lid: lid
        }).then((res: any) => {
          if (res.result === 0) {
            successTip(res.msg)
            getItem(otherInfo.value, true)
          } else errorTip(res.msg)
        })
      }
    }
    watchEffect(() => {
      if (areaIds.value && areaIds.value.length === 0) {
        const region: any[] = []
        countryList.value
          .filter((i: any) => i.id !== -1)
          .forEach((item: any) => {
            region.push(item.id)
          })
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: region.toString()
        }
      }
      // const indexJSON = languageList.value.map((i: any) => {
      //   console.log(i.childListStr, '数据格式')
      //   return {
      //     ...i,
      //     childList: undefined,
      //     childListStr: JSON.stringify(i.childListStr)
      //   }
      // })
      otherInfo.value = {
        ...otherInfo.value,
        indexJson: languageList.value
      }
    })
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
          areaIds: all.toString()
        }
        areaIds.value = all
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: item.toString()
        }
      }
    }
    // const mapShowItem = (showTrue, showFalse) => {
    //   contentTableEditConfig.propList.map((item: any) => {
    //     if (item.prop === 'title' && item.label === '按钮名称')
    //       item!.isHidden = false
    //     if (item.prop === 'shape') item!.isHidden = true
    //     if (item.prop === 'tid') item!.isHidden = true
    //     if (item.prop === 'title' && item.label === '标题')
    //       item!.isHidden = true
    //     if (item.prop === 'subTitle') item!.isHidden = true
    //     if (item.prop === 'giftList') item!.isHidden = true
    //     if (item.prop === 'jump') item!.isHidden = false
    //   })
    // }
    // 映射可编辑表格数据
    const mapDiffParams = () => {
      if (editTableType.value !== undefined) {
        languageItem.value.childListStr = []
        if (editTableType.value === 1) {
          contentTableEditConfig.propList.map((item: any) => {
            if (item.prop === 'title' && item.label === '按钮名称')
              item!.isHidden = false
            if (item.prop === 'shape') item!.isHidden = true
            if (item.prop === 'tid') item!.isHidden = true
            if (item.prop === 'title' && item.label === '标题')
              item!.isHidden = true
            if (item.prop === 'subTitle') item!.isHidden = true
            if (item.prop === 'giftList') item!.isHidden = true
            if (item.prop === 'jump') item!.isHidden = false
          })
        } else if (editTableType.value === 8) {
          contentTableEditConfigRef.value.propList.map((item: any) => {
            if (item.prop === 'title' && item.label === '按钮名称')
              item!.isHidden = true
            if (item.prop === 'shape') item!.isHidden = false
            if (item.prop === 'tid') item!.isHidden = false
            if (item.prop === 'title' && item.label === '标题')
              item!.isHidden = false
            if (item.prop === 'subTitle') item!.isHidden = false
            if (item.prop === 'jump') item!.isHidden = true
            if (item.prop === 'giftList') item!.isHidden = false
          })
        } else {
          contentTableEditConfigRef.value.propList.map((item: any) => {
            if (item.prop === 'title' && item.label === '按钮名称')
              item!.isHidden = true
            if (item.prop === 'shape') item!.isHidden = true
            if (item.prop === 'tid') item!.isHidden = false
            if (item.prop === 'title' && item.label === '标题')
              item!.isHidden = false
            if (item.prop === 'subTitle') item!.isHidden = false
            if (item.prop === 'jump') item!.isHidden = true
            if (item.prop === 'giftList') item!.isHidden = false
          })
        }
      }
    }
    // 映射分类数据
    const mapCategoryList = (value: any) => {
      modalConfig.formItems.map((item: any) => {
        if (item.field === 'category') {
          item!.options = []
        }
      })
      modalConfig.formItems.map((item: any) => {
        if (item.field === 'category') {
          categoryList.value.map((i: any) => {
            if (i.parent === value) {
              item!.options.push({
                title: i.title,
                value: i.value
              })
            }
          })
        }
      })
    }
    const handleChangeSelect = (data: any) => {
      if (data.field === 'library') mapCategoryList(data.value)
      if (data.field === 'type') {
        editTableType.value = +data.value
        mapDiffParams()
      }
    }
    // 可编辑表格改变矩形以及状态
    const handleChangeEditTableShape = (row: any) => {
      if (row.shape === 1) {
        row.shape = 2
      } else if (row.shape === 2) row.shape = 1
      console.log(row.shape)
    }
    const handleChangeEditTableStatus = (row: any) => {
      row.state = row.state === 1 ? 0 : 1
    }
    const newData = () => {
      // 清空原有数据
      operationType.value = 'add'
      areaIds.value = []
      listData.value = []
      editTableType.value = undefined
      otherInfo.value = {}
      mapDiffParams()
      mapCategoryList(undefined)
      resetLanguageList()
    }
    const getItem = (item: any, isItem = false) => {
      resetLanguageList()
      getItemData('homeIndexItem', {
        id: item.id,
        rid: item.rid
      }).then(async (res) => {
        if (res.result === 0) {
          const data = res.data
          // 国家地区
          areaIds.value = data.index.areaList
          if (data?.index?.indexList) {
            const result = data.index.indexList.map((item: any) => {
              if (item.childList) {
                item['childListStr'] = []
                item.childList.map((i: any) => {
                  item.childListStr.push({
                    ...i,
                    giftList: i.gift ? [mapImageToObject(i.gift)] : [],
                    coverList: i.cover ? [mapImageToObject(i.cover)] : []
                  })
                })
                return item
              } else {
                return {
                  ...item
                }
              }
            })
            console.log(result, 'resulr')
            const info = languageList.value.map((item: any) => {
              let res = result.find((i: any) => i.lid === item.lid)
              if (res) {
                return {
                  ...item,
                  ...res
                }
              } else {
                return {
                  ...item
                }
              }
            })
            await nextTick()
            languageList.value = info
            languageId.value = !isItem ? info[0].lid : backId.value
            mapIconState(info, requiredField.value)
          }
          otherInfo.value = {
            ...otherInfo.value,
            areaIds: data.index.areaList.toString(),
            rank: item.rank
          }
        } else errorTip(res.msg)
      })
    }
    const editData = (item: any) => {
      operationType.value = 'edit'
      editTableType.value = +item.type
      otherInfo.value = {
        ...otherInfo.value,
        id: item.id,
        rid: item.rid
      }
      resetLanguageList()
      mapDiffParams()
      mapCategoryList(item.library)
      getItem(item)
      handleEditData(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    return {
      nodeClick,
      contentList,
      categoryList,
      resourceList,
      getResourceList,
      loading,
      handleChangeSelect,
      handleChangeResourceData,
      handleChangeResourceItemData,
      // 编辑表格
      operationType,
      contentTableEditConfig,
      handleNewTableData,
      handleDeleteEditTableData,
      handleChangeEditTableShape,
      handleChangeEditTableStatus,
      listData,
      deleteTableData,
      handleDrawTable,
      // 侧边国家
      pageContentRef,
      handleCountryList,
      countryRef,
      selectCountryClick,
      handleQueryBtnClick,
      handleResetBtnClick,
      // 下拉框数据
      areaIds,
      countryList,
      countryListMap,
      handleChangeCountry,
      // 多语言编辑
      imgLimit,
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
      otherInfo,
      contentTableEditConfigRef,
      backList
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
