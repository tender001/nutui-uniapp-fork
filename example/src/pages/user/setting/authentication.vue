<template>
    <view class="setting">
        <nut-cell-group custom-class="nav-menu">
            <nut-cell title="实名认证" is-link desc="已认证" @click="redirectTo('/pages/user/auth/certification')">
            </nut-cell>
            <!-- <nut-cell title="企业认证" is-link @click="handleWaiting">
            </nut-cell> -->
            <nut-cell title="飞手认证" is-link @click="redirectTo('/pages/user/auth/pilot')">
            </nut-cell>
            <!-- <nut-cell title="个人签约认证" is-link @click="handleWaiting">
            </nut-cell>
            <nut-cell title="企业签约认证" is-link @click="handleWaiting">
            </nut-cell> -->
        </nut-cell-group>


    </view>
</template>
<script setup lang="ts">
import { redirectTo, showToast } from '@/utils/index'
const handleWaiting = () => {
    showToast('功能开发中...')
}


</script>
<route lang="json">{
    "style": {
        "navigationBarTitleText": "账号与安全"
    }
}</route>
<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.setting {
    :deep(.nut-cell-group__wrap:nth-child(1)) {
        margin-top: 0 !important;
    }

    :deep(.nut-cell__title) {
        color: $title-color;
        font-size: $font-size-m;
        font-weight: 400;
    }

    .login-btn {
        color: $title-color;
        font-size: $font-size-m;
        margin: 0 auto;
    }
}
</style>