<template>
  <el-upload
    :limit="limit"
    :http-request="httpRequest"
    :on-success="onSuccess"
    :on-remove="onRemove"
    :before-remove="beforeRemove"
    :on-preview="onPreview"
    :on-exceed="onExceed"
    :before-upload="onChange"
    :on-progress="onProgress"
    :file-list="value"
    list-type="picture-card"
  >
    <el-icon><plus /></el-icon>
  </el-upload>
  <!-- <el-dialog v-model="dialogVisible">
    <img width="400px" :src="dialogImageUrl" alt="" />
  </el-dialog> -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import OSS from 'ali-oss'
import { useOSSConfig, clientSendFile } from '@/hooks/use-oss-config'
import { errorTip, successTip, warnTip } from '@/utils/tip-info'
import { IMG_URL } from '@/service/request/config'
import localCache from '@/utils/cache'
import { formatUtcString } from '@/utils/date-format'
import { Plus } from '@element-plus/icons-vue'
export default defineComponent({
  components: {
    Plus
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
    }
  },
  emits: ['successClick', 'removeClick', 'update:value'],
  setup(props, { emit }) {
    let client: any = null
    onMounted(() => {
      if (localCache.getSessionCache('ossRes')) {
        const res = localCache.getSessionCache('ossRes')
        const expirationDate = formatUtcString(res.expiration)
        const nowDate = formatUtcString(new Date().toString())
        console.log(nowDate, expirationDate)
        if (expirationDate === nowDate) {
          console.log('OSS过期')
          localCache.clearSessionCache()
          useOSSConfig().then((res) => {
            localCache.setSessionCache('ossRes', res)
            client = new OSS({
              region: 'oss-cn-hongkong',
              stsToken: res.securityToken,
              bucket: res.bucketName,
              ...res
            })
          })
        } else {
          client = new OSS({
            region: 'oss-cn-hongkong',
            stsToken: res.securityToken,
            bucket: res.bucketName,
            ...res
          })
        }
      } else {
        useOSSConfig().then((res) => {
          localCache.setSessionCache('ossRes', res)
          client = new OSS({
            region: 'oss-cn-hongkong',
            stsToken: res.securityToken,
            bucket: res.bucketName,
            ...res
          })
        })
      }
    })
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const onSuccess = (res: any, file: any, fileList: any) => {
      console.log(1)
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
    const onChange = () => {
      if (props.value.length === props.limit) {
        warnTip('当前上传文件数量已经达到限制啦，请删除后重新上传')
        return
      }
    }
    // 进度条
    const onProgress = () => {
      console.log(2)
    }
    // beforeRemove
    const httpRequest = (options: any) => {
      return new Promise((resolve, reject) => {
        const file = options.file
        clientSendFile(
          client,
          props.fileTypeName,
          client.options.fileName,
          file
        )
          .then((res: any) => {
            resolve(res)
            console.log(res.res)
            // const url = res.res.requestUrls[0].split('?')[0] // 地址一，后续可能会有改动
            // TODO 图片上传地址
            const url = `${IMG_URL}/${res.name}`
            console.log(url, '图片上传后的地址')
            emit('update:value', [
              ...props.value,
              {
                url: url + '?' + Math.random(),
                name: res.name
              }
            ])
          })
          .catch((err) => {
            reject(err)
            console.log(err, 'err')
          })
      })
    }
    return {
      dialogImageUrl,
      dialogVisible,
      httpRequest,
      onPreview,
      onSuccess,
      onExceed,
      onRemove,
      onChange,
      onProgress
    }
  }
})
</script>

<style>
.el-upload-list__item.is-ready {
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
</style>
