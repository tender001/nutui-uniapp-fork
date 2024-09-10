<script setup lang="ts">
import AnaList from './List.vue'

const classify = ref('1')
const classifyList = ref([{
  label: '全部',
  value: '',
}, {
  label: '情感',
  value: '1',
}, {
  label: '成长',
  value: '2',
}, {
  label: '营销',
  value: '3',
}, {
  label: '励志',
  value: '4',
}, {
  label: '创业',
  value: '5',
}, {
  label: '生活',
  value: '6',
}, {
  label: '祝福',
  value: '7',
}, {
  label: '诗词',
  value: '8',
}])
</script>

<template>
  <div class="ana-tab">
    <nut-sticky top="80">
      <div class="ana-tab-header">
        <div class="ana-tab-header-left">
          <nut-tabs
            v-model="classify"
            background="#fff"
            align="left"
            title-scroll
            title-gutter="10"
          >

            <nut-tab-pane
              v-for="(item, index) in classifyList"
              :key="index"
              :title="item.label"
              :pane-key="index"
            />

          </nut-tabs>
        </div>
        <div class="ana-tab-header-right">
          <nut-icon name="category" size="26" custom-color="#8b7773" />
        </div>
      </div>
    </nut-sticky>

    <div class="ana-tab-body">
      <AnaList :data="[{ taskNo: '222', id: 1 }, { taskNo: '222', id: 2 }, { taskNo: '222', id: 3 }]" />
      <!-- 列表 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';
.ana-tab {
    &-header {
        @include flex;
        align-items: center;
        &-left {
            flex: 1;
            overflow: hidden;
            height: 50px;
            :deep(.nut-tabs__list){
                background: #fff !important;
            }

            .ana-tab {
                background: #fff !important;
            }
        }
        &-right {
            width: 30px;
            flex-shrink: 0;
            text-align: right;
        }
    }
}
</style>
