const goodsDescription = () =>
  import('@/views/main/goods/description/description.vue')
export default {
  path: '/goods/description',
  name: 'goodsDescription',
  component: goodsDescription,
  children: [],
  meta: {
    title: '套餐文案'
  }
}
