<template>
  <nut-cell title="飞手任务" :desc="text" is-link @click="showAddress"></nut-cell>
  <nut-address v-model="value" v-model:visible="showPopup" :province="address.province" @change="onChange"
    @close="close" custom-address-title="请选择飞手任务"></nut-address>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useAppStore } from '../store'
const appStore = useAppStore()
appStore.setEnums()
const showPopup = ref(false)
const value = ref([1, 7])

const address = computed(() => {
  return {
    province: appStore.enums.cate[0]?.categoryList || [],
  }
})
const emits = defineEmits(['change']);

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
  text.value = val.data.province.name
  value.value = [val.data.province.id]
  emits('change', val.data.province)
}
</script>