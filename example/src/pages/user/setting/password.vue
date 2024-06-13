<template>
  <view class="register">
    <view class="register-title">修改密码</view>
    <nut-form ref="formRef" :model-value="form" custom-class="register-form nut-form-custom">


      <nut-form-item label="原密码" prop="password" :rules="[{ required: true, message: '请输入原密码' }]">
        <nut-input v-model="form.password" type="password" placeholder="请输入原密码" />
      </nut-form-item>
      <nut-form-item label="新密码" prop="password1" :rules="[{ required: true, message: '请输入新密码' }]">
        <nut-input v-model="form.password1" type="password" placeholder="请输入新密码" @blur="onBlurValidate('password1')" />
      </nut-form-item>
      <nut-form-item label="确认密码" prop="password2" :rules="[
      { required: true, message: '请再次输入密码' },
      { validator: validateTwoPassword, message: '两次密码输入不一致' }
    ]">
        <nut-input v-model="form.password2" type="password" placeholder="请再次输入密码" @blur="onBlurValidate('password2')" />
      </nut-form-item>
      <nut-form-item>
        <nut-button custom-class="nut-form-btn" size="large" block type="primary" @click="onSubmit">提交</nut-button>
      </nut-form-item>

    </nut-form>
    <!-- <view class="tip-btn-wrap">
      <text>
        已有账号？
        <text class="text-btn" @click="onLogin">去登录</text>
      </text>
    </view> -->
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount, onMounted } from 'vue'
import { redirectBack, showToast, hideCode } from '@/utils/index'
import { phonePattern } from '@packages/utils'
import { useTimer } from '@packages/hooks'

import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const userinfo = computed(() => userStore.userinfo)
const weChatMobile = computed(() => hideCode(userinfo.value.phone, 3, 4))
onMounted(async () => {
  await userStore.setUserinfo()
  form.phone = userinfo.value.phone
})

// ====================== Hooks ======================
const { initTimer, clearTimer } = useTimer()

// ====================== Lifecycle ======================
onBeforeUnmount(() => {
  clearTimer()
})

// ====================== Components ======================
const formRef = ref()
const form = reactive<Record<string, any>>({
  account: undefined,
  phone: undefined,
  code: undefined,
  password1: undefined,
  password2: undefined
})



const validateTwoPassword = (val: any) => {
  return !(form.password1 && val && form.password1 !== val)
}

const onBlurValidate = (prop: string) => {
  formRef.value.validate(prop)
}

const onSubmit = async (values: Record<string, any>) => {
  formRef.value.validate().then(async ({ valid, errors }: any) => {
    if (!valid) return
    if (!form.code) {
      showToast({ title: '请输入验证码' })
      return
    }
    console.log('onSubmit', values)
    showToast({ title: '修改成功' })
    redirectBack()
  })
}

const countdown = ref(0)
const sendInterval = 60
const cb = () => {
  if (countdown.value === 0) {
    clearTimer()
    return
  }
  countdown.value = countdown.value - 1
}
const onSendCode = async () => {
  countdown.value = sendInterval
  initTimer(cb, 1)
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

// .register {
//   padding: 32rpx 0;
// }

// .register-title {
//   padding: 32rpx;
//   font-size: 40rpx;
// }

// .register-form {
//   margin-top: 16rpx !important;
// }

// .register-field {
//   &:not(:nth-last-of-type(1)) {
//     margin-bottom: 32rpx !important;
//   }
// }

// .btn-wrap {
//   margin: 64rpx 32rpx 32rpx 32rpx;
// }

// .tip-btn-wrap {
//   margin: 0 32rpx 0 32rpx;
//   padding-right: 20rpx;
//   text-align: right;
//   font-size: 28rpx;
// }</style>
