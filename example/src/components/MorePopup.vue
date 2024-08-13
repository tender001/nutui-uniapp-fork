<template>
  <nut-popup v-model:visible="props.visible" position="bottom" closeable round @close="emits('close')">
    <view class="more-card">
      <view class="more-card-header">
        更多操作
      </view>
      <view class="pay-card-body">
        <nut-grid :column-num="3" :gutter="16">
          <!-- <nut-grid-item text="已开启提醒"><nut-icon name="https://oss.6780.cn/pilot/more-wechat.png" /></nut-grid-item> -->
          <nut-grid-item text="添加感谢费" @click="handleWaiting"><nut-icon
              name="https://oss.6780.cn/pilot/more-pay.png" /></nut-grid-item>
          <nut-grid-item text="修改备注" @click="handleWaiting"><nut-icon
              name="https://oss.6780.cn/pilot/more-remark.png" /></nut-grid-item>
          <nut-grid-item @click="cancelDialog = true" text="取消订单"><nut-icon
              name="https://oss.6780.cn/pilot/more-cancel.png" /></nut-grid-item>
        </nut-grid>
      </view>
    </view>
    <nut-dialog content="请确认是否要取消订单" v-model:visible="cancelDialog" @cancel="cancelDialog = false"
      @ok="handleCancelTask" />
  </nut-popup>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { postEditTask } from '@/api/uav'
import { showToast } from '@/utils'

const props = defineProps({
  mode: {
    type: String,
    default: 'more'
  },
  visible: {
    type: Boolean,
    default: false
  },
  id: {
    type: [String, Number],
    default: ''
  }
})
const emits = defineEmits(['close', 'change']);
const cancelDialog = ref(false)
const handleCancelTask = () => {
  postEditTask({ id: props.id, state: 4 }).then(() => {
    showToast('取消成功')
    emits('change')
  })
}
const handleWaiting = () => {
  showToast('功能开发中...')
}



</script>
<style lang="scss" scoped>
.more-card {
  padding: 32px 16px;

  .more-card-header {
    font-size: 22px;
    color: #000;
    font-weight: bold;
  }

  .pay-card-body {
    margin-top: 32px;

  }

  :deep(.nut-grid-item__content) {
    border-radius: 12px;
  }

}

:deep(.nut-icon-close) {
  color: #000;
}
</style>