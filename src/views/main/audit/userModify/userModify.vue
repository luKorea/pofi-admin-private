<template>
  <hy-card title="用户资料审核">
    <template #handler>
      <div class="hg-mr-4">
        <el-badge :value="dataCount" type="danger">
          <el-button size="mini" @click="batchAdoptData">批量通过</el-button>
        </el-badge>
      </div>
    </template>
    <template v-if="dataList && dataList.length > 0">
      <el-row :gutter="12">
        <el-col v-for="item in dataList" :key="item.uid" v-bind="colLayout">
          <hy-card
            :title="item.name"
            shadow="hover"
            style="margin-bottom: 10px"
          >
            <page-image
              :img-src="item.head"
              showHeight="100%"
              showWidth="100%"
              style="border-radius: 8px"
              :lazy="true"
            ></page-image>
            <template #footer>
              <el-button type="text" size="mini" @click="handleEdit(item)"
                >审核</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="handleChangeUserModify(item.uid, item)"
                :disabled="item.disabled"
                >驳回</el-button
              >
            </template>
          </hy-card>
        </el-col>
      </el-row>
    </template>
  </hy-card>
  <page-modal
    :defaultInfo="defaultInfo"
    ref="pageModalRef"
    :pageName="pageName"
    :modalConfig="modalConfig"
    :operationName="operationName"
    :otherInfo="otherInfo"
  >
    <el-divider>处理操作</el-divider>
    <el-row>
      <el-col>
        <div class="item-flex">
          <span class="item-title">处理分类</span>
          <el-radio-group v-model="selectType" class="ng-mt-1">
            <el-radio
              v-for="item in operationList"
              :label="item.value"
              :key="item.value"
              >{{ item.title }}</el-radio
            >
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col v-bind="modalConfig.colLayout" v-if="selectType === 1">
        <div class="item-flex">
          <span class="item-title">禁言时长</span>
          <el-input-number
            style="width: 100%"
            placeholder="请输入禁言时长, 按天数计算"
            min="0"
            v-model="otherInfo.time"
          ></el-input-number>
        </div>
      </el-col>
      <template v-if="selectType !== 4 || selectType !== 5">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">{{ showTitle }}</span>
            <el-input v-model="count" style="width: 100%" disabled></el-input>
          </div>
        </el-col>
      </template>
    </el-row>
  </page-modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useStoreName, usePageData } from './hook/use-page-list'
import HyCard from '@/base-ui/card/index'

import { usePageModal } from '@/hooks/use-page-modal'
import { modalConfig } from './config/modal.config'
import { checkUserModify, batchAdopt } from '@/service/main/audit/userModify'
import { successTip, errorTip, infoTipBox } from '@/utils/tip-info'

export default defineComponent({
  name: 'auditUserModify',
  components: {
    HyCard
  },
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [dataList, dataCount, getData, pageName] = usePageData()
    // 审核操作
    const operationList = ref<any>([
      { title: '禁言', value: 1 },
      { title: '口头警告', value: 2 },
      { title: '七天封号', value: 3 },
      { title: '封禁账号', value: 4 },
      { title: '封禁设备', value: 5 }
    ])
    const selectType = ref<number>(1)
    const count = ref<number>(0)
    const showTitle = computed(() => {
      let title = ''
      switch (selectType.value) {
        case 1:
          title = '禁言次数'
          break
        case 2:
          title = '警告次数'
          break
        case 3:
          title = '七天封号次数'
          break
      }
      return title
    })
    const colLayout = ref<any>({
      xl: 4, // >1920px 4个
      lg: 4,
      md: 6,
      sm: 12,
      xs: 24
    })
    const [pageModalRef, defaultInfo, , handleEditData] = usePageModal()
    const otherInfo = ref<any>()
    const handleEdit = (item: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        uid: item.uid
      }
      handleEditData(item)
    }
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        time: 0,
        type: selectType.value ?? 1
      }
    })
    // 驳回操作
    const handleChangeUserModify = (uid: any, item: any) => {
      infoTipBox({
        title: '驳回操作',
        message: `你确定驳回用户${item.name}的资料吗`
      })
        .then(() => {
          checkUserModify({ uid: uid }).then((res) => {
            if (res.result === 0) {
              successTip(res.msg)
              const selectItem = dataList.value.findIndex(
                (item: any) => item.uid === uid
              )
              dataList.value.splice(selectItem, 1, {
                ...item,
                disabled: true,
                head: 'https://f2.pofiart.com/LOGO.png'
              })
            } else errorTip(res.msg)
          })
        })
        .catch((err) => console.log(err))
    }
    const uids = computed(() => {
      return dataList.value.map((item: any) => {
        return item.uid
      })
    })
    // 批量通过
    const batchAdoptData = () => {
      infoTipBox({
        title: '批量通过',
        message: '你确定批量通过审核吗'
      })
        .then(() => {
          batchAdopt({ uids: JSON.stringify(uids.value) }).then((res) => {
            if (res.result === 0) {
              successTip(res.msg)
              getData()
            } else errorTip(res.msg)
          })
        })
        .catch((err) => console.log(err))
    }
    return {
      storeTypeInfo,
      operationName,
      colLayout,
      getData,
      dataList,
      dataCount,
      pageName,
      pageModalRef,
      modalConfig,
      defaultInfo,
      otherInfo,
      handleEdit,
      handleEditData,
      handleChangeUserModify,
      operationList,
      selectType,
      showTitle,
      count,
      batchAdoptData
    }
  }
})
</script>

<style scoped></style>
