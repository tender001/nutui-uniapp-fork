<script setup lang="ts">
import { ref } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'
import Calendar from './components/Calendar.vue'
import Featured from './components/Featured.vue'
import Tab from './components/Tab.vue'
import { redirectTo } from '@/utils/index'
import { getToken } from '@/packages/utils'

onShow(async () => {
  if (getToken()) {
    fetchOrders()
  }
})
onShareAppMessage(() => {
  return {
    title: '分享的标题',
    desc: 'unibest 演示示例',
    // path: '/pages/index/index',
    imageUrl: '', // 分享卡片的图片，可选
  }
})
// function navigateTo(path: string) {
//   redirectTo(path)
// }
function fetchOrders() {

}
</script>

<template>
  <div class="home">
    <nut-sticky top="-1">
      <div class="top-search">
        <div class="title">遇见语录</div>
        <nut-icon name="search" />
      </div>
    </nut-sticky>
    <Calendar />
    <Featured />
    <Tab />
    <!-- <AnaList :data="[{ taskNo: '222' }]" /> -->

  </div>
</template>

<route lang="json">
{
  "type": "home",
  "style": {
  }
}
</route>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.home {
  padding: 0 16px;
  .top-search {
    display: flex;
    align-items: center;
    padding: 8px 0;
    margin-bottom: 16px;
    background: #fff;
    .title {
      width: 60vw;
      color: $primary-color;
      font-size: $font-size-xl;
    }
    :deep(.nut-icon-search){
      color: $weak-color;
    }
  }
  :deep(.ana-tab){

    .nut-tabs__titles-item-left{
      padding-left: 0 !important;
    }
    .nut-tabs__titles-item__text {
      text-align: left !important;
    }
    .nut-tabs__titles-item__line {
      left: 34% !important;
    }
  }

  .ana-tabs {
    height: 200vh;
  }

}
</style>
