<template>
  <view class="order-list flex flex-col">
    <view v-for="(item, index) in   data as any  " :key="index" class="order-list-item">

      <view class="list-item-row list-item-top flex justify-between" @click="() => handleGoDetails(item)">
        <view class="list-item-left">单号：{{ item.taskNo }}</view>
        <view class="list-item-right">{{ item.stateName }}</view>
      </view>
      <view class="list-item-row list-item-content flex justify-between">
        <view class="list-item-left">
          <view class="flex  " style="align-items: center;">
            <image style="width: 30px;height: 30px;" src="https://oss.6780.cn/pilot/zhibaofanghu.png" />
            <text>{{ item.taskCategoryName }}</text>
          </view>
          <nut-price :price="item.money" size="normal" />
        </view>
        <view class="list-item-right">
          <view>￥{{ item.money }}</view>
          <!-- <view>x1</view> -->
        </view>
      </view>
      <view class="list-item-row list-item-bottom flex justify-between">
        <view class="list-item-left">{{ dayjs(item.expectServiceTime).format('YYYY-MM-DD HH:mm') }}</view>
        <view class="list-item-right">
          <nut-button type="default" v-if="item.manipulatorsUserPhone && userType === '0'" size="small"
            @click="() => handleContact(item)">联系飞手</nut-button>
          <nut-button type="default" v-if="item.state === -1 && userType === '0'" size="small"
            @click="() => handlePayContinue(item)">去支付</nut-button>
          <nut-button type="default" v-if="item.state === 1 && userType === '1'" size="small"
            @click="() => handleStartJob(item)">开始作业</nut-button>
          <nut-button type="default" v-if="item.state === 2 && userType === '1'" size="small"
            @click="() => handleStartJob(item)">完成作业</nut-button>
          <nut-button type="default" v-if="item.state === 3 && userType === '1'" size="small"
            @click="() => handleStartJob(item)">确认挂账</nut-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { redirectTo } from '@/utils/index'
import { useAppStore } from '@/store'
import { postCreateOrder } from '@/api/uav';

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
const categoryName = computed(() => {
  return categoryList.value.find(item => item.value === taskInfo.value?.taskCategory)?.text || '-'
})
const props = defineProps({
  data: { type: Array, default: () => [] },
  /**
   * 0:用户
   * 1:飞手
   */
  userType: { type: String, default: '0' },
})

const handleContact = (row: any) => {
  uni.makePhoneCall({
    phoneNumber: row?.manipulatorsUserPhone  //仅为示例
  });
}
const handleStartJob = (row: any) => {
  redirectTo('/pages/details/index?id=' + row?.id)
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
      fetchData()
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

      .list-item-left {
        // font-size: $font-size-xs;
        @include textsm()
      }
    }

    .list-item-top {
      .list-item-right {
        color: $primary-color;
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