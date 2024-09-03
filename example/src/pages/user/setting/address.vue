<template>
    <nut-address-list
      :data="data"
      long-press
      @click-item="clickItem"
      @del-icon="delClick"
      @edit-icon="editClick"
      :show-bottom-button="false"
      :data-options="dataOptions"
    >
    </nut-address-list>
  </template>
  <script setup>
  import { ref, reactive } from 'vue'
  const data = ref([
    {
      testid: 3,
      testaddressName: '姓名',
      phone: '123****4567',
      defaultAddress: false,
      fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试'
    },
    {
      testid: 4,
      testaddressName: '姓名',
      phone: '123****4567',
      defaultAddress: true,
      fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试'
    }
  ])
  const dataOptions = reactive({
    id: 'testid',
    addressDetail: 'testaddressDetail',
    addressName: 'testaddressName'
  })
  const clickItem = () => {
    console.log('Click To Address')
  }
  const delClick = () => {
    console.log('Click To Delete')
  }
  const editClick = () => {
    console.log('Click To Edit')
  }
  </script>
  <route lang="json">{
    "style": {
        "navigationBarTitleText": "我的地址"
    }
}</route>