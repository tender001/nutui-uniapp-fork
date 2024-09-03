<template>
    <nut-popup position="bottom" closeable round v-model:visible="props.visible" @close="emits('close')">
        <view class="pay-card">
            <view class="pay-card-header">
                <view class="header-title">下单成功！</view>
                <view class="header-title sub">预付费用，飞手抢着接</view>
            </view>
            <view class="pay-card-body">
                <view class="body-title">需支付</view>
                <view class="body-content">
                    <view class="money">{{ props.money }}</view>
                    <view class="unit">元</view>
                </view>
            </view>
            <view class="pay-card-footer">
                <view class="footer-btn" @click="emits('ok', 0)">稍后再说</view>
                <view class="footer-btn" @click="emits('ok', 1)">
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
        required: false
    },
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['close', 'ok']);


</script>
<style lang="scss" scoped>
.pay-card {
    padding: 32px 16px;
    color: #000;
    font-weight: bold;

    .pay-card-header {
        font-size: 22px;

        font-weight: bold;

        .sub {
            font-size: 20px;
            padding-top: 8px;
        }
    }

    .pay-card-body {
        padding: 64px 0;

        .body-title {
            font-size: 18px;

        }

        .body-content {
            color: #ff966a;
            font-size: 36px;
            font-weight: bold;
            padding-top: 8px;
            display: flex;
            align-items: baseline;

            .unit {
                font-size: 14px;
                padding-left: 4px;
            }
        }

    }

    .pay-card-footer {
        display: flex;
        justify-content: space-between;

        .footer-btn {
            height: 30px;
            border-radius: 16px;
            font-size: 20px;
            // font-weight: bold;
            border: 1px solid $primary-color;
            background-color: $primary-color;
            flex: 1;
            padding: 16px;
            text-align: center;

            .desc {
                font-size: 12px;
                color: $title-color2;
                font-weight: 400;
            }
        }

        .footer-btn:nth-child(1) {
            flex: unset;
            border-color: #000;
            background-color: transparent;
        }

        .footer-btn+.footer-btn {
            margin-left: 16px;
        }
    }

    :deep(.nut-grid-item__content) {
        border-radius: 12px;
    }

}

:deep(.nut-icon-close) {
    color: #000;
}
</style>