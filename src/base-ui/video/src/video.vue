<!--
 * @Author: korealu
 * @Date: 2022-02-17 15:46:44
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-17 17:30:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/base-ui/video/src/video.vue
-->
<template>
  <page-dialog ref="pageDialogRef" :title="title" @closeDialog="closeDialog">
    <div ref="videoRef" class="player" id="player" />
    <!-- <video :src="videoUrl" controls style="width: 100%; height: 400px"></video> -->
  </page-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import PageDialog from '@/components/page-dialog'
import Player from 'xgplayer'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    isShowVideo: {
      type: Boolean,
      default: false
    },
    videoUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
    const videoRef = ref()
    watch(
      () => [props.isShowVideo],
      () => {
        pageDialogRef.value!.dialogVisible = props.isShowVideo
        setTimeout(() => {
          new Player({
            id: 'player',
            url: props.videoUrl,
            fluid: true
          })
        })
      }
    )
    console.log(videoRef.value)
    const closeDialog = () => {
      emit('close')
    }
    return {
      pageDialogRef,
      videoRef,
      closeDialog
    }
  }
})
</script>

<style lang="less" scoped></style>
