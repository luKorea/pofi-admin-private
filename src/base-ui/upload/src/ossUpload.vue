<template>
  <draggable
    :value="value"
    forceFallback="true"
    animation="400"
    class="clearfix"
  >
    <el-upload
      :limit="limit"
      :http-request="httpRequest"
      :on-success="onSuccess"
      :before-remove="beforeRemove"
      :on-preview="onPreview"
      :on-exceed="onExceed"
      :before-upload="beforeUpload"
      :file-list="value"
      list-type="picture-card"
      v-bind="otherOptions"
    >
      <template #default>
        <template v-if="!progressFlag">
          <el-icon><plus /></el-icon>
        </template>
        <template v-else>
          <el-progress type="circle" :percentage="percent"></el-progress>
        </template>
      </template>
      <template #file="{ file }">
        <div style="width: 100%; height: 100%">
          <template v-if="fileType === 'image'">
            <img
              style="object-fit: cover"
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
          </template>
          <template v-else-if="fileType === 'video'">
            <video :src="file.url"></video>
          </template>
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="onPreview(file)">
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="onRemove(file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <!-- 预览界面 -->
    <!-- <el-dialog
    v-model="dialogVisible"
    width="30%"
    :title="fileType === 'image' ? '图片预览' : '视频预览'"
  >
    <div
      class="hg-flex hg-items-center hg-justify-center"
      style="height: 200px"
    >
      <template v-if="fileType === 'image'">
        <div style="width: 300px; height: 300px">
          <img
            style="width: 400px; object-fit: cover"
            :src="dialogImageUrl"
            alt=""
          />
        </div>
      </template>
      <template v-else>
        <video
          style="width: 100%; height: 100%"
          :src="dialogImageUrl"
          controls
        ></video>
      </template>
    </div>
  </el-dialog> -->
  </draggable>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { errorTip, warnTip } from '@/utils/tip-info'
import { OSSURL } from '@/service/request/config'
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue'
import { fileTypeIsImage } from '@/utils/index'
import draggable from 'vuedraggable'
import { useOSSConfig } from '../../../hooks/use-oss-config'
import OSS from 'ali-oss'
export default defineComponent({
  components: {
    Plus,
    Delete,
    ZoomIn
    // draggable
  },
  props: {
    limit: {
      type: Number,
      default: 5
    },
    fileTypeName: {
      type: String,
      default: 'help/'
    },
    value: {
      type: Array,
      default: () => []
    },
    otherOptions: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['successClick', 'removeClick', 'update:value'],
  setup(props, { emit }) {
    let client = ref<any>()
    const fileType = ref<any>('image')
    // 进度条展示
    const progressFlag = ref<boolean>(false)
    const percent = ref<number>(0)
    const isFirstMount = ref(true) // 控制防止重复回显
    watchEffect(() => {
      if (!isFirstMount.value) {
        return
      }
      if (props.value && props.value.length > 0) {
        props.value.forEach((item: any) => {
          let name = item.name
          if (item.name.indexOf('?')) {
            name = item.name.split('?')[0]
          }
          const type = fileTypeIsImage(name)
          fileType.value = type
        })
      }
    })
    const dialogImageUrl = ref<string>('')
    const dialogVisible = ref<boolean>(false)
    const videoRef = ref<any>()
    const disabled = ref(false)
    const onSuccess = (res: any, file: any, fileList: any) => {
      console.log(res, file, fileList)
    }
    const onRemove = (file: any) => {
      const newValue = props.value.filter(
        (item: any) => item.name !== file.name
      )
      // console.log(newData)
      emit('update:value', newValue)
    }
    // 限制上传个数
    const onExceed = () => {
      errorTip(`最多只能上传${props.limit}个`)
    }
    const onPreview = (file: any) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
    }
    // 每次上传都要重新获取fileName
    const beforeUpload = () => {
      isFirstMount.value = false
      return new Promise((resolve, reject) => {
        if (props.value.length === props.limit) {
          warnTip('当前上传文件数量已经达到限制啦，请删除后重新上传')
          return
        }
        useOSSConfig()
          .then((res) => {
            client.value = new OSS({
              region: 'oss-cn-hongkong',
              stsToken: res.securityToken,
              bucket: res.bucketName,
              ...res
            })
            resolve(client.value)
          })
          .catch((err) => reject(err))
      })
    }
    // 进度条
    const onProgress = (progress: any) => {
      console.log(progress)
    }
    // beforeRemove
    const httpRequest = (options: any) => {
      async function uploadImage() {
        if (client.value !== null) {
          isFirstMount.value = false
          const file = options.file
          const suffix = '.' + file.type.split('/')[1]
          const name =
            props.fileTypeName + client.value.options.fileName + suffix
          client.value
            .multipartUpload(name, file, {
              progress: function (p: any) {
                progressFlag.value = true
                percent.value = p.toFixed(0) * 100
                if (p === 1) {
                  progressFlag.value = false
                }
              }
            })
            .then((res: any) => {
              const url = `${OSSURL}/${res.name}`
              emit('update:value', [
                ...props.value,
                {
                  name: res.name + '?' + new Date().getTime(),
                  url: url + '?' + new Date().getTime()
                }
              ])
              // resolve(res)
            })
        }
      }
      uploadImage()
      // .catch((err: any) => reject(err))
      // return new Promise((resolve, reject) => {
      //   console.log(client.value)
      //   if (client.value !== null) {
      //   }
      // })
    }
    return {
      // 进度条
      progressFlag,
      percent,
      dialogImageUrl,
      dialogVisible,
      fileType,
      videoRef,
      disabled,
      httpRequest,
      onPreview,
      onSuccess,
      onExceed,
      onRemove,
      beforeUpload,
      onProgress
    }
  }
})
</script>

<style lang="less">
.el-upload-list__item.is-ready {
  display: none;
}
/deep/.el-upload-list__item.is-ready {
  display: none;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload--picture-card {
  text-align: center;
}
.el-upload--picture-card .el-progress {
  margin-top: 10px;
}
</style>
