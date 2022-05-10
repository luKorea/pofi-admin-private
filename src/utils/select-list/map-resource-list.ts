/*
 * @Author: korealu
 * @Date: 2022-03-10 14:13:12
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-10 17:43:48
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/select-list/map-resource-list.ts
 */

// 资源获取方式
export const resourceGetWayList = [
  { value: 1, title: 'P币购买' },
  { value: 2, title: '兑换码' },
  { value: 3, title: '活动获取' },
  { value: 4, title: '系统人工' },
  { value: 5, title: '批量增删' }
]

// 文章类型
export const articleList = [
  { value: 1, title: '版本文案' },
  { value: 2, title: '权益分类' },
  { value: 3, title: '功能' },
  { value: 4, title: '特权' },
  { value: 5, title: '富文本' }
]

// 活动标签
export const activeLabelList = [
  {
    value: 1,
    title: '新上架'
  },
  {
    value: 2,
    title: '立省折扣'
  },
  {
    value: 3,
    title: '活动中'
  },
  {
    value: 4,
    title: '自定义'
  }
]

// 功能专属使用条件
export const functionExclusiveUseConditionsList = [
  { title: 'Pro专业版', value: 1 },
  { title: 'Plus豪华版', value: 2 },
  { title: 'MMD', value: 4 }
]

// 设备要求
export const deviceLevelList = [
  {
    value: 1,
    title: '低'
  },
  {
    value: 2,
    title: '中'
  },
  {
    value: 3,
    title: '高'
  },
  {
    value: 4,
    title: '旗舰'
  }
]

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
    value: 'https://pe.pofiart.com',
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
// VIP所属套餐
export const memberTypeList = [
  {
    value: 0,
    title: 'Free免费版'
  },
  {
    value: 1,
    title: 'Pro专业版'
  },
  {
    value: 2,
    title: 'Plus豪华版'
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
  // {
  //   title: '未知',
  //   value: undefined
  // },
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
    title: '动画库'
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

// 资源文件类型
export const resourceFileList = [
  { title: '单个', value: 0 },
  { title: '多个', value: 1 }
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

// 资源特色功能
export const resourceFunction = [
  { title: '表情', value: 1 },
  { title: '发型', value: 2 },
  { title: 'Pose', value: 3 },
  { title: '动画', value: 4 },
  { title: '结构', value: 5 },
  { title: '特殊材质', value: 6 },
  { title: '服饰', value: 7 },
  { title: '手势', value: 8 },
  { title: '场景', value: 9 },
  { title: '道具', value: 10 }
]
// 资源特色 type 1. 重点功能  2. 模型精度 3. Pofi系列 4. 合作品牌IP
export const resourceFeature = [
  { title: '表情', value: 1, type: 1 },
  { title: '服饰', value: 2, type: 1 },
  { title: '风格', value: 3, type: 1 },
  { title: '高精度', value: 4, type: 2 },
  { title: '超高精度', value: 5, type: 2 },
  { title: 'PofiZOO', value: 6, type: 3 },
  { title: 'Pofi艺术馆', value: 7, type: 3 },
  { title: 'Pofi兵人', value: 8, type: 3 },
  { title: 'Pofi IP角色', value: 9, type: 3 },
  { title: 'Pofi BJD系列', value: 10, type: 3 },
  { title: 'Pofi体块人', value: 11, type: 3 },
  { title: '全职高手', value: 12, type: 4 },
  { title: '海贼王', value: 13, type: 4 },
  { title: '一人之下', value: 14, type: 4 },
  { title: '明日方舟', value: 15, type: 4 },
  { title: '阴阳师', value: 16, type: 4 },
  { title: '英雄联盟', value: 17, type: 4 }
]
