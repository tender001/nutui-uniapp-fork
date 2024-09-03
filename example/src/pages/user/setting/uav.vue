<template>

  <view>
    <view class="list flex flex-col" v-if="data.length">
      <view v-for="(item, index) in data" :key="index" class="list-item flex items-center">
        <view class="list-item-left flex-shrink-0">
          <view class="icon-wrap">
            <nut-icon custom-class="icon" size="28" custom-color="#fff" name="star-n" />
          </view>
        </view>
        <view class="list-item-right flex flex-1 flex-col justify-between">
          <view class="list-item-title flex justify-between">
            <text class="list-item-title-text">生活号</text>
            <text class="list-item-title-time">18:15</text>
          </view>
          <view class="list-item-msg">了不起的打工人</view>
        </view>
      </view>
    </view>
    <nut-empty v-else image="https://oss.6780.cn/pilot/empty.png" description="暂无数据"></nut-empty>
    <nut-button custom-class="nut-form-btn" size="large" block type="primary" @click="onSubmit">添加无人机</nut-button>
  </view>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { showToast } from '@/utils/index'

const data = ref([])
const onSubmit = () => {
  // redirectTo('/pages/uav/add/index')
  showToast('功能开发中...')
}

</script>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.list {
  //padding-bottom: 100rpx;
}

.list-item {
  margin: 0 0 24rpx 0;
  padding: 12rpx 24rpx;
  background: #fff;
  //&:first-of-type {
  //  margin-top: 32rpx;
  //}
}

.list-item-left {
  margin-right: 24rpx;

  .icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 88rpx;
    height: 88rpx;
    border-radius: 15%;
    background: #60a5fa;
  }

  .icon {
    font-size: 56rpx;
    color: #fff;
  }
}

.list-item-right {
  padding: 8rpx 0;

  .list-item-title {
    margin-bottom: 16rpx;
  }

  .list-item-title-text {
    font-size: 32rpx;
  }

  .list-item-title-time,
  .list-item-msg {
    font-size: 24rpx;
    color: $text-color-2;
  }
}
</style>