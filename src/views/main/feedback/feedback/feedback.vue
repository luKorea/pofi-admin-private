<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 16:44:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/tradeRecord.vue
-->
<template>
  <div class="feedbacks" v-if="0">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="feedbacks"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @selectAllBtnClick="handleSelectData"
    >
      <template #isNickName="{ row }">
        <span v-if="row.user">{{ row.user.nickName }}</span>
        <span v-else>未知用户</span>
      </template>
      <template #isNickID="{ row }">
        <el-button
          type="text"
          size="mini"
          v-if="row.user"
          @click="handleOpenModal(row, 'visit')"
          >{{ row.user?.nickId }}</el-button
        >
      </template>
      <template #isRegion="{ row }"
        >{{ row.region }}({{ row.language }})</template
      >
      <template #isStatus="scope">
        <el-tag
          type="danger"
          size="mini"
          v-if="scope.row.status == 0 && scope.row.valid != 1"
          >新问题</el-tag
        >
        <el-tag
          type="success"
          size="mini"
          v-else-if="scope.row.status == 1 && scope.row.valid != 1"
          >已回复</el-tag
        >
        <el-tag type="info" size="mini" v-else-if="scope.row.valid == 1"
          >用户已关闭</el-tag
        >
        <el-tag
          type="danger"
          size="mini"
          v-else-if="scope.row.status == 2 && scope.row.valid != 1"
          >用户新回复</el-tag
        >
        <el-tag type="danger" size="mini" v-else>未知状态</el-tag>
      </template>
      <template #isTag="scope">
        <el-tag type="warning" size="mini" v-if="scope.row.optTag == 1"
          ><i class="el-icon-star"></i>星标问题</el-tag
        >
        <el-tag type="danger" size="mini" v-else-if="scope.row.optTag == 2"
          ><i class="el-icon-warning"></i>紧急问题</el-tag
        >
        <el-tag
          type="info"
          size="mini"
          effect="dark"
          v-else-if="scope.row.optTag == 3"
          >无法处理</el-tag
        >
        <el-tag type="info" size="mini" v-else-if="scope.row.optTag == 4"
          ><i class="el-icon-s-claim"></i>关闭</el-tag
        >
        <el-tag type="info" size="mini" v-else
          ><i class="el-icon-minus"></i
        ></el-tag>
      </template>
      <template #otherTableHandler="{ row }">
        <el-button
          type="text"
          size="mini"
          @click="handleOpenModal(row, 'history')"
          >聊天记录</el-button
        >
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="feedbacks"
      :modalConfig="modalConfig"
      :operationName="operationName"
      showCancelText="关闭"
      :showConfigBtn="false"
    >
      <use-info v-if="modalType === 'visit'" :user-info="userInfo"></use-info>
      <use-history
        v-if="modalType === 'history'"
        :user-history="userHistory"
        :user-name="otherInfo.userName"
        :tag-list="selectList.tagList"
        @changeTag="handleChangeTag"
      ></use-history>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName, useGetSelect } from './hooks/use-page-list'
import { mapTimeToSearch, mapSelectListTitle } from '@/utils'

import useInfo from './component/user-info.vue'
import useHistory from './component/user-history.vue'
import {
  getFeedbackUserInfo,
  getFeedbackHistoryInfo
} from '@/service/main/feedback/feedback'
import { errorTip, successTip } from '@/utils/tip-info'
import { setFeedbackQuestionTag } from '../../../../service/main/feedback/feedback'

export default defineComponent({
  name: 'feedbacks',
  components: {
    useInfo,
    useHistory
  },
  setup() {
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
    const [selectList] = useGetSelect()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    const searchFormConfigRef = computed(() => {
      const userItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'optId'
      )
      const statusItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'status'
      )
      const tagItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'optTag'
      )
      const typeItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'type'
      )
      const regionItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'region'
      )
      const languageItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'language'
      )
      userItem!.options = selectList.value.userList
      statusItem!.options = selectList.value.statusList
      tagItem!.options = selectList.value.tagList
      typeItem!.options = selectList.value.typeList
      regionItem!.options = selectList.value.countryList
      languageItem!.options = selectList.value.languageList
      return searchFormConfig
    })
    // const mapStatus = (type: any) => {
    //   return mapSelectListTitle(type, selectList.value.statusList)
    // }
    // const mapTag = (type: any) => {
    //   return mapSelectListTitle(type, selectList.value.tagList)
    // }
    const modalType = ref<any>('visit')
    const userInfo = ref<any>()
    const userHistory = ref<any>()
    const otherInfo = ref<any>()
    const handleOpenModal = (row: any, type: any) => {
      modalType.value = type
      if (type === 'visit') {
        // 这里暂时使用行数据
        userInfo.value = row.user
        handleEditData(row)
        // getFeedbackUserInfo({ keyword: row.user?.nickId }).then((res) => {
        //   if (res.result === 0) {
        //     userInfo.value = res.data
        //     handleEditData(row)
        //   } else errorTip(res.msg)
        // })
      } else {
        otherInfo.value = {
          userName: row.user.nickName,
          fid: row.id
        }
        getFeedbackHistoryInfo({ fbId: row.id }).then((res) => {
          if (res.result === 0) {
            userHistory.value = res.data
            handleEditData(row)
          } else errorTip(res.msg)
        })
      }
    }
    const handleChangeTag = (tag: any) => {
      setFeedbackQuestionTag({
        fid: otherInfo.value.fid,
        tag: tag
      }).then((res: any) => {
        if (res.result === 0) {
          successTip(res.msg)
          // handleQueryClick()
        } else errorTip(res.msg)
      })
    }
    return {
      // mapStatus,
      // mapTag,
      selectList,
      searchFormConfigRef,
      handleResetClick,
      handleQueryBtnClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfig,
      handleNewData,
      handleEditData,
      handleChangeTag,
      handleOpenModal,
      modalType,
      pageModalRef,
      defaultInfo,
      operationName,
      userInfo,
      otherInfo,
      userHistory
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
