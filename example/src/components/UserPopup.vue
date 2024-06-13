<template>
  <nut-popup v-model:visible="props.visible" position="bottom" closeable round @close=" emits('close')">
    <view class="more-card">
      <view class="more-card-header">
        绑定手机号
      </view>
      <view class="more-card-header-sub">
        绑定成功后将不可修改！
      </view>
      <view class="pay-card-body">
        <view class="popup-form">
          <input class="nut-input-text" v-model="stateForm.phone" placeholder="请填写手机号" type="tell" />
        </view>
        <view class="footer-fixed-warp">
          <view class="footer-lr">
            <view class="btn-list"><nut-button class="login-btn" size="large"
                @click="emits('close')">下次再说</nut-button><nut-button class="login-btn" size="large" @click="handleOk"
                type="primary">提交</nut-button></view>
          </view>
        </view>
      </view>
    </view>
  </nut-popup>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { ref } from 'vue'
import { postBindLocalPhoneNumber } from '../api/uav'
import { showToast } from '../utils'
import regMap from '../utils/regMap'

const props = defineProps({
  mode: {
    type: String,
    default: 'phone'
  },
  visible: {
    type: Boolean,
    default: false
  }
})
const userStore = useUserStore()
const userinfo = computed(() => userStore.userinfo)
const stateForm = reactive<{ phone: string }>({
  phone: userinfo.value.phone,
})
const emits = defineEmits(['close']);
const handleOk = async () => {
  if (!stateForm.phone) {
    return showToast('请先完善您的手机号')
  }
  if (!regMap.phone.test(stateForm.phone)) {
    return showToast('请先输入正确的手机号')
  }
  const res = await postBindLocalPhoneNumber(stateForm)
  if (res?.code === 0) {
    showToast('绑定成功')
    emits('close')
  }

}


</script>
<style lang="scss" scoped>
.more-card {
  padding: 32px 16px;

  .more-card-header {
    font-size: 22px;
    color: #000;
    font-weight: bold;
  }

  .pay-card-body {
    margin-top: 32px;
    margin-bottom: 64px;

    .popup-form {
      padding: 16px;
      align-items: center;
      display: block;

      .nut-button {
        margin: 0 auto;
        height: unset;
        line-height: unset;
        padding: 0;
        margin: 0;
        width: 40px;
        display: unset;
        border: none;
        background-color: rgb(1 184 92 / 10%);

        .nut-avatar {
          margin-left: 16px;
        }

        .avatar-image {
          width: 60px;
          height: 60px;
          border-radius: 100%;
          margin-left: 16px;
        }

        // position: relative;
        .nutui-iconfont {
          color: rgb(1 184 92 / 60%);
          // background: #ddd;
          box-shadow: 0 0 4px 0 rgb(1 184 92);
          border-radius: 100%;
          // position: absolute;
          // bottom: 0;
        }
      }

      input {
        text-align: center;
        padding: 6px;
        background-color: rgb(1 184 92 / 10%);
        width: 8em;
        margin: 0 auto;
        font-size: 20px;
        border-radius: 2px;
      }
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