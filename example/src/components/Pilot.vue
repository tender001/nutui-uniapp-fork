<template>
  <nut-cell title="飞手任务" :desc="text" is-link @click="showAddress"></nut-cell>
  <nut-address v-model="value" v-model:visible="showPopup" :province="address.province" :city="address.city"
    @change="onChange" @close="close" custom-address-title="请选择飞手任务"></nut-address>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useAppStore } from '../store'
const appStore = useAppStore()
appStore.setEnums()
const showPopup = ref(false)
const value = ref([1, 7])
// const address = reactive({
//   province: [
//     { id: 1, name: '演示服务' },
//     { id: 2, name: '电力巡检' },
//     { id: 3, name: '航拍航测' },
//     { id: 4, name: '农业植保' }
//   ],
//   city: [
//     { id: 7, name: '农田测绘' },
//     { id: 8, name: '农田病虫检测' },
//     { id: 9, name: '作物长势检测' },
//     { id: 6, name: '植保飞防' }
//   ],

// })
const address = computed(() => {
  return {
    province: appStore.enums.cate || [],
    city: appStore.enums.cate[0]?.categoryList || [],
  }
})

const text = ref('植保飞防')

const showAddress = () => {
  showPopup.value = !showPopup.value
}

const onChange = (cal) => {
  const name = address[cal.next]
  if (!name || name.length < 1) {
    showPopup.value = false
  }
}
const close = (val) => {
  text.value = val.data.city.name
  value.value = [val.data.province.id, val.data.city.id]
}
</script>