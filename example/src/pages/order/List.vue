<template>
  <view class="order-list flex flex-col">
    <view v-for="(item, index) in  data  " :key="index" class="order-list-item" @click="() => handleGoDetails(item)">

      <view class="list-item-row list-item-top flex justify-between">
        <view class="list-item-left">ID {{ item.taskNo }}</view>
        <view :class="`list-item-right state-${item.state}`">{{ item.stateName }}</view>
      </view>
      <view class="list-item-row list-item-content flex justify-between">
        <view class="list-item-left">
          <view class="flex  " style="align-items: center;">
            <image style="width: 30px;height: 30px;" src="https://oss.6780.cn/pilot/zhibaofanghu.png" />
            <text class="title">{{ item.taskCategoryName }}</text>
          </view>

          <!-- <nut-price :price="item.totalPrice" size="normal" /> -->
        </view>
        <view class="list-item-right">
          <!-- <view>￥{{ item.totalPrice }}</view> -->
          <nut-price :price="item.totalPrice" size="normal" :decimal-digits="0" />
        </view>
      </view>
      <view class="cell-footer-title">
        <view class="cell-footer-title-text"><text class="value">{{ item.acreNum }}亩</text></view>
        <view class="cell-footer-title-text">{{ item.address }}</view>
      </view>
      <view class="list-item-row list-item-bottom flex justify-between">
        <view class="list-item-left" v-if="userType === '1'">{{ dayjs(item.receivingTime).format('YYYY-MM-DD HH:mm') }}
        </view>
        <view class="list-item-left" v-else>{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm') }}</view>
        <view class="list-item-right">
          <nut-button type="default" v-if="item.state === 1 && userType === '0'" size="small"
            @click="() => handleContact(item)">联系飞手</nut-button>
          <nut-button type="default" v-if="item.state === -1 && userType === '0'" size="small"
            @click="() => handlePayContinue(item)">去支付</nut-button>
          <nut-button type="default" v-if="item.state === 1 && userType === '1'" size="small"
            @click="() => handleStartJob(item)">开始作业</nut-button>
          <nut-button type="default" v-if="item.state === 2 && userType === '1'" size="small"
            @click="() => handleFinishJob(item)">完成作业</nut-button>
          <nut-button type="default" v-if="item.state === 3 && !item.signPic" size="small"
            @click="() => handleSignature(item)">签字确认</nut-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { redirectTo, showToast } from '@/utils/index'
import { postCreateOrder, postEditTask } from '@/api/uav';
import type { TaskItem } from '@/api/type'



interface Props {
  data: TaskItem[]
  /** 0 农户 1 飞手 */
  userType: '0' | '1'
}
const props = withDefaults(defineProps<Props>(), {
  userType: '0',
})

const emits = defineEmits(['change']);

const handleContact = (row: TaskItem) => {
  uni.makePhoneCall({
    phoneNumber: row?.manipulatorsUserPhone!
  });
}
const handleStartJob = async (row: TaskItem) => {
  const res = await postEditTask({ id: row.id!, state: 2 })
  if (res?.code === 0) {
    showToast('开始成功')
    emits('change')
  }
}
const handleFinishJob = (row: TaskItem) => {
  redirectTo('/pages/details/finish?id=' + row.id)
}
const handleSignature = (row: TaskItem) => {
  redirectTo('/pages/details/signature?id=' + row.id)
}
const handleGoDetails = (row: any) => {
  redirectTo('/pages/details/index?id=' + row?.id)
}
const handlePayContinue = async (row: any) => {
  const { data } = await postCreateOrder({ id: row.id, price: row.price * row?.acreNum })
  uni.requestPayment({
    ...data,
    package: data.package || data.packageValue,
    success: (res: any) => {
      console.log('success--', res)
      showToast('支付成功')
      emits('change')

    },
    fail: (res: any) => {
      console.log('fail--', res)
    },
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
      color: $text-color;
      font-size: $font-size-s;
      align-items: center;

      .list-item-left {

        // font-size: $font-size-xs;
        @include textsm()
      }

      .title {
        @include flex-center(center);
        @include title();
        justify-content: start;
        font-size: 18px;
      }



    }

    .cell-footer-title {
      display: flex;
      align-items: center;
      margin-top: -8px;
      font-size: 14px;
      color: $text-color;

      .cell-footer-title-text {
        padding-right: 16px;

        .value {
          color: $primary-color;
        }
      }
    }

    .list-item-top {
      .list-item-right {
        color: $primary-color;
      }

      // -1.待发布(线上待支付) 0.待接单 1.已接单 2.进行中 3.已完成 4.已取消
      .state-0 {
        color: #FF9E0D;
      }

      .state--1 {
        color: $primary-color;
      }

      .state-1 {
        color: $primary-color;
      }

      .state-2 {
        color: #4965f2;
      }

      .state-3 {
        color: $primary-color;
      }

      .state-4 {
        color: $text-color-3;
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

  .order-list-item+.order-list-item {
    margin-top: 12px;

  }
}
</style>