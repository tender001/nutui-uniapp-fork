<template>
  <view class="order-page">
    <nut-searchbar v-model="search.keyword" custom-class="search" shape="round"
      placeholder="请输入订单名称/编号"></nut-searchbar>
    <nut-tabs v-model="userType" type="smile" size="large">
      <nut-tab-pane title="我的发单" pane-key="1">
        <List :data="data" />
      </nut-tab-pane>
      <nut-tab-pane title="我的接单" pane-key="2">
        <!-- <List :data="data" /> -->
        <nut-empty
          image="https://oss.6780.cn/pilot/empty.png"
          description="暂无订单"
        ></nut-empty>
      </nut-tab-pane>
    </nut-tabs>
  </view>

</template>

<script setup lang="ts">
import { reactive } from 'vue'
import List from './List.vue'

const userType = ref('1')

const data = Array.from({ length: 20 })
const search = reactive<Record<string, any>>({
  keyword: ''
})
onMounted(() => {
  uni.showShareMenu({ withShareTicket: true })
})

</script>
<route lang="json">{
  "style": {
    "navigationBarTitleText": "我的订单"
  }
}</route>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.order-page {
  :deep(.nut-tabs__titles){
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