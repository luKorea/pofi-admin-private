/*
 * @Author: korealu
 * @Date: 2022-03-10 14:13:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-08 10:08:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/select-list/map-resource-list.ts
 */

// 平台
export const deviceList = [
  { title: 'Android', value: 0 },
  { title: 'iOS', value: 1 }
]
// 版本状态
export const versionStateList = [
  { title: '运营中', value: 0 },
  { title: '预上线', value: 1 },
  { title: '已停运', value: 2 }
]
// 服务器列表
export const hostList = [
  {
    value: 'https://pure.pofiart.com',
    title: '审核服'
  },
  {
    value: 'https://api.pofiart.com',
    title: '正式服'
  }
]

// 用户账号状态
export const accountTypeList = [
  {
    value: 1,
    title: '注销'
  },
  {
    value: 2,
    title: '正常'
  }
]

// 是否实名制
export const realNameList = [
  {
    title: '全部',
    value: -999
  },
  {
    title: '是',
    value: 1
  },
  {
    title: '否',
    value: 0
  }
]

// Pro plus 状态
export const memberStateList = [
  {
    title: '全部',
    value: -999
  },
  {
    title: '已购买',
    value: 0
  },
  {
    title: '已过期',
    value: 1
  }
]

// 订单状态
export const orderTypeList = [
  {
    title: '等待支付',
    value: 0
  },
  {
    title: '完成支付',
    value: 1
  },
  {
    title: '取消支付',
    value: 2
  }
]

// 用户充值方式
export const payTypeList = [
  {
    value: 0,
    title: '微信'
  },
  {
    value: 1,
    title: '支付宝'
  },
  {
    value: 2,
    title: 'QQ支付'
  },
  {
    value: 3,
    title: 'apple支付'
  },
  {
    value: 4,
    title: 'apple订阅'
  },
  {
    value: 5,
    title: 'google支付'
  },
  {
    value: 6,
    title: 'google订阅'
  }
]

// POFI 库
export const libraryList = [
  {
    value: 1,
    title: '人偶库'
  },
  {
    value: 2,
    title: 'Pose库'
  },
  {
    value: 3,
    title: '动画库'
  }
]

// VIP类型
export const memberList = [
  {
    value: 0,
    title: 'Free'
  },
  {
    value: 1,
    title: 'Pro'
  },
  {
    value: 2,
    title: 'Plus'
  }
]

// 跳转方向
export const directionList = [
  { value: -999, info: 'all', title: '全部' },
  { value: 1, info: 'out', title: 'APP外部' },
  { value: 2, info: 'in', title: '内部' }
]

// 跳转链接使用平台
export const platformList = [
  { value: 1, info: 'out', title: 'APP' },
  { value: 2, info: 'in', title: 'APP内-H5网页' },
  { value: 3, info: 'in', title: 'H5网页' },
  { value: 4, info: 'in', title: '小程序' },
  { value: 5, info: 'in', title: '其他' }
]

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
