<template>
    <view class="order-details">
        <view class="fixed-top" v-if="taskInfo?.state === 0 || taskInfo?.state === -1">
            <view class="fixed-top-title">正在寻找飞手...</view>
            <view class="fixed-top-icon">
                <nut-icon color="#000" size="24" name="more-x" @click="moreVisible = true" />
            </view>
        </view>
        <view class="fixed-top" v-if="taskInfo?.state === 1">
            <view class="fixed-top-title">等待飞手开始任务</view>
        </view>
        <view class="fixed-top" v-if="taskInfo?.state === 2">
            <view class="fixed-top-title">任务已开始</view>
        </view>
        <view class="fixed-top" v-if="taskInfo?.state === 3">
            <view class="fixed-top-title">任务已完成</view>
        </view>
        <view class="order-details-body">
            <nut-button custom-class="info-btn" type="default" @click="showDetail = !showDetail">
                任务详情<nut-icon custom-style="width: 12px;height: 12px;margin-left: 6px" size="14"
                    :name="showDetail ? 'arrow-down' : 'arrow-up'" />
            </nut-button>
            <view>
                <nut-cell-group :custom-class="showDetail ? 'booking-cell-group show' : 'booking-cell-group'">
                    <nut-cell title="任务类型" :desc="categoryName" />
                    <nut-cell title="日期" :desc="showDay(taskInfo?.expectServiceTime)" />
                    <nut-cell title="详细地址" :desc="taskInfo?.address" />
                    <nut-cell title="面积" :desc="`${taskInfo?.acreNum}亩`" />
                    <!-- <nut-cell title="佣金" :desc="`${taskInfo?.money || '-'}元`" /> -->
                    <nut-cell title="支付类型" :desc="`${taskInfo?.payType === 1 ? '线上支付' : '线下支付'}`" />
                    <nut-cell title="创建时间"
                        :desc="`${dayjs(taskInfo?.createTime).format('YYYY-MM-DD HH:mm:ss') || '-'}`" />
                    <nut-cell title="接单时间" v-if="taskInfo?.receivingTime"
                        :desc="`${dayjs(taskInfo?.receivingTime).format('YYYY-MM-DD HH:mm:ss') || '-'}`" />
                    <nut-cell title="完成时间" v-if="taskInfo?.finishTime"
                        :desc="`${dayjs(taskInfo?.finishTime).format('YYYY-MM-DD HH:mm:ss') || '-'}`" />


                </nut-cell-group>


            </view>
            <view class="order-details-card" v-if="isOwner">
                <view class="card-title"><nut-icon color="#000" custom-style="width: 12px;height: 12px;"
                        name="https://oss.6780.cn/pilot/answer_quickly@3x.png" />想要更快应答？快来提升飞手接单意愿</view>
                <view class="order-details-cells">
                    <nut-cell title="添加佣金" sub-title="佣金更多，增加更多飞手接单">
                        <template #desc>
                            <nut-button type="primary">去添加</nut-button>
                        </template>
                    </nut-cell>
                    <nut-cell title="预付费用" v-if="taskInfo?.payState === 0" sub-title="预付费用，飞手更快接单">
                        <template #desc>
                            <nut-button type="primary" @click="handlePayContinue">去支付</nut-button>
                        </template>
                    </nut-cell>
                </view>
            </view>
            <template v-else>

                <view class="order-details-card" v-if="!taskInfo?.signPic">
                    <view class="card-title">
                        <nut-icon color="#000" custom-style="width: 12px;height: 12px;"
                            name="https://oss.6780.cn/pilot/answer_quickly@3x.png" />飞手操作
                    </view>
                    <view class="order-details-cells">
                        <nut-cell title="开始任务" v-if="taskInfo?.state === 1" sub-title="开始测量实际面积，系统将根据实际面积计算金额">
                            <template #desc>
                                <nut-button type="primary" @click="handleStartJob">开始</nut-button>
                            </template>
                        </nut-cell>
                        <nut-cell title="完成任务" v-if="taskInfo?.state === 2" sub-title="拍摄现场照片，选择是否挂账，系统自动生成多退少补订单">
                            <template #desc>
                                <nut-button type="primary" @click="handleFinishJob">完成</nut-button>
                            </template>
                        </nut-cell>
                        <nut-cell title="签字确认" v-if="taskInfo?.state === 3 && !taskInfo.signPic" sub-title="线下支付，请签字确认">
                            <template #desc>
                                <nut-button @click="handleSignature" type="primary">签字</nut-button>
                            </template>
                        </nut-cell>
                    </view>
                </view>
            </template>

            <view class="order-details-card" v-if="isOwner && taskInfo?.state! > 1">
                <view class="card-title">
                    <nut-icon color="#000" custom-style="width: 12px;height: 12px;"
                        name="https://oss.6780.cn/pilot/answer_quickly@3x.png" />农户操作
                </view>
                <view class="order-details-cells">
                    <nut-cell title="签字确认" sub-title="线下支付，请签字确认">
                        <template #desc>
                            <nut-button @click="handleSignature" type="primary">签字</nut-button>
                        </template>
                    </nut-cell>
                    <nut-cell title="多退少补" sub-title="系统根据实际面积计算金额，请确认支付">
                        <template #desc>
                            <nut-button type="primary">支付</nut-button>
                        </template>
                    </nut-cell>

                </view>
            </view>
        </view>
        <MorePopup :visible="moreVisible" @close="moreVisible = false" />
    </view>

</template>

<script setup lang="ts">
import { useInit } from '@packages/hooks'
import { getDetail, postCreateOrder, postEditTask } from '../../api/uav'
import { showDay } from '@/utils/date'
import type { TaskItem } from '../../api/type';
import { redirectTo, showToast } from '@/utils/index'
import { useUserStore } from '@/store/user'
import dayjs from 'dayjs'

const moreVisible = ref(false)
const taskInfo = ref<TaskItem>()
const showDetail = ref(false)
const { getLocationParams } = useInit()
const userStore = useUserStore()
import { useAppStore } from '@/store'

const appStore = useAppStore()


const categoryName = computed(() => {
    return appStore.getEnumsValueName('cate', taskInfo.value?.taskCategory!)//categoryList.value.find(item => item.value === taskInfo.value?.taskCategory)?.text || '-'
})
const taskId = computed(() => {
    return getLocationParams('id')
})
onMounted(() => {
    uni.showShareMenu({ withShareTicket: true })
    fetchData()

})

const isOwner = computed(() => {
    console.log('userStore.userinfo.userId', userStore.userinfo.userId)
    return taskInfo.value?.userId === userStore.userinfo.userId
})
// -1.待发布 0.待接单 1.已接单 2.进行中 3.已完成 4.已取消
const fetchData = async () => {
    await userStore.setUserinfo()
    const res = await getDetail({ taskId: taskId.value })
    if (res?.code === 0) {
        taskInfo.value = {
            ...res.data,
        }
    }
}
const handleFinishJob = () => {
    redirectTo('/pages/details/finish?id=' + taskId.value)
}
const handleSignature = () => {
    redirectTo('/pages/details/signature?id=' + taskId.value)
}
const handleStartJob = async () => {
    const res = await postEditTask({ id: taskId.value, state: 2 })
    if (res?.code === 0) {
        showToast('开始成功')
        fetchData()
    }
}
const handlePayContinue = async () => {
    const { data } = await postCreateOrder({ id: taskId.value, price: taskInfo.value?.price! * taskInfo.value?.acreNum! })
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
const handleEditTask = async (params: any) => {
    const res = await postEditTask(params)
}

</script>
<route lang="json">{
    "style": {
        "navigationBarTitleText": "订单详情"
    }
}</route>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.order-details {
    //    bcfcba  bbfbba f2f8f6
    min-height: 100vh;
    background-image: linear-gradient(135deg,
            #a7ffa9 40%,

            rgb(1 184 92 / 1%),
            #f2f8f6);

    .fixed-top {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 -1px 4px 0 $primary-color;
        border-radius: 0 0 16px 16px;

        .fixed-top-title {
            @include title();
            font-size: 18px;
        }

        .fixed-top-icon {
            transform: rotate(90deg);
            font-weight: bold;
        }
    }

    .order-details-body {
        padding: 16px;

        :deep(.info-btn) {
            background: transparent !important;
            border-color: #000 !important;
            color: #000 !important;
            margin-bottom: 32px;

            .nut-icon {
                width: 12px !important;
                height: 12px !important;
                font-size: 12px;
            }
        }

        .order-details-card {
            border-radius: 32px;
            padding: 4px;
            background-color: #f78245;

            .card-title {
                @include title();
                color: #fff;
                font-size: 14px;
                padding: 0 0 4px 4px;
                display: flex;
                align-items: center;

                :deep(.nut-icon) {
                    height: 48px !important;
                    width: 48px !important;
                }
            }

            .order-details-cells {
                background-color: #fff;
                border-radius: 32px;
                overflow: hidden;
                padding: 0 12px;

                :deep(.nut-cell) {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    box-shadow: none !important;

                    .nut-cell__value {
                        flex: unset !important;
                    }

                    .title {
                        @include title();
                        font-size: 16px;
                    }
                }

            }
        }

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

        :deep(.booking-cell-group) {
            background: transparent !important;
            height: 0 !important;
            transform: height 0.4;
            overflow: hidden;

            .nut-cell,
            .nut-cell-group__wrap {
                background: transparent !important;
            }
        }

        :deep(.booking-cell-group.show) {
            height: 400px !important;
        }
    }
}
</style>