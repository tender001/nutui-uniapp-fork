<script setup lang="ts">
import { redirectTo } from '@/utils/index'
// mode
interface Props {
  mode: 'detail' | 'list'
  data: any
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'detail',
  data: {},
})
function handleGoDetail() {
  if (props.mode === 'list') {
    return redirectTo('/pages/details/index', { id: props.data.id })
  }
}
</script>

<template>
  <div class="ana-card">
    <div class="ana-card-body" @click="handleGoDetail">
      <div class="symbol"> <nut-icon name="https://oss.6780.cn/ana/double-quote.png" /></div>
      <div class="content">人最擅长的就是遗忘<br>所以我们不管做什么营销<br>不要以为你说了<br>或者用户用过一次</div>
    </div>
    <div v-if="mode === 'list'" class="ana-card-footer">
      <div class="icon">
        <nut-icon name="fabulous" custom-color="#c0c5cf" /> 0
      </div>
      <div class="icon">
        <nut-icon name="addfollow" custom-color="#c0c5cf" /> 0
      </div>
      <div class="icon">
        <nut-icon name="https://oss.6780.cn/pilot/copy.png" /> 复制
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@packages/styles/theme.scss';
.ana-card {
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px $weak-color;
    // box-shadow: $cell-box-shadow;
    &-body {
        .symbol {
            color: $primary-color-1;
            margin-top: 8px;
        }
        .content {
            font-size: $font-size-l;
            line-height: 30px;
            letter-spacing: 3px;
            white-space: nowrap;
            padding: 16px 0

        }
    }
    &-footer {
        @include flex;
        color: $weak-color;
        .icon {
            display: flex;
            align-items: center;
            :deep(.nut-icon){
                margin-right: 4px;
            }
        }
    }
}
</style>
