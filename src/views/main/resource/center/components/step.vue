<!--
 * @Author: your name
 * @Date: 2022-04-12 14:00:23
 * @LastEditTime: 2022-04-21 16:31:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/components/step.vue
-->

<template>
  <el-steps class="hg-mt-3 hg-cursor-pointer" :active="active" align-center>
    <template v-if="editType === 'edit'">
      <el-step
        v-for="item in list"
        :key="item.id"
        :title="item.step"
        :description="item.content"
        :icon="item.icon"
        :status="item.status"
        @click="openDifferentStep(item.id, item.index)"
      ></el-step>
    </template>
    <template v-else>
      <el-step
        v-for="item in list"
        :key="item.id"
        :title="item.step"
        :description="item.content"
        @click="openDifferentStep(item.id, item.index)"
      ></el-step>
    </template>
  </el-steps>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  nextTick,
  watchEffect
} from 'vue'
import { infoTipBox } from '@/utils/tip-info'
import { warnTip } from '@/utils/tip-info'
export default defineComponent({
  props: {
    active: {
      type: Number,
      default: 0
    },
    editType: {
      type: String,
      default: 'edit'
    },
    params: {
      type: Object,
      default: () => ({})
    },
    writeData: {
      type: Array,
      default: () => []
    }
  },
  emits: ['openStep'],
  setup(props, { emit }) {
    const list = ref<any>([
      {
        id: 'property',
        step: '创建(类型属性)',
        content: '填写类型属性',
        color: '#ABDCFF',
        index: 0,
        icon: 'el-icon-error',
        status: 'wait'
      },
      {
        id: 'resource',
        step: '步骤二(资源资料)',
        content: '填写资源资料（多语言）',
        color: '#FEB692',
        index: 1,
        icon: 'el-icon-error',
        status: 'wait'
      },
      {
        id: 'u3d',
        step: '步骤三(U3D文件)',
        content: '上传U3D文件',
        color: '#90F7EC',
        index: 2,
        icon: 'el-icon-error',
        status: 'wait'
      },
      {
        id: 'relevance',
        step: '步骤四(相关关联)',
        content: '填写相关关联',
        color: '#FFD26F',
        index: 3,
        icon: 'el-icon-error',
        status: 'wait'
      },
      {
        id: 'timer',
        step: '步骤五(时间状态)',
        content: '修改时间状态',
        color: '#0bbd87',
        index: 4,
        icon: 'el-icon-error',
        status: 'wait'
      }
    ])
    watchEffect(async () => {
      if (props.editType === 'edit') {
        if (props.writeData.length > 0) {
          props.writeData.map((item: any) => {
            const result = list.value.find((i: any) => i.index === +item - 1)
            result!.icon = 'el-icon-success'
            result!.status = 'finish'
            const selectItem = list.value.find(
              (i: any) => i.index === props.active
            )
            selectItem!.status = 'process'
          })
        } else {
          const selectItem = list.value.find(
            (i: any) => i.index === props.active
          )
          selectItem!.status = 'process'
        }
        await nextTick()
        console.log(list.value, 'list')
      }
    })
    const mapIconState = computed(() => {
      let status = ''
      if (props.editType === 'edit') {
        if (props.active) {
          console.log(2)
        }
      } else {
        console.log(1)
      }
      return status
    })

    const openDifferentStep = (step: any, index: any) => {
      if (+index === props.active) return
      if (props.editType === 'add' && !props.params.moId) {
        warnTip('未完成资源创建，无法跳转步骤')
      } else {
        infoTipBox({
          title: '提示',
          message: '是否保存当前编辑内容',
          cancelButtonText: '丢弃',
          confirmButtonText: '保存'
        })
          .then(() => {
            emit('openStep', {
              step: step,
              save: true
            })
          })
          .catch((action: any) => {
            if (action === 'cancel') {
              emit('openStep', {
                step: step,
                save: false
              })
            }
          })
      }
    }
    return {
      list,
      openDifferentStep
    }
  }
})
</script>

<style scoped></style>
