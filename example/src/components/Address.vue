<template>
  <nut-cell :desc="text" is-link @click="showAddress"></nut-cell>
  <nut-address v-model="value" v-model:visible="showPopup" :province="address.province" :city="address.city"
    @change="onChange" @close="close"
    custom-address-title="请选择所在地区"></nut-address>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const showPopup = ref(false)

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
})
const value = ref(props.value)
const emits = defineEmits(['update:value']);
const address = reactive({
  province: [
    { id: 1, name: '北京' },
    { id: 2, name: '广西' },
    { id: 3, name: '江西' },
    { id: 4, name: '四川' }
  ],
  city: [
    { id: 7, name: '朝阳区' },
    { id: 8, name: '崇文区' },
    { id: 9, name: '昌平区' },
    { id: 6, name: '石景山区' }
  ],
  
})

const text = ref('')

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
  text.value = val.data.addressStr
  const cityValue =  [val.data.province.id, val.data.city.id]
  value.value = cityValue
  emits('update:value', cityValue);
}
</script>