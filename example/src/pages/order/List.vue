<template>
    <view class="order-list flex flex-col">
      <view v-for="(item, index) in data" :key="index" class="order-list-item">
       
        <view class="list-item-row list-item-top flex justify-between">
          <view class="list-item-left">单号：89898989er9e9r89e8r</view>
          <view class="list-item-right">已完成</view>
        </view>
        <view class="list-item-row list-item-content flex justify-between">
          <view class="list-item-left">
            <view class="flex  " style="align-items: center;">
              <image style="width: 30px;height: 30px;" src="https://oss.6780.cn/pilot/zhibaofanghu.png" />
              <text>植保防护</text>
            </view>
            <nut-price :price="200" size="normal" />
          </view>
          <view class="list-item-right">
            <view>￥200.00</view>
            <!-- <view>x1</view> -->
          </view>
        </view>
        <view class="list-item-row list-item-bottom flex justify-between">
          <view class="list-item-left">2020-01-01 12:00</view>
          <view class="list-item-right">
            <nut-button type="default" size="small" @click="()=>handleContact(item)">联系飞手</nut-button>
          </view>
        </view>
      </view>
    </view>
</template>
<script setup lang="ts">

const props = defineProps({
  data: { type: Array, default: () => [] },
})

const handleContact=(row:any)=>{
    uni.makePhoneCall({
      phoneNumber: row?.phone||'15372000059' //仅为示例
    });
  }
</script>

<style lang="scss" scoped>
   @import '@packages/styles/theme.scss';
.order-list {
    padding: 16px;
    .order-list-item {
      padding: 8px 16px;
      background: #fff;
      border-radius: 8px;
      box-shadow: var(--nut-cell-box-shadow);
      .list-item-row {
        padding: 8px 0;
        color:$text-color;
        font-size: $font-size-s;
        .list-item-left {
          // font-size: $font-size-xs;
          @include textsm()
        }
      }
      .list-item-top {
        .list-item-right {
          color:$primary-color;
        }
      }
      .list-item-content {
        .list-item-left {
          font-size: $font-size-s;
          color: $title-color;
        }
        .list-item-right {
          @include textsm()
        }
      }
    }
    .order-list-item + .order-list-item {
      margin-top: 12px;

    }
  }
</style>