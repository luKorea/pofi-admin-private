/*
 * @Author: korealu
 * @Date: 2022-03-10 14:13:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-22 11:57:20
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/select-list/map-resource-list.ts
 */

// 用户消息状态
export const userMessageTypeList = [
  { value: 0, title: '新问题' },
  { value: 1, title: '已回复' },
  { value: 2, title: '用户新回复' },
  { value: 3, title: '用户已关闭' }
]

// 文案类型

// USD模型
export const unityModalList = [
  {
    title: '未知',
    value: undefined
  },
  {
    title: '单人偶',
    value: 1
  },
  {
    title: '单道具',
    value: 2
  },
  {
    title: '道具包',
    value: 3
  },
  {
    title: '发型包',
    value: 4
  },
  {
    title: '场景',
    value: 5
  },
  {
    title: '天空环境',
    value: 6
  },
  {
    title: 'Pose库',
    value: 7
  },
  {
    title: '动画库',
    value: 8
  }
]
// 资源类型
export const resourceTypeList = [
  {
    value: 1,
    title: '可动人偶'
  },
  {
    value: 2,
    title: '静态手办'
  },
  {
    value: 3,
    title: '多人人偶'
  },
  {
    value: 4,
    title: '可动动物'
  },
  {
    value: 5,
    title: '动物标本'
  },
  {
    value: 6,
    title: '单个道具'
  },
  {
    value: 7,
    title: '道具包'
  },
  {
    value: 8,
    title: '场景'
  },
  {
    value: 9,
    title: '建筑'
  },
  {
    value: 10,
    title: '发型'
  },
  {
    value: 11,
    title: 'Pose库'
  },
  {
    value: 12,
    title: '动画'
  }
]
// 使用条件
export const resourceConditionList = [
  {
    value: 1,
    title: '免费'
  },
  {
    value: 2,
    title: '付费购买'
  },
  {
    value: 3,
    title: '积分购买'
  },
  {
    value: 4,
    title: '功能专属'
  },
  {
    value: 5,
    title: '活动限定'
  }
]

// 资源状态
export const resourceValueList = [
  {
    value: 1,
    title: '上架'
  },
  {
    value: 2,
    title: '正在预售'
  },
  {
    value: 3,
    title: '即将上线'
  },
  {
    value: 4,
    title: '维护中'
  },
  {
    value: 5,
    title: '下架'
  },
  {
    value: 6,
    title: '禁用'
  }
]
