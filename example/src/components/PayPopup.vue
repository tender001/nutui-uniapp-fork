<template>
    <nut-popup v-model:visible="props.visible" > 
        <view class="pay-card">
            <view class="pay-card-header">
                <view class="header-title">下单成功！</view>
                <view class="header-title sub">预付费用，飞手抢着接</view>
            </view>
            <view class="pay-card-body">
                <view class="body-title">需支付</view>
                <view class="body-content">
                    <view class="money">{{props.money}}</view>
                    <view class="unit">元</view>
                </view>
            </view>
            <view class="pay-card-footer">
                <view class="footer-btn">稍后再说</view>
                <view class="footer-btn">
                    <view>立即支付</view>
                    <view class="desc">任务取消秒退款</view>
                </view>
            </view>
        </view>
    </nut-popup>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const props = defineProps({
    money: {
      type: Number,
        required:false
    },
    visible:{
        type: Boolean,
        default: false
    }
  })

  
 
  </script>