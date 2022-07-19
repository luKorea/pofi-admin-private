const certificationApprovingSystem = () =>
  import(
    '@/views/main/userCenter/certificationTitle/certificationApprovingSystem/certificationApprovingSystem.vue'
  )
export default {
  path: '/certificationTitle/certificationApprovingSystem',
  name: 'certificationApprovingSystem',
  component: certificationApprovingSystem,
  children: []
}
