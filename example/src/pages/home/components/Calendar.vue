<script setup lang="ts">
import dayjs from 'dayjs'
// @ts-ignore
import { getLunar } from 'chinese-lunar-calendar'
import { computed } from 'vue'

const chinese = computed(() => {
  const now = dayjs()
  return getLunar(now.year(), now.month() + 1, now.date()).dateStr
})
</script>

<template>
  <div class="calendar-card">
    <div class="calendar-card-header flex-center">
      <div class="calendar-card-header-left">
        <div class="lunar">{{ dayjs().format('MM') }}<span class="split">/</span>{{ dayjs().format('DD') }}</div>
        <div class="chinese">农历 {{ chinese }}</div>
      </div>
      <div class="calendar-card-header-right">宜自知</div>
    </div>
    <div class="calendar-card-body">
      知道自己知道什么，
      也知道自己不知道什么，
      这就是真正的认知。
    </div>
    <div class="calendar-card-footer flex-center">
      <div class="calendar-card-footer-left">
        <nut-icon
          custom-color="#c0c5cf"
          custom-style="margin-right:16px"
          name="addfollow"
        />
        <nut-icon name="https://oss.6780.cn/pilot/copy.png" size="18" />
      </div>
      <div class="calendar-card-footer-right">
        <nut-icon name="date" custom-color="#8b7773" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';
.calendar-card {
    padding: 16px;
    border: 1px solid $primary-color;
    border-radius: 4px;
    .calendar-card-header {

        @include flex;
        align-items: center;
        &-left {
            .lunar {
                display: flex;
                align-items: baseline;
                font-size: 36px;
                color: $primary-color;
                .split {
                    font-size: $font-size-s;
                }
            }
            .chinese {
                background-color: $primary-color;
                color: #fff;
                font-size: $font-size-xs;
                text-align: center;
                width: 100%;
                margin-top: -6px;
            }
        }
        &-right {
            font-size: $font-size-xl;
            color: $primary-color;
            font-family: serif;
        }
    }
    .calendar-card-body {
        padding: 16px 0;
        font-size: $font-size-l;
    }
    .calendar-card-footer {
        @include flex;
        .icon-addfollow {
            color: $weak-color;
            margin-right: 16px;
        }
        :deep(.nut-icon-addfollow){
            color: $weak-color;
            margin-right: 16px;
        }
    }

}
</style>
