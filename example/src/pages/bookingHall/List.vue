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
        <view class="cell-body-title" @click="handleSelectedRow(item)">
          <view class="cell-body-title-text">
            <nut-icon v-if="item.orderType > 1" name="https://oss.6780.cn/pilot/hot.png" size="24px"></nut-icon>
            <text> {{ item.remark || '我是一定需求描述备注' }}</text>
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
          <nut-button plain size="small" type="primary" @click="handleOpen(item)">确认接单</nut-button>
        </template>

      </nut-cell>



    </nut-cell-group>
    <nut-dialog content="请确认是否要接单" v-model:visible="receiving" @cancel="receiving = false"
      @ok="handleTakeOrder(selectRow!)" />
  </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { showDay } from '@/utils/date'
import { getReceivingTask } from '../../api/uav'
import { redirectTo, showToast } from '../../utils'
import type { TaskItem } from '../../api/type'

const appStore = useAppStore()

const receiving = ref(false)
const selectRow = ref<TaskItem>()
interface Props {
  data: TaskItem[],
  tab: string
}
const props = withDefaults(defineProps<Props>(), {
  tab: ''
})

const handleOpen = (row: TaskItem) => {
  selectRow.value = row
  receiving.value = true
}

const handleTakeOrder = async (row: TaskItem) => {
  const res = await getReceivingTask({ taskId: row.id! })
  const { code } = res
  if (code === 0) {
    showToast('接单成功')
    setTimeout(() => {
      redirectTo(`/pages/details/index?id=${row.id}`)
    }, 1000);

  }
  if (code === 100) {
    redirectTo('/pages/user/auth/pilot')
    return
  }

}
const handleSelectedRow = (row: TaskItem) => {
  redirectTo(`/pages/details/index?id=${row.id}&from=bookingHall`)
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
