<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 14:47:10
 * @Description: 完成
 * @FilePath: /pofi-admin/src/views/main/base/area/area.vue
-->
<template>
  <div class="base-area">
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="areas"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #slotState="scope">
        <span>{{ scope.row.state ? '启用' : '禁用' }}</span>
      </template>
      <template #slotImage="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="点击查看大图"
          placement="top-start"
        >
          <el-image
            :src="scope.row.picture"
            style="width: 40px; height: 40px"
            fit="cover"
            :preview-src-list="[scope.row.picture]"
          >
            <template #error>
              <div class="image-slot" style="font-size: 50px">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </el-tooltip>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="areas"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">图片上传</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="base/"
              v-model:value="imgList"
            ></hy-upload>
          </div>
        </el-col>
      </el-row>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStoreName, useImageUpload } from './hooks/use-page-list'
import hyUpload from '@/base-ui/upload'
import { Picture as IconPicture } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'baseHeader',
  components: {
    hyUpload,
    IconPicture
  },
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef] = usePageSearch()
    const [imgLimit, imgList] = useImageUpload()
    const otherInfo = ref<any>({})
    // 判断用户是否有选择地区，没有的话将下拉数据循环并发送到后台
    watchEffect(() => {
      if (imgList.value.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          picture: imgList.value[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          picture: undefined
        }
      }
    })
    const newData = () => {
      imgList.value = []
    }
    const editData = (item: any) => {
      imgList.value = []
      if (item.picture && item.picture !== '') {
        const imgName = item.picture.split('/')
        const img =
          imgName[imgName.length - 2] + '/' + imgName[imgName.length - 1]
        imgList.value.push({
          name: img,
          url: item.picture
        })
      }
      otherInfo.value = {
        id: item.id
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData, editData)
    return {
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo,
      imgLimit,
      imgList
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
