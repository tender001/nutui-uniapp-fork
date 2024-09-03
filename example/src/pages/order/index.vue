<template>
  <view class="order-page">
    <nut-searchbar v-model="search.keyword" custom-class="search" shape="round"
      placeholder="请输入订单名称/ID"></nut-searchbar>
    <nut-tabs v-model="userType" type="smile" size="large" @change="handleTabsChange">
      <nut-tab-pane title="我的发单" pane-key="0">
        <List @change="fetchOrders" :data="myCreateOrders" :userType="userType" v-if="myCreateOrders.length" />
        <nut-empty v-else image="https://oss.6780.cn/pilot/empty.png" description="暂无订单"></nut-empty>
      </nut-tab-pane>
      <nut-tab-pane title="我的接单" pane-key="1">
        <List @change="fetchOrders" :data="myOfferOrders" :userType="userType" v-if="myOfferOrders.length" />
        <nut-empty v-else image="https://oss.6780.cn/pilot/empty.png" description="暂无订单"></nut-empty>
      </nut-tab-pane>
    </nut-tabs>
  </view>

</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { getMyTask } from '../../api/uav'
import List from './List.vue'
import { orderStateList } from '@/utils/constant'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const categoryList = computed(() => {
  return (appStore.enums.cate[0]?.categoryList || []).map(item => {
    return {
      ...item,
      text: item.name,
      value: item.id
    }
  })
})
const userType = ref<'0' | '1'>('0')
const myCreateOrders = ref([] as any)
const myOfferOrders = ref([] as any)

const data = Array.from({ length: 20 })
const search = reactive<Record<string, any>>({
  keyword: ''
})
onShow(async () => {
  fetchOrders()
})
const handleTabsChange = () => {
  fetchOrders()
}
const fetchOrders = () => {
  getMyTask({
    pageNum: 1,
    pageSize: 100,
    type: userType.value
  }).then(res => {
    if (res.code === 0) {
      const list = res.data.list.map((item: any) => {
        return {
          ...item,
          stateName: orderStateList.find((it: any) => it.value === item.state)?.text || '-',
          taskCategoryName: categoryList.value.find((it: any) => it.value === item.taskCategory)?.text || '-',
          address: item.address?.length! > 18 ? `${item.address?.substring(0, 18)}..` : item.address

        }
      })
      if (userType.value === '0') {
        myCreateOrders.value = list
      } else {
        myOfferOrders.value = list
      }
    }


  })
}

</script>
<route lang="json">{
  "style": {
    "navigationBarTitleText": "我的订单"
  }
}</route>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.order-page {
  :deep(.nut-tabs__titles) {
    background-color: $bg-color;

  }

  :deep(.nut-tab-pane) {
    padding: 0;
    background-color: transparent;
  }

  :deep(.nut-tabs__titles-item) {
    flex: unset !important;
    width: 100px !important;

    .nut-icon-joy-smile {
      font-size: 18px !important;
    }
  }

}
</style>