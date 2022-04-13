<!--
 * @Author: your name
 * @Date: 2022-04-12 13:38:30
 * @LastEditTime: 2022-04-12 22:59:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/components/property.vue
-->
<template>
  <page-modal
    :defaultInfo="defaultInfo"
    ref="pageModalRef"
    pageName="centers"
    :modalConfig="propertyModalConfig"
    :operationName="operationName"
    :otherInfo="otherInfo"
    @changeSelect="handleChangeSelect"
    :showConfigBtn="false"
    :showCancelBtn="false"
  >
    <template #otherModalHandler="{ row }">
      <el-button size="mini" @click="cancelData(row)">取消</el-button>
      <el-button size="mini" type="primary" @click="sendData(row)"
        >确定</el-button
      >
    </template>
    <template #titleWrapper>
      <step-component
        :active="0"
        :editType="editType"
        @openStep="openStep"
      ></step-component>
    </template>
    <!-- 使用条件 -->
    <el-row :gutter="12">
      <el-col
        v-bind="propertyModalConfig.colLayout"
        v-if="otherInfo.open === 2 || editType === 'edit'"
      >
        <div class="item-flex">
          <span class="item-title">商品编号</span>
          <el-select
            v-model="otherInfo.snId"
            placeholder="商品编号"
            style="width: 100%"
            :disabled="
              otherInfo.open === 2 && editType === 'add' ? true : false
            "
          >
            <el-option
              v-for="item in goodsList"
              :key="item.value"
              :label="item.title"
              :value="item.value"
              >{{ item.title }}</el-option
            >
          </el-select>
        </div>
      </el-col>
      <el-col
        v-bind="propertyModalConfig.colLayout"
        v-if="otherInfo.open === 2"
      >
        <div class="item-flex">
          <span class="item-title">销售价</span>
          <el-input-number
            min="0"
            v-model="otherInfo.sale"
            placeholder="请输入销售价"
            style="width: 100%"
          ></el-input-number>
        </div>
      </el-col>
      <el-col
        v-bind="propertyModalConfig.colLayout"
        v-if="otherInfo.open === 4"
      >
        <div class="item-flex">
          <span class="item-title">功能分类</span>
          <el-checkbox-group v-model="otherInfo.vipList">
            <el-checkbox
              v-for="item in functionExclusiveUseConditionsList"
              :key="item.value"
              :label="item.value"
              >{{ item.title }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </el-col>
    </el-row>
    <!-- 国家地区 -->
    <el-row :gutter="12">
      <el-col v-bind="propertyModalConfig.colLayout">
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
              :value="option.value"
              :label="option.title"
              >{{ option.title }}</el-option
            >
          </el-select>
        </div>
      </el-col>
    </el-row>
    <!-- 资源特色 -->
    <el-tooltip content="最多只能选择三个" placement="top">
      <el-divider>资源特色 </el-divider></el-tooltip
    >
    <el-checkbox-group v-model="otherInfo.specialIcon" :max="3">
      <el-row>
        <div class="hg-flex hg-mb-3">
          <span class="tip-title">重点功能：</span>
          <template v-for="item in resourceFeature" :key="item.value">
            <el-checkbox v-if="item.type === 1" :label="item.value">{{
              item.title
            }}</el-checkbox>
          </template>
        </div>
      </el-row>
      <el-row>
        <div class="hg-flex hg-mb-3">
          <span class="tip-title">模型精度：</span>
          <template v-for="item in resourceFeature" :key="item.value">
            <el-checkbox v-if="item.type === 2" :label="item.value">{{
              item.title
            }}</el-checkbox>
          </template>
        </div>
      </el-row>
      <el-row>
        <div class="hg-flex hg-mb-3 hg-flex-wrap">
          <span class="tip-title">POFI 系列：</span>
          <template v-for="item in resourceFeature" :key="item.value">
            <el-checkbox v-if="item.type === 3" :label="item.value">{{
              item.title
            }}</el-checkbox>
          </template>
        </div>
      </el-row>
      <el-row>
        <div class="hg-flex hg-mb-3 hg-flex-wrap">
          <span class="tip-title">合作品牌IP：</span>
          <template v-for="item in resourceFeature" :key="item.value">
            <el-checkbox v-if="item.type === 4" :label="item.value">{{
              item.title
            }}</el-checkbox>
          </template>
        </div>
      </el-row>
    </el-checkbox-group>
  </page-modal>
</template>

<script lang="ts">
import {
  useStoreName,
  useMapFormConfigData,
  useMapPropertyData,
  useCountrySelect,
  usePageList
} from '../hooks/use-page-list'
import { defineComponent, watchEffect, onMounted, nextTick } from 'vue'
import { usePageModal } from '@/hooks/use-page-modal'
import stepComponent from './step.vue'
import { errorTip, infoTipBox, successTip } from '@/utils/tip-info'
import { addProperty, updateProperty } from '@/service/main/resource/center'

export default defineComponent({
  components: {
    stepComponent
  },
  props: {
    editType: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['getData', 'changePage', 'openStep'],
  setup(props, { emit }) {
    const { goodsList } = usePageList()
    const [
      searchFormConfigData,
      resourceTypeList,
      resourceConditionList,
      resourceValueList,
      unityModalFilterList,
      unityModalList
    ] = useMapFormConfigData()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    const [otherInfo, areaIds, handleChangeCountry] = useCountrySelect()
    const [storeTypeInfo, operationName] = useStoreName()
    const {
      propertyModalConfig,
      resourceFeature,
      functionExclusiveUseConditionsList,
      countryList
    } = useMapPropertyData()
    // 控制使用条件
    const handleChangeSelect = (item: any) => {
      if (item.field === 'open') {
        otherInfo.value = {
          ...otherInfo.value,
          open: +item.value
        }
      }
    }
    // if (props.editType === 'edit') {
    //   areaIds.value = props.params.areaIds
    // }
    const cancelData = (item: any) => {
      infoTipBox({
        title: '提示',
        message: '是否保存当前编辑内容？'
      })
        .then(() => {
          sendData(item, 'cancel')
        })
        .catch(() => {
          if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = false
          }
        })
    }
    const addData = (item: any) => {
      const data = {
        ...item,
        ...otherInfo.value,
        keyFunc: item.keyFunc.toString(),
        vipList: otherInfo.value.vipList
          ? otherInfo.value.vipList.toString()
          : [],
        specialIcon: otherInfo.value.specialIcon
          ? otherInfo.value.specialIcon.toString()
          : [],
        msId: item.msId.toString()
      }
      console.log(data)
      addProperty(data).then((res: any) => {
        if (res.result === 0) {
          successTip('保存成功')
          if (pageModalRef.value) pageModalRef.value.dialogVisible = false
          emit('changePage', 'resource', { ...item, moId: res.data })
        } else errorTip(res.msg)
      })
    }
    const editData = (item: any) => {
      const data = {
        ...item,
        ...otherInfo.value,
        keyFunc: item.keyFunc.toString(),
        vipList: otherInfo.value.vipList
          ? otherInfo.value.vipList.toString()
          : [],
        specialIcon: otherInfo.value.specialIcon
          ? otherInfo.value.specialIcon.toString()
          : [],
        msId: item.msId.toString()
      }
      console.log(data)
      updateProperty(data).then((res: any) => {
        if (res.result === 0) {
          successTip('保存成功')
          // if (pageModalRef.value) pageModalRef.value.dialogVisible = false
        } else errorTip(res.msg)
      })
    }
    const sendData = (item: any, type = 'config') => {
      const formRef = item.ref.formRef
      const data = item.data
      formRef?.validate((valid: any) => {
        if (valid) {
          if (props.editType === 'add') {
            if (pageModalRef.value) {
              if (type === 'cancel') {
                pageModalRef.value.dialogVisible = false
              } else {
                addData(data)
              }
            }
          } else {
            debugger
            editData(item)
          }
        }
      })
    }
    const openStep = (step: any) => {
      if (props.editType === 'add' && !props.params.moId) {
        errorTip('未完成资源创建，无法跳转步骤')
      } else emit('openStep', step, props.params)
    }
    return {
      openStep,
      sendData,
      cancelData,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      searchFormConfigData,
      resourceTypeList,
      resourceConditionList,
      resourceValueList,
      unityModalFilterList,
      unityModalList,
      storeTypeInfo,
      operationName,
      otherInfo,
      areaIds,
      handleChangeCountry,
      propertyModalConfig,
      resourceFeature,
      functionExclusiveUseConditionsList,
      countryList,
      handleChangeSelect,
      goodsList
    }
  }
})
</script>

<style scoped></style>
