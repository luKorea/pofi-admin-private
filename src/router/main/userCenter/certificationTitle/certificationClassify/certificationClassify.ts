const certificationClassify = () =>
  import(
    '@/views/main/userCenter/certificationTitle/certificationClassify/certificationClassify.vue'
  )
export default {
  path: '/certificationTitle/certificationClassify',
  name: 'certificationClassify',
  component: certificationClassify,
  children: []
}
