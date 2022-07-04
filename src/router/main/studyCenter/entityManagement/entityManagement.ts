const entityManagement = () =>
  import('@/views/main/studyCenter/entityManagement/entityManagement.vue')
export default {
  path: '/studyCenter/entityManagement',
  name: 'entityManagement',
  component: entityManagement,
  children: []
}
