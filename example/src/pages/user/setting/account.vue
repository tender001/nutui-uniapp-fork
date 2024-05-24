<template>
    <view class="setting">
        <nut-cell-group custom-class="nav-menu">
            <nut-cell title="手机号" is-link desc="153***0059" @click="handleWaiting">
            </nut-cell>
            <nut-cell title="修改密码" is-link @click="handleWaiting">
            </nut-cell>
            <nut-cell title="注销账号" is-link @click="handleWaiting">
            </nut-cell>
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