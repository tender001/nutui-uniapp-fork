<template>
  <view class="booking-list">
    <nut-cell-group v-for="(item, index) in data" :key="index" custom-class="booking-cell-group">

      
      <nut-cell custom-class="cell-title">
        <!-- <template #right-icon>
          <nut-icon name="arrow-right"></nut-icon>
        </template> -->
        <template #title>
          <view class="cell-title-title">
            
            <view>{{ item.serviceName }}</view>
            <view class="cell-title-time">{{ item.taskEndTime.substring(5, 10) }}</view>
          </view>
        </template>
        <template #desc>
          <view class="cell-title-desc">
            已完成
          </view>
        </template>
      </nut-cell>
      <nut-cell custom-class="cell-body" custom-style="padding-top:0;padding-bottom:0;">
        <template #icon >
           
      </template>
        <view class="cell-body-title">
            <view class="cell-body-title-text">
              <nut-icon v-if="index<3" name="https://oss.6780.cn/pilot/hot.png" size="24px" ></nut-icon>
             <text> {{ item.requireDescription }}</text></view>
            <view class="cell-body-title-price"><nut-price :price="item.totalAmount" size="large" :decimal-digits="0"  /></view>
          </view>
      </nut-cell>
      <nut-cell custom-class="cell-footer">
        <template #title>
          <view class="cell-footer-title">
            <view class="cell-footer-title-text">任务人数：<text class="value">{{ item.requireNum }}</text></view>
            <view class="cell-footer-title-text">地点：<text class="value">{{ item.taskAddress }}</text></view>
          </view>
        </template>
        <template #desc v-if="index<3">
          <nut-icon
        name="https://oss.6780.cn/pilot/new.png"
        size="36"
      />
        </template>
        
      </nut-cell>
     
      
      
    </nut-cell-group>
  </view>
</template>

<script setup lang="ts">

const props = defineProps({
  data: { type: Array, default: () => [] },
  tab: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';


.booking-list {
  padding: 8px 16px;
  .booking-cell-group {
    background-color: black;
    color:red;
    border-radius: 8px;
    padding: 8px;
    .cell-title {
    
      .list-item-title {
        
        color:red;
      }
    }
    
  }
  
  .cell-title-title {
    @include flex-center(center);
    @include title();
    justify-content: start;
    font-size: 18px;
    .cell-title-time {
      @include textsm();
      font-weight: 400;
      padding-left: 8px;
    }
  }
  .cell-title-desc {
    color:$primary-color;
  }
  .cell-body-title {
    @include flex-center(space-between);
    @include title();
    align-items: baseline;
    font-size: 16px;
    width: 100%;
    .cell-body-title-price {
      flex-shrink: 0;
    }
    .cell-body-title-text {
      @include flex-center(start);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      word-break: break-all;
    }
    
  }
  .cell-footer-title {
    display: flex;
    align-items: center;
    .cell-footer-title-text {
      padding-right: 16px;
      .value {
        color: #222;
      }
    }
    :deep(.nut-icon__img){
      width: 36px;
      height: 36px;
    }
    
  }
}






</style>
