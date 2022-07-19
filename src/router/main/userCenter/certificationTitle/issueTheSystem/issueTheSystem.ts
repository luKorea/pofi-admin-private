const issueTheSystem = () =>
  import(
    '@/views/main/userCenter/certificationTitle/issueTheSystem/issueTheSystem.vue'
  )
export default {
  path: '/certificationTitle/issueTheSystem',
  name: 'issueTheSystem',
  component: issueTheSystem,
  children: []
}
