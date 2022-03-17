<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 10:54:02
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/help/companion/companion.vue
-->
<template>
  <div>
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="records"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #state="scope">
        <span>{{ scope.row.state ? '启用' : '禁用' }}</span>
      </template>
      <template #image="scope">
        <page-image :img-src="scope.row.bgUrl"></page-image>
      </template>
      <template #video="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="点击预览视频"
          placement="top-start"
        >
          <el-button
            size="mini"
            plain
            @click="handleShowVideoClick(scope.row.fileUrl, scope.row.title)"
            >预览</el-button
          >
        </el-tooltip>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="records"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">图片上传</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="help/"
              v-model:value="imgList"
            ></hy-upload>
          </div>
        </el-col>
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">视频上传</span>
            <hy-upload
              :limit="videoLimit"
              fileTypeName="help/"
              v-model:value="videoList"
            ></hy-upload>
          </div>
        </el-col>
      </el-row>
    </page-modal>
    <hy-video
      :videoUrl="videoUrl"
      :isShowVideo="isShowVideo"
      :title="videoTitle"
      @close="isShowVideo = false"
    ></hy-video>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import {
  usePageList,
  useStoreName,
  useImageUpload,
  useVideoUpload
} from './hooks/use-page-list'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { searchFormConfig } from './page-config/search.config'
import { contentTableConfig } from './page-config/content.config'
import { modalConfig } from './page-config/modal.config'

import HyVideo from '@/base-ui/video'
import HyUpload from '@/base-ui/upload'

export default defineComponent({
  name: 'companion',
  components: {
    HyVideo,
    HyUpload
  },
  setup() {
    const isShowVideo = ref<boolean>(false)
    const videoUrl = ref<string>('')
    const videoTitle = ref<string>('')

    // 点击按钮播放视频
    const handleShowVideoClick = (src: string, title: string) => {
      isShowVideo.value = !isShowVideo.value
      videoUrl.value = src
      videoTitle.value = title
    }

    const [storeTypeInfo, operationName] = useStoreName()
    const [imgLimit, imgList] = useImageUpload()
    const [videoLimit, videoList] = useVideoUpload()
    const [countryList, groupList] = usePageList()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    // 表单
    const modalConfigRef = computed(() => {
      const countryItem = modalConfig.formItems.find(
        (item: any) => item.field === 'areaIds'
      )
      countryItem!.options = countryList.value.map((item: any) => ({
        title: item.name,
        value: item.id
      }))
      return modalConfig
    })
    return {
      imgLimit,
      imgList,
      videoLimit,
      videoList,
      isShowVideo,
      videoUrl,
      videoTitle,
      handleShowVideoClick,
      storeTypeInfo,
      countryList,
      groupList,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      contentTableConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modalConfigRef,
      operationName
    }
  }
})
</script>
