<template>
  <view class="login">
    <view class="login-title">登录账号</view>
    <nut-form ref="formRef" :model-value="form">
      <nut-form-item label="手机号" prop="account" :rules="[{ required: true, message: '请输入手机号' }]">
        <nut-input v-model="form.account" custom-class="form-item-input" placeholder="请输入手机号"
          @blur="onBlurValidate('account')" />
      </nut-form-item>
      <nut-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码' }]">
        <nut-input v-model="form.password" custom-class="form-item-input" type="password" placeholder="请输入密码"
          @blur="onBlurValidate('password')" />
      </nut-form-item>

      <nut-form-item>
        <nut-button custom-class="nut-form-btn" size="large" block type="primary" @click="onSubmit">
          登录
        </nut-button>
      </nut-form-item>
    </nut-form>
    <view class="tip-btn-wrap">
      <text>
        没有账号？
        <text class="text-btn" @click="onRegister">去注册</text>
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { login } from '@/api'
import { setToken } from '@packages/utils'
import { useUserStore } from '@/store/user'

// ====================== Hooks ======================

// ====================== Components ======================
const formRef = ref()
const form = reactive<Record<string, any>>({
  // account: undefined,
  // password: undefined,
  account: 'admin',
  password: '123456'
})

const validateTwoPassword = (val: any) => {
  return !(form.password1 && val && form.password1 !== val)
}

const onBlurValidate = (prop: string) => {
  formRef.value.validate(prop)
}

const onSubmit = async () => {
  formRef.value.validate().then(async ({ valid, errors }: any) => {
    if (!valid) return
    const res = await login({
      userAccount: form.account,
      password: form.password//doSM3(form.password)
    })
    if (!res || res.code !== 0) return
    setToken(res.data.accessToken)
    const userStore = useUserStore()
    await userStore.setUserinfo()
    await userStore.setUserinfo()
    uni.showToast({ title: '登录成功' })
    uni.switchTab({ url: '/pages/home/index' })
    // uni.navigateTo({ url: '/pages/home/index' })
  })
}

const onRegister = () => {
  uni.navigateTo({ url: '/pages/login/register' })
}
</script>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.login {

  background-color: $white;
  height: 100vh;
  .login-title {
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
