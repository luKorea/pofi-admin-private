<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-15 17:05:13
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/pay.vue
-->
<template>
  <div class="userOperation" v-if="1">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="userOperations"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEdit"
      @operationBtnClick="handleOperationClick"
    >
      <template #isStatus="scope">
        <span>{{
          scope.row.status == 1
            ? '注销'
            : scope.row.status == 2
            ? '正常'
            : '未知'
        }}</span>
      </template>
      <template #isAvatar="scope">
        <page-image :img-src="scope.row.head"></page-image>
      </template>
      <template #isReal="scope">
        <span>{{ scope.row.name != null ? '是' : '否' }}</span>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="userOperations"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-divider>其他信息</el-divider>
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">Google</span>
            <el-input
              disabled
              v-model="otherInfo.googleId"
              placeholder="暂无绑定信息"
            >
              <template
                #append
                v-if="
                  otherInfo.googleId !== undefined && otherInfo.googleId !== ''
                "
              >
                <el-button @click="resetGoogle">重置Google</el-button>
              </template>
            </el-input>
          </div>
        </el-col>
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">FaceBook</span>
            <el-input
              disabled
              v-model="otherInfo.facebookId"
              placeholder="暂无绑定信息"
            >
              <template
                #append
                v-if="
                  otherInfo.facebookId !== undefined &&
                  otherInfo.facebookId !== ''
                "
              >
                <el-button @click="resetFaceBook">重置FaceBook</el-button>
              </template>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">Apple</span>
            <el-input
              disabled
              v-model="otherInfo.appleId"
              placeholder="暂无绑定信息"
            >
              <template
                #append
                v-if="
                  otherInfo.appleId !== undefined && otherInfo.appleId !== ''
                "
              >
                <el-button @click="resetApple">重置Apple</el-button>
              </template>
            </el-input>
          </div>
        </el-col>
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">用户密码</span>
            <el-input
              v-model="otherInfo.pwd"
              clearable
              placeholder="点击右边按钮随机生成密码"
            >
              <template #append>
                <el-button @click="resetPassword">随机密码生成</el-button>
              </template>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">用户头像</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="base/"
              v-model:value="imgList"
            ></hy-upload>
          </div>
        </el-col>
        <!-- <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">备注</span>
            <el-input type="textarea" :rows="6" v-model="otherInfo.remark">
            </el-input>
          </div>
        </el-col> -->
      </el-row>
    </page-modal>

    <page-dialog ref="pageDialogRef" :title="`操作日志 (Pofi ID: ${POFIID})`">
      <div class="hg-flex hg-items-center" style="margin-bottom: 10px">
        <template v-if="selectList && selectList.length > 0">
          <span class="item-title" style="margin-right: 10px">操作人</span>
          <el-select v-model="optType" placeholder="">
            <el-option
              v-for="(item, index) in selectList"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </template>
      </div>
      <hy-table
        :listData="dataList"
        :listCount="dataCount"
        v-bind="operationTableConfig"
        v-model:page="pageInfo"
        ref="tableRef"
        :showHeader="false"
      ></hy-table>
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
// import { Money } from '@element-plus/icons-vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { operationTableConfig } from './config/operation.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import {
  useOperationData,
  useStoreName,
  useMapSelectValue,
  useImageUpload
} from './hooks/use-page-list'
import { getItemData } from '@/service/common-api'

import HyTable from '@/base-ui/table'
import HyUpload from '@/base-ui/upload'
import { mapTimeToSearch } from '@/utils'
import { mapImageToObject, getPassword } from '../../../utils/index'
import { errorTip } from '@/utils/tip-info'
export default defineComponent({
  name: 'userOperation',
  components: {
    // Money
    HyTable,
    HyUpload
  },
  setup() {
    const [imgLimit, imgList] = useImageUpload()
    const otherInfo = ref<any>({
      remark: ''
    })
    const remarkRules = ref([
      {
        require: true,
        message: '请输入内容',
        trigger: 'blur'
      }
    ])
    const resetInfo = ref<any>({})
    watch(imgList, () => {
      if (imgList.value.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          head: imgList.value[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          head: undefined
        }
      }
    })
    // 动态设置高级检索，编辑下拉框值
    const [regList, markList, countryList, jobList, drawList] =
      useMapSelectValue()
    const searchFormConfigRef = computed(() => {
      const srcTypeItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'srcType'
      )
      const areaIdItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'areaId'
      )
      const markIdItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'markId'
      )
      srcTypeItem!.options = regList.value.map((i: any) => ({
        title: i.dec,
        value: i.type
      }))
      markIdItem!.options = markList.value.map((i: any) => ({
        title: i.dec,
        value: i.type
      }))
      areaIdItem!.options = countryList.value.map((i: any) => ({
        title: i.name,
        value: i.id
      }))
      return searchFormConfig
    })
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const handleQueryBtnClick = (data: any) => {
      const beginDate = mapTimeToSearch(data.dateTime).start
      const endDate = mapTimeToSearch(data.dateTime).end
      handleQueryClick({
        ...data,
        beginDate,
        endDate
      })
    }
    const handleEdit = (item: any) => {
      editType.value = 'edit'
      const dec = modalConfigRef.value.formItems.find(
        (item: any) => item.field === 'srcDec'
      )
      dec!.otherOptions!.disabled = true
      getItemData('userItem', {
        nickId: item.nickId
      }).then((res: any) => {
        if (res.result === 0) {
          otherInfo.value = {
            ...res.data,
            regTime: undefined,
            onlineTime: undefined,
            pwd: res.data.pwd,
            googleId: res.data.googleId ?? undefined,
            facebookId: res.data.facebookId ?? undefined,
            appleId: res.data.appleId ?? undefined
          }
          resetInfo.value = {
            pwd: res.data.pwd,
            googleId: res.data.googleId ?? undefined,
            facebookId: res.data.facebookId ?? undefined,
            appleId: res.data.appleId ?? undefined
          }
          imgList.value = []
          res.data.head && imgList.value.push(mapImageToObject(res.data.head))
          handleEditData({
            ...res.data
          })
        } else errorTip(res.msg)
      })
    }
    // 重置操作
    const handleResetInfo = (name: string) => {
      resetInfo.value = {
        ...resetInfo.value,
        [name]: ''
      }
      otherInfo.value = {
        ...otherInfo.value,
        [name]: ''
      }
    }
    const resetPassword = () => {
      otherInfo.value = {
        ...otherInfo.value,
        pwd: getPassword(8)
      }
    }
    const resetGoogle = () => handleResetInfo('googleId')
    const resetFaceBook = () => handleResetInfo('facebookId')
    const resetApple = () => handleResetInfo('appleId')
    const editType = ref('add')
    const newData = () => {
      editType.value = 'add'
      imgList.value = []
      otherInfo.value = {}
      resetApple()
      resetGoogle()
      resetFaceBook()
      handleResetInfo('pwd')
      const dec = modalConfigRef.value.formItems.find(
        (item: any) => item.field === 'srcDec'
      )
      dec!.otherOptions!.disabled = false
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)

    const modalConfigRef = computed(() => {
      const jobItem = modalConfig.formItems.find(
        (item: any) => item.field === 'jobId'
      )
      const interestItem = modalConfig.formItems.find(
        (item: any) => item.field === 'interest'
      )
      const markItem = modalConfig.formItems.find(
        (item: any) => item.field === 'mark'
      )
      jobItem!.options = jobList.value.map((i: any) => ({
        title: i.name,
        value: i.id
      }))
      interestItem!.options = drawList.value.map((i: any) => ({
        title: i.name,
        value: i.name
      }))
      markItem!.options = markList.value.map((i: any) => ({
        title: i.dec,
        value: i.type
      }))
      return modalConfig
    })
    // 模态框区域
    const [
      pageDialogRef,
      pageOperationRef,
      handleOperationClick,
      selectList,
      optType,
      POFIID,
      pageInfo,
      dataList,
      dataCount
    ] = useOperationData()
    return {
      imgLimit,
      imgList,
      remarkRules,
      resetInfo,
      editType,
      resetPassword,
      resetGoogle,
      resetFaceBook,
      resetApple,
      searchFormConfig,
      searchFormConfigRef,
      handleResetClick,
      handleQueryBtnClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEdit,
      handleEditData,
      pageModalRef,
      defaultInfo,
      otherInfo,
      operationName,
      handleOperationClick,
      pageDialogRef,
      pageOperationRef,
      operationTableConfig,
      selectList,
      optType,
      POFIID,
      pageInfo,
      dataList,
      dataCount
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
