<script setup lang="ts">
import type { TaskItem } from '@/api/type'

interface Props {
  data: TaskItem[]

}
const props = withDefaults(defineProps<Props>(), {
})

// const emits = defineEmits(['change'])
</script>

<template>
  <div class="order-list flex flex-col">
    <div
      v-for="(item, index) in data "
      :key="index"
      class="order-list-item"
    >

      <AnaCard :data="item" mode="list" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.order-list {
  .order-list-item {
    margin-bottom: 24px;
  }

}
</style>
