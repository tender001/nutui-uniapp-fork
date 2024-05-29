<template>
    <view class="setting">
        <nut-cell-group custom-class="nav-menu">
            <nut-cell title="个人信息" is-link>
            </nut-cell>
            <nut-cell title="账号安全" @click="redirectTo('/pages/user/setting/account')" is-link>
            </nut-cell>
        </nut-cell-group>
        <nut-cell-group custom-class="nav-menu">
            <nut-cell title="身份认证" @click="redirectTo('/pages/user/setting/authentication')" is-link>
            </nut-cell>
            <nut-cell title="无人机管理" @click="redirectTo('/pages/user/setting/uav')" is-link desc="0">
            </nut-cell>
            <nut-cell title="地址管理" @click="redirectTo('/pages/user/setting/address')" is-link>
            </nut-cell>
        </nut-cell-group>
        <nut-cell-group custom-class="nav-menu">
            <nut-cell title="关于我们" @click="redirectTo('/pages/user/us/index')" is-link desc="版本1.0">
            </nut-cell>
            
        </nut-cell-group>
        <nut-cell-group custom-class="nav-menu">
            <nut-cell center>
                <view class="login-btn" @click="handleLogout">退出登录</view>
            </nut-cell>
            
        </nut-cell-group>
    </view>
</template>
<script setup lang="ts">
  import {redirectTo} from '@/utils/index'

const handleLogout =()=>{
    console.log('退出登录')
}

</script>
<route lang="json">{
    "style": {
        "navigationBarTitleText": "设置"
    }
}</route>
<style lang="scss" scoped>
@import '@packages/styles/theme.scss';
.setting {
    :deep(.nut-cell-group__wrap:nth-child(1)){
        margin-top: 0 !important;
    }
    :deep(.nut-cell__title) {
        color:$title-color;
        font-size: $font-size-m;
        font-weight: 400;
    }
    .login-btn {
        color:$title-color;
        font-size: $font-size-m;
        margin: 0 auto;
    }
}
</style>