<!--
 * @Author: your name
 * @Date: 2022-04-12 14:00:23
 * @LastEditTime: 2022-04-12 18:12:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/components/step.vue
-->

<template>
  <el-steps class="hg-mt-3" :active="active" align-center>
    <el-step
      v-for="item in list"
      :key="item.id"
      :title="item.step"
      :description="item.content"
      @click="openDifferentStep(item.id)"
    ></el-step>
  </el-steps>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { infoTipBox } from '@/utils/tip-info'
export default defineComponent({
  props: {
    active: {
      type: Number,
      default: 0
    },
    editType: {
      type: String,
      default: 'edit'
    }
  },
  emits: ['openStep'],
  setup(props, { emit }) {
    const list = ref<any>([
      {
        id: 'property',
        step: '步骤一',
        content: '填写类型属性',
        color: '#ABDCFF'
      },
      {
        id: 'resource',
        step: '步骤二',
        content: '填写资源资料（多语言）',
        color: '#FEB692'
      },
      { id: 'u3d', step: '步骤三', content: '上传U3D文件', color: '#90F7EC' },
      {
        id: 'relevance',
        step: '步骤四',
        content: '填写相关关联',
        color: '#FFD26F'
      },
      { id: 'timer', step: '步骤五', content: '修改时间状态', color: '#0bbd87' }
    ])
    const stepBack = ref<any>()
    const openDifferentStep = (step: any) => {
      // if (stepBack.value === step) return
      // stepBack.value = step
      infoTipBox({
        title: '切换页面',
        message: '确定切换页面吗'
      }).then(() => {
        emit('openStep', step)
      })
    }
    return {
      list,
      stepBack,
      openDifferentStep
    }
  }
})
</script>

<style scoped></style>
