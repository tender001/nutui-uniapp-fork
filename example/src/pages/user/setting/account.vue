<template>
    <view class="setting">
        <nut-cell-group custom-class="nav-menu">
            <nut-cell title="手机号" is-link :desc="weChatMobile" @click="handleWaiting">
            </nut-cell>
            <nut-cell title="修改密码" is-link @click="redirectTo('/pages/user/setting/password')">
            </nut-cell>
            <nut-cell title="注销账号" is-link @click="handleWaiting">
            </nut-cell>
        </nut-cell-group>

        <UserPopup :visible="userPopup" @close="userPopup = false" />
    </view>
</template>
<script setup lang="ts">
import { redirectTo, showToast, hideCode } from '@/utils/index'
import { useUserStore } from '@/store/user'

const userPopup = ref(false)
const userStore = useUserStore()
const userinfo = computed(() => userStore.userinfo)
const weChatMobile = computed(() => hideCode(userinfo.value.phone, 3, 4))
onMounted(() => {
    userStore.setUserinfo()
})
const handleWaiting = () => {
    if (!userinfo.value.phone) {
        userPopup.value = true
    } else {
        showToast('功能开发中...')
    }

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