const courseManagement = () =>
  import('@/views/main/studyCenter/courseManagement/courseManagement.vue')
export default {
  path: '/studyCenter/courseManagement',
  name: 'courseManagement',
  component: courseManagement,
  children: []
}
