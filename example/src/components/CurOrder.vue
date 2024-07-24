<template>
    <view class="cur-Order" v-if="data">
        <image class="card-image" mode="widthFix" src="https://oss.6780.cn/pilot/cardbg@2x.png" />
        <view class="card-content">
            <view class="card-title">
                <text>正在寻找飞手</text>
                <nut-icon size="14" name="https://oss.6780.cn/pilot/more.png" />
            </view>
            <view class="card-content">

                <view class="card-content-info"> {{ showDay(data?.expectServiceTime) }} 预约 <nut-divider
                        direction="vertical" /> 农业植保</view>
                <view class="card-content-more">追加佣金更快应答，任务取消秒退款 <nut-button size="small"
                        custom-style="position:absolute;top:0;right:0;font-weight: bold;height: 33px;border-radius: 8px;"
                        custom-class="commission-btn" type="primary" @click="handleCommissionAdd">追加佣金</nut-button>
                </view>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { showDay } from '@/utils/date'

const props = defineProps({
    data: {
        type: Object,
        default: () => { },
    },
})
const handleCommissionAdd = () => {
    console.log('追加佣金');
}
</script>

<style lang="scss" scoped>
.cur-Order {
    margin-top: 16px;
    border-radius: 16px;
    padding: 12px;
    position: relative;
    overflow: hidden;
    background: #fff;

    .card-image {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .card-content {
        color: #000;
        position: relative;

        .card-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 8px;

            text {
                font-size: 16px;
                font-weight: bold;
                color: #000;
            }

            text::before {
                content: '';
                display: inline-block;
                width: 4px;
                height: 18px;
                margin-top: 2px;
                position: absolute;
                margin-left: -20px;
                background: $primary-color;
            }

            :deep(.nut-icon) {
                width: 14px !important;
                height: 14px !important;
            }

        }

        .card-content-info {
            font-size: 16px;
            padding: 8px;
        }

        .card-content-more {
            background: #f6f7fa;
            padding: 8px;
            border-radius: 8px;
            font-size: 12px;
            color: #888;
            display: flex;
            justify-content: space-between;
            position: relative;


        }

        :deep(.commission-btn) {
            position: absolute !important;
            top: 0;
            right: 2px;
        }

        .commission-btn {
            position: absolute !important;
            top: 0;
            right: 0;
        }
    }
}
</style>