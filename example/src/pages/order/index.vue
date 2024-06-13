<template>
  <view class="order-page">
    <nut-searchbar v-model="search.keyword" custom-class="search" shape="round"
      placeholder="请输入订单名称/编号"></nut-searchbar>
    <nut-tabs v-model="userType" type="smile" size="large">
      <nut-tab-pane title="我的发单" pane-key="0">
        <List :data="myCreateOrders" v-if="myCreateOrders.length" />
        <nut-empty v-else image="https://oss.6780.cn/pilot/empty.png" description="暂无订单"></nut-empty>
      </nut-tab-pane>
      <nut-tab-pane title="我的接单" pane-key="1">
        <List :data="myOfferOrders" v-if="myOfferOrders.length" />
        <nut-empty v-else image="https://oss.6780.cn/pilot/empty.png" description="暂无订单"></nut-empty>
      </nut-tab-pane>
    </nut-tabs>
  </view>

</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { getMyTask } from '../../api/uav'
import List from './List.vue'

const userType = ref('0')
const myCreateOrders = ref([] as any)
const myOfferOrders = ref([] as any)

const data = Array.from({ length: 20 })
const search = reactive<Record<string, any>>({
  keyword: ''
})
onMounted(() => {
  uni.showShareMenu({ withShareTicket: true })
  fetchOrders()
})
const fetchOrders = () => {
  getMyTask({
    pageNum: 1,
    pageSize: 10,
    type: userType.value
  }).then(res => {
    if (res.code === 0) {
      const list = res.data.list.map((item: any) => {
        return {
          ...item,
          state: item.state === 0 ? '待接单' : item.state === 1 ? '待取货' : item.state === 2 ? '待交付' : '已完成',
          money: item.price * item.acreNum,
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