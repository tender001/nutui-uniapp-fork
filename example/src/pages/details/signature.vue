<template>
    <view class="register">
        <!-- <view class="register-title">签字确认</view> -->
        <view class="register-form nut-form-custom">

            <nut-signature :line-width="state.lineWidth" :stroke-style="state.strokeStyle" @confirm="confirm"
                @clear="clear"></nut-signature>


        </view>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useInit } from '@packages/hooks'
import { postEditTask } from '../../api/uav'
import { uploadFile, showToast, redirectBack } from '../../utils/index'


const { getLocationParams } = useInit()
const state = reactive({
    lineWidth: 6,
    strokeStyle: '#3ece4c'
})

const imgData = ref('')
const taskId = computed(() => getLocationParams('id'))
const confirm = (canvas: any, data: string) => {
    if (data) {
        imgData.value = data
        uploadFile({
            path: data,
            formData: {},
            callback: async (path: string) => {
                const res = await postEditTask({ id: taskId.value, signPic: path })
                if (res?.code === 0) {
                    showToast('提交成功')
                    redirectBack()
                }
            }
        })

    }
}
const clear = () => {
    imgData.value = ''
    console.log('clear')
}







</script>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.register {

    background-color: $white;
    height: 100vh;

    .register-title {
        padding: 8vh 32px 48px 32px;
        font-size: 40rpx;
        background: $uni-nav-bg-color;
        @include title()
    }

    :deep(.nut-cell-group__wrap) {
        border-radius: 24px;
        box-shadow: none;

        .nut-cell {
            padding: 24px;

            .nut-cell {
                padding: 0;
            }
        }

        .nut-cell__title {
            @include title();
            font-size: $font-size-l;
        }

        .nut-icon {
            font-size: $font-size-s;
        }
    }

    :deep(.nut-cell-group) {
        margin-top: -24px !important;
    }

    .tip-btn-wrap {
        margin: 0 32rpx 0 32rpx;
        padding-right: 20rpx;
        text-align: right;
        font-size: 28rpx;

        .text-btn {
            color: $primary-color;
        }
    }
}
</style>
<route lang="json">{
    "style": {
        "navigationBarTitleText": "签字确认"
    }
}</route>
