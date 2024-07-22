<template>
  <view class="booking-list">
    <nut-cell-group v-for="(item, index) in data" :key="index" custom-class="booking-cell-group">


      <nut-cell custom-class="cell-title">

        <template #title>
          <view class="cell-title-title">

            <view>{{ appStore.getEnumsValueName('cate', item.taskCategory) }}</view>
            <view class="cell-title-time">{{ showDay(item.expectServiceTime) }}</view>
          </view>
        </template>
        <template #desc v-if="index < 3">
          <nut-icon name="https://oss.6780.cn/pilot/new.png" size="36" />
        </template>
      </nut-cell>
      <nut-cell custom-class="cell-body" custom-style="padding-top:0;padding-bottom:0;">
        <template #icon>

        </template>
        <view class="cell-body-title">
          <view class="cell-body-title-text">
            <nut-icon v-if="item.orderType > 1" name="https://oss.6780.cn/pilot/hot.png" size="24px"></nut-icon>
            <text> {{ item.requireDescription || '我是一定需求描述备注' }}</text>
          </view>
          <view class="cell-body-title-price"><nut-price :price="item.money" size="large" :decimal-digits="0"
              position="after" symbol="元" />
          </view>
        </view>
      </nut-cell>
      <nut-cell custom-class="cell-footer" custom-style="align-items:baseline">
        <template #title>
          <view class="cell-footer-title">
            <view class="cell-footer-title-text"><text class="value">{{ item.acreNum }}亩</text></view>
            <view class="cell-footer-title-text">{{ item.address }}</view>
          </view>
        </template>
        <template #desc>
          <nut-button plain size="small" type="primary" @click="() => handleTakeOrder(item)">确认接单</nut-button>
        </template>

      </nut-cell>



    </nut-cell-group>
  </view>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useAppStore } from '@/store'
import { showDay } from '@/utils/date'
import { useUserStore } from '@/store/user'
import { getReceivingTask } from '../../api/uav'
import { redirectTo, showToast } from '../../utils'

const appStore = useAppStore()
const userStore = useUserStore()

const userinfo = computed(() => userStore.userinfo)
// getEnumsValueName
const props = defineProps({
  data: { type: Array, default: () => [] },
  tab: { type: String, default: '' }
})
onShow(async () => {


})

const handleTakeOrder = async (row: any) => {
  // getReceivingTask
  console.log('userinfo', userinfo)
  const res = await getReceivingTask({ taskId: row.taskId || 26 })
  const { code } = res
  if (code === 0) {
    showToast('接单成功')
    redirectTo(`/pages/details/index?taskId=${row.taskId}`)

  }
  if (code === 100) {
    redirectTo('/pages/user/auth/pilot')
    return
    return
  }

  debugger
  console.log('handleTakeOrder', res)
}
</script>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';


.booking-list {
  padding: 8px 16px;

  .booking-cell-group {
    background-color: black;
    color: red;
    border-radius: 8px;
    padding: 8px;

    .cell-title {

      .list-item-title {

        color: red;
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
    color: $primary-color;


  }

  .cell-body-title {
    @include flex-center(space-between);
    @include title();
    align-items: baseline;
    font-size: 16px;
    width: 100%;

    .cell-body-title-price {
      flex-shrink: 0;

      :deep(.nut-price--symbol) {
        font-weight: normal;
      }

      rich-text {
        font-weight: normal !important;
        font-size: 14px;
      }
    }

    :deep(.nut-price--symbol-large) {
      font-weight: normal !important;
    }

    .cell-body-title-text {
      @include flex-center(start);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      word-break: break-all;
      font-weight: normal;
    }

  }

  .cell-footer {
    align-items: baseline;
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

    :deep(.nut-icon__img) {
      width: 36px;
      height: 36px;
    }

  }
}
</style>
