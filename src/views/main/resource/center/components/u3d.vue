<!--
 * @Author: your name
 * @Date: 2022-04-11 17:42:28
 * @LastEditTime: 2022-04-20 14:30:42
 * @LastEditors: Please set LastEditors
 * @Description: /cms/mold/getSource /cms/mold/update/source /cms/mold/getSourceList
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/copmonents/resource copy.vue
-->
<template>
  <div ref="u3dRef">
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="centers"
      :modalConfig="u3dModalConfig"
      :showConfigBtn="false"
      :showCancelBtn="false"
    >
      <el-row :gutter="12">
        <el-col v-bind="u3dModalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">IOS文件信息</span>
            <el-input
              style="width: 100%"
              disabled
              v-model="otherInfo.iosVersion"
              placeholder="IOS文件信息"
            ></el-input>
          </div>
        </el-col>
        <el-col v-bind="u3dModalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">Android文件信息</span>
            <el-input
              style="width: 100%"
              disabled
              v-model="otherInfo.androidVersion"
              placeholder="Android文件信息"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col v-bind="u3dModalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              iOS文件
            </span>
            <hy-upload
              @sendOtherValue="getOtherData($event, 1)"
              v-model:value="otherInfo.iosList"
              fileTypeName="resourceU3dIos/"
              :limit="1"
            ></hy-upload>
            <el-button
              type="primary"
              @click="getSourceData(1)"
              class="hg-mt-2 hg-ml-4"
              >选择文件</el-button
            >
          </div>
        </el-col>
        <el-col v-bind="u3dModalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">
              <span class="item-tip">*</span>
              Android文件
            </span>
            <hy-upload
              @sendOtherValue="getOtherData($event, 0)"
              v-model:value="otherInfo.androidList"
              fileTypeName="resourceU3dAndroid/"
              :limit="1"
            ></hy-upload>
            <el-button
              type="primary"
              @click="getSourceData(0)"
              class="hg-mt-2 hg-ml-4"
              >选择文件</el-button
            >
          </div>
        </el-col>
      </el-row>
      <template #titleWrapper="{ row }">
        <step-component
          :active="2"
          @openStep="openStep($event, row)"
          :params="params"
        ></step-component>
      </template>
      <template #otherModalHandler="{ row }">
        <!-- <el-button plain size="mini" v-if="editType === 'add'" @click="nextStep"
        >上一步</el-button
      >
      <el-button size="mini" type="primary" @click="sendTimer(row)">{{
        editType === 'edit' ? '确定' : '下一步'
      }}</el-button> -->
        <el-button size="mini" @click="cancelData(row)">取消</el-button>
        <el-button size="mini" type="primary" @click="sendTimer(row)"
          >保存</el-button
        >
      </template>
    </page-modal>

    <page-dialog ref="fileRef" title="模型文件版本管理" showWidth="60%">
      <el-table :data="fileData">
        <el-table-column align="center" label="选择文件">
          <template v-slot="scope">
            <el-radio
              v-model="radio"
              :label="scope.$index"
              @change="handleChange(scope.row)"
              >&nbsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="version"
          align="center"
          label="版本(号)"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="name"
          align="center"
          label="文件名称"
        ></el-table-column>
        <el-table-column prop="osType" align="center" label="平台">
          <template v-slot="{ row }">
            {{ row.osType === 1 ? 'IOS' : 'Android' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="size"
          align="center"
          label="大小"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          show-overflow-tooltip
          align="center"
          label="上传时间"
        ></el-table-column>
        <el-table-column
          prop="opt"
          align="center"
          label="上传人"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template v-slot="scope">
            <div class="hg-flex hg-justify-between">
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              ><br />
              <el-button size="mini" type="text" @click="down(scope.row)"
                >下载</el-button
              ><br />
              <el-button
                size="mini"
                type="text"
                v-if="scope.row.forcedUpdate == 1"
                @click="handleForcedUpdate2(scope.row.id)"
                >取消强制更新</el-button
              >
              <el-button
                size="mini"
                type="text"
                v-if="scope.row.forcedUpdate == 0"
                @click="handleForcedUpdate(scope.row.id)"
                >强制更新</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" class="hg-mt-4" @click="closeDialog"
        >确定</el-button
      >
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { u3dModalConfig } from './config/u3d.modal'
import { usePageModal } from '@/hooks/use-page-modal'
import stepComponent from './step.vue'
import { infoTipBox, errorTip } from '@/utils/tip-info'
import hyUpload from '@/base-ui/upload/src/uploadFile.vue'
import { getU3dSourceList } from '@/service/main/resource/center'
import {
  resourceU3dOperation,
  u3dFileOperation
} from '@/service/main/resource/center'
import { successTip } from '@/utils/tip-info'

export default defineComponent({
  props: {
    editType: {
      type: String,
      default: 'edit'
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    stepComponent,
    hyUpload
  },
  emits: ['getData', 'changePage', 'openStep'],
  setup(props, { emit }) {
    const nextStep = () => {
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = false
      }
    }
    const u3dRef = ref<any>()
    const fileRef = ref<any>()
    const otherInfo = ref<any>({
      iosSourceUrl: '',
      iosList: [],
      androidSourceUrl: '',
      androidList: [],
      androidVersion: '',
      iosVersion: '',
      iosChose: [],
      androidChose: [],
      type: 'ios'
    })
    const resetData = () => {
      otherInfo.value = {
        iosSourceUrl: '',
        iosList: [],
        androidSourceUrl: '',
        androidList: [],
        androidVersion: '',
        iosVersion: '',
        iosChose: {},
        androidChose: {},
        type: 'ios'
      }
      fileInfo.value = {}
    }
    const fileInfo = ref<any>()
    const fileData = ref<any>()
    const radio = ref<any>()
    const getOtherData = (data: any, type: number) => {
      if (type === 1) {
        fileInfo.value = {
          ...fileInfo.value,
          iosSourceMd5: data.md5,
          iosName: data.name,
          iosSize: data.size + 'M',
          sizeIos: data.size
        }
        mapFileInfo(
          {
            ...data,
            size: data.size + 'M'
          },
          type
        )
      } else {
        fileInfo.value = {
          ...fileInfo.value,
          androidSourceMd5: data.md5,
          androidName: data.name,
          androidSize: data.size + 'M',
          sizeAd: data.size
        }
        mapFileInfo(
          {
            ...data,
            size: data.size + 'M'
          },
          type
        )
      }
    }
    const mapFileInfo = (item: any, type: any) => {
      if (type === 1) {
        otherInfo.value.iosVersion = `版本号：${
          item.version ?? '系统生成'
        } 名字: ${item.name} 文件大小: ${item.size} 更新时间：${
          item.createTime ?? '系统生成'
        }`
      } else {
        otherInfo.value.androidVersion = `版本号：${item.version ?? ''} 名字: ${
          item.name
        } 文件大小: ${item.size} 更新时间：${item.createTime ?? ''}`
      }
    }
    const getSourceData = (type: any) => {
      otherInfo.value.type = type === 1 ? 'ios' : 'android'
      getU3dSourceList({
        osType: type,
        moId: props.params.moId,
        pageSize: 20,
        currentPage: 1
      }).then((res) => {
        if (res.result === 0) {
          fileRef.value.dialogVisible = true
          fileData.value = res.data.rows
        } else errorTip(res.msg)
      })
    }
    // 表格操作
    const handleChange = (item: any) => {
      if (otherInfo.value.type === 'ios') {
        otherInfo.value.iosChose = item
      } else otherInfo.value.androidChose = item
    }
    const closeDialog = () => {
      let { type, iosChose, androidChose } = otherInfo.value
      if (type === 'ios') {
        mapFileInfo(iosChose, 1)
        fileRef.value.dialogVisible = false
      } else if (type === 'android') {
        mapFileInfo(androidChose, 0)
        fileRef.value.dialogVisible = false
      } else errorTip('请选择文件')
    }
    const handleDelete = (id: any) => {
      const type = otherInfo.value.type === 'ios' ? 0 : 1
      infoTipBox({
        title: '删除文件',
        message: '确定删除文件吗'
      }).then(() => {
        u3dFileOperation('/cms/mold/delete', {
          id: id
        }).then((res) => {
          if (res.result === 0) {
            successTip(res.msg)
            getSourceData(type)
          } else errorTip(res.msg)
        })
      })
    }
    const down = (item: any) => {
      window.open(item.sourceUrl)
    }
    const handleForcedUpdate2 = (id: any) => {
      const type = otherInfo.value.type === 'ios' ? 0 : 1
      infoTipBox({
        title: '取消强制更新',
        message: '是否取消强制更新?'
      }).then(() => {
        u3dFileOperation('/cms/mold/forcedUpdate/cancel', {
          id: id,
          forcedUpdate: 0,
          osType: type
        }).then((res) => {
          if (res.result === 0) {
            successTip(res.msg)
            getSourceData(type)
          } else errorTip(res.msg)
        })
      })
    }
    const handleForcedUpdate = (id: any) => {
      const type = otherInfo.value.type === 'ios' ? 0 : 1
      infoTipBox({
        title: '强制更新',
        message: '是否强制更新?'
      }).then(() => {
        u3dFileOperation('/cms/mold/forcedUpdate', {
          id: id,
          forcedUpdate: 1,
          osType: type
        }).then((res) => {
          if (res.result === 0) {
            successTip(res.msg)
            getSourceData(type)
          } else errorTip(res.msg)
        })
      })
    }
    watchEffect(() => {
      if (otherInfo.value && otherInfo.value.iosList.length > 0) {
        otherInfo.value.iosSourceUrl = otherInfo.value.iosList[0].url
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          iosSourceUrl: undefined
        }
      }
      if (otherInfo.value && otherInfo.value.androidList.length > 0) {
        otherInfo.value.androidSourceUrl = otherInfo.value.androidList[0].url
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          androidSourceUrl: undefined
        }
      }
    })
    const cancelData = (item: any) => {
      infoTipBox({
        title: '提示',
        message: '是否保存当前编辑内容？',
        cancelButtonText: '丢弃',
        confirmButtonText: '保存'
      })
        .then(() => {
          sendTimer(item, 'cancel')
        })
        .catch((action: any) => {
          if (action === 'cancel') {
            if (pageModalRef.value) {
              resetData()
              pageModalRef.value.dialogVisible = false
              emit('getData')
            }
          }
        })
    }
    const addData = (item: any) => {
      let data = {
        moId: props.params.moId,
        iosSourceUrl: otherInfo.value.iosSourceUrl,
        androidSourceUrl: otherInfo.value.androidSourceUrl,
        ...otherInfo.value.iosChose,
        ...otherInfo.value.androidChose,
        ...fileInfo.value
      }
      resourceU3dOperation(data, 'add').then((res) => {
        if (res.result === 0) {
          if (pageModalRef.value) pageModalRef.value.dialogVisible = false
          resetData()
          emit('changePage', 'relevance', { moId: props.params.moId })
        } else errorTip(res.msg)
      })
    }
    const editData = (item: any) => {
      let data = {
        moId: props.params.moId,
        iosSourceUrl: otherInfo.value.iosSourceUrl,
        androidSourceUrl: otherInfo.value.androidSourceUrl,
        ...otherInfo.value.iosChose,
        ...otherInfo.value.androidChose,
        ...fileInfo.value
      }
      resourceU3dOperation(data, 'update').then((res) => {
        if (res.result === 0) {
          if (pageModalRef.value) {
            successTip(res.msg)
            // pageModalRef.value.dialogVisible = false
            // resetData()
            emit('getData')
          }
        } else errorTip(res.msg)
      })
    }
    const sendTimer = (item: any, type = 'config') => {
      if (props.editType === 'add') {
        if (pageModalRef.value) {
          if (type === 'cancel') {
            pageModalRef.value.dialogVisible = false
          } else {
            addData(item)
          }
        }
      } else {
        editData(item)
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    const openStep = async (item: any, res: any) => {
      if (item.step !== 2) {
        if (item.save) {
          let data = {
            moId: props.params.moId,
            iosSourceUrl: otherInfo.value.iosSourceUrl,
            androidSourceUrl: otherInfo.value.androidSourceUrl,
            ...otherInfo.value.iosChose,
            ...otherInfo.value.androidChose,
            ...fileInfo.value
          }
          if (props.editType === 'add') {
            resourceU3dOperation(data, 'add').then((res) => {
              if (res.result === 0) {
                successTip(res.msg)
                if (pageModalRef.value) pageModalRef.value.dialogVisible = false
                resetData()
                emit('openStep', item.step, props.params)
              } else errorTip(res.msg)
            })
          } else {
            resourceU3dOperation(data, 'update').then((res) => {
              if (res.result === 0) {
                successTip(res.msg)
                if (pageModalRef.value) {
                  successTip(res.msg)
                  pageModalRef.value.dialogVisible = false
                  resetData()
                  emit('openStep', item.step, props.params)
                }
              } else errorTip(res.msg)
            })
          }
        } else {
          emit('openStep', item.step, props.params)
        }
      }
    }
    return {
      fileInfo,
      getOtherData,
      cancelData,
      openStep,
      u3dModalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      sendTimer,
      nextStep,
      otherInfo,
      u3dRef,
      fileRef,
      getSourceData,
      fileData,
      handleChange,
      down,
      handleDelete,
      handleForcedUpdate2,
      handleForcedUpdate,
      closeDialog,
      radio
    }
  }
})
</script>

<style scoped></style>
