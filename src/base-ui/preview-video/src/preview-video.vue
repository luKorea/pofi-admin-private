<!--
 * @Author: your name
 * @Date: 2022-03-24 10:04:12
 * @LastEditTime: 2022-03-24 10:08:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin/src/base-ui/previewVideo/src/preview-video.vue
-->
<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    content="点击预览视频"
    placement="top-start"
  >
    <el-button size="mini" plain @click="handleShowVideoClick(fileUrl, title)"
      >预览</el-button
    >
  </el-tooltip>
  <hy-video
    :videoUrl="videoUrl"
    :isShowVideo="isShowVideo"
    :title="videoTitle"
    @close="isShowVideo = false"
  ></hy-video>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVideoShow } from '../hook/use-video-show'
import HyVideo from '@/base-ui/video'

export default defineComponent({
  name: 'previewVideo',
  components: {
    HyVideo
  },
  props: {
    fileUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    const [isShowVideo, videoUrl, videoTitle, handleShowVideoClick] =
      useVideoShow()
    return {
      isShowVideo,
      videoUrl,
      videoTitle,
      handleShowVideoClick
    }
  }
})
</script>

<style scoped></style>
