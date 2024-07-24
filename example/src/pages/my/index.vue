<template>
  <view class="my-page">
    <view class="avatar-info">

      <view class="flex items-center">
        <nut-avatar size="large">
          <image src="https://oss.6780.cn/pilot/avatar.png" />
        </nut-avatar>
        <view class="username-phone">
          <view class="username">{{ userinfo.nickName || '小白菜' }}</view>
          <!-- <view class="phone">{{ hiddenPhone(userinfo.phone) || '188******88' }}</view> -->
        </view>
        <!-- <nut-icon custom-class="text-white ml-auto" name="right" size="14" /> -->
      </view>
    </view>
    <view class="my-content">
      <view class="my-content-order">
        <view class="my-content-order-num">{{ orderNums }}</view>
        <view class="my-content-order-type" @click="onClickMenu('/pages/order/index')">任务订单<nut-icon
            name="arrow-right"></nut-icon></view>
      </view>
      <nut-cell-group custom-class="nav-menu">

        <!-- <nut-cell is-link @click="">
          <template #title>
            <button open-type="contact" class="service-btn">
              联系客服
            </button>
          </template>
</nut-cell> -->
        <button open-type="contact" class="service-btn">
          <nut-cell title="联系客服" is-link @click="">
          </nut-cell>
        </button>
        <nut-cell is-link title="设置" @click="onClickMenu('/pages/user/setting/index')">
        </nut-cell>
        <nut-cell is-link title="意见反馈" @click="handleWaiting">
        </nut-cell>
        <nut-cell is-link title="微信消息提醒" @click="handleWaiting">
        </nut-cell>



      </nut-cell-group>
    </view>

    <UserPopup :visible="userPopup" @close="userPopup = false" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { computed } from 'vue'
import { useUserStore } from '@/store/user'
import { removeToken, hiddenPhone, getToken } from '@/packages/utils'
import { logout } from '@/api'
import { redirectTo, showToast } from '@/utils/index'
import { getMyTask } from '../../api/uav'

const userStore = useUserStore()
const userPopup = ref(false)
const handleWaiting = () => {
  showToast('功能开发中...')
}
onShow(async () => {
  console.log('My Show')
  if (!getToken()) {
    redirectTo('/pages/login/index') // 跳转到登录页
    return false
  }
  await userStore.setUserinfo()
  if (!userinfo.value.phone) {
    userPopup.value = true
  }
  getOrderNums()
})
const orderNums = ref(0)


const userinfo = computed(() => userStore.userinfo)

const onClickMenu = (path: string) => {
  redirectTo(path)

}
const getOrderNums = () => {
  getMyTask({
    pageNum: 1,
    pageSize: 10,
    type: '0'
  }).then(res => {
    orderNums.value = res.data.page.total
  })
}
onMounted(async () => {

})

const onLogout = async () => {
  const res = await logout()
  if (!res || res.code !== 0) return

  uni.showToast({ title: '退出登录成功' })
  redirectTo('/pages/login/index')
  removeToken()
  userStore.cleanup()
}
</script>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.my-page {
  .avatar-info {
    padding: 42px 0 42px 42px;

    background: $uni-nav-bg-color;

    :deep(.nut-avatar) {
      background-color: #000 !important;
      padding: 2px;
    }
  }

  .my-content {
    border-radius: 24px 24px 0 0;
    background-color: $bg-color;
    margin-top: -16px;
    padding: 16px;

    .my-content-order {
      text-align: center;
      padding: 32px;

      &-num {
        // font-size: $title-size;
        // color:$title-color;
        // font-weight: bold;
        @include title()
      }

      &-type {
        @include flex-center(center);
        color: $text-color-2;
        font-size: $font-size-s;

        :deep(.nut-icon) {
          font-size: $font-size-xxs;
        }
      }
    }

    :deep(.nut-cell-group__wrap) {
      border-radius: 24px;

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
  }
}


.title-setting {
  height: 108rpx;
  font-size: 32rpx;
  color: #fff;
}

.username-phone {
  margin-left: 24rpx;

  .username {
    font-weight: bold;
    font-size: 22px;
    line-height: 44rpx;
    color: $title-color;
  }

}

.nav-menu {
  margin: 24rpx !important;
}
</style>