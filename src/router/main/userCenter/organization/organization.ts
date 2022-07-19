const organization = () =>
  import('@/views/main/userCenter/organization/organization.vue')
export default {
  path: '/userCenter/organization',
  name: 'organization',
  component: organization,
  children: []
}
