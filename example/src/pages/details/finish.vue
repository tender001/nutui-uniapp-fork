<template>
  <view class="register">
    <view class="register-title">完成任务</view>
    <nut-form ref="formRef" :model-value="form" custom-class="register-form nut-form-custom">

      <nut-form-item label="任务类型" prop="taskCategory" :rules="[{ required: true, message: '请选择任务类型' }]">
        <nut-cell custom-class="task-cell" :desc="form.taskCategoryRow?.text ? form.taskCategoryRow?.text : '请选择'"
          @click="changeSwitch('taskCategory', true)" is-link />

        <nut-popup v-model:visible="switchVisible.taskCategory" position="bottom">
          <nut-picker v-model="form.taskCategory" :columns="categoryList" title="请选择任务类型"
            @confirm="handleTaskCategoryChange" @cancel="changeSwitch('taskCategory', false)" />
        </nut-popup>
      </nut-form-item>
      <nut-form-item label="实际面积" prop="acreNum" :rules="[
      { required: true, message: '请输入实际面积' }
    ]">
        <nut-input v-model="form.acreNum" type="number" placeholder="请输入实际面积">
          <template #right>
            <div>亩</div>
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item label="总金额" prop="totalPrice" :rules="[
      { required: true, message: '请输入总金额' }
    ]">
        <nut-input v-model="form.totalPrice" type="number" placeholder="请输入总金额">
          <template #right>
            <div>元</div>
          </template>
        </nut-input>
      </nut-form-item>

      <!-- <nut-form-item label="是否挂账" prop="isCredit" :rules="[{ required: true, message: '请选择是否挂账' }]">
        <nut-switch v-model="form.isCredit"></nut-switch>
      </nut-form-item> -->
      <nut-form-item label="上传照片" prop="workPic" :rules="[{ required: true, message: '请上传照片' }]">
        <nut-uploader @success="(row) => handleUploader(row, 'workPic')" v-model:file-list="form.workPic"
          :url="uploadUrl" accept="image" maximum="3" multiple>
        </nut-uploader>
      </nut-form-item>
      <nut-form-item label="备注" prop="workRemark">
        <nut-textarea v-model="form.workRemark" />
      </nut-form-item>

      <nut-form-item>
        <nut-button custom-class="nut-form-btn" size="large" block type="primary" @click="onSubmit">确认</nut-button>
      </nut-form-item>

    </nut-form>

  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useAppStore } from '@/store'
import { useInit } from '@packages/hooks'
import { postFinishTask, getDetail } from '../../api/uav'
import { redirectTo, showToast, uploadUrl, } from '@/utils/index'
import type { FormInst } from 'nutui-uniapp'

const appStore = useAppStore()



// ====================== Components ======================
const formRef = ref<FormInst>()
const taskId = computed(() => getLocationParams('id'))
const form = reactive<Record<string, any>>({
  taskCategory: undefined,
  acreNum: undefined,
  /** 是否挂账 */
  isCredit: undefined,
  /** 作业照片 */
  workPic: undefined,
  totalPrice: undefined,
  /** 作业描述 */
  workRemark: undefined,
  /** 单据照片 */
  documentPic: undefined,

})
const switchVisible = reactive<Record<string, boolean>>({
  expectServiceTime: false,
  agreement: false,
  ask: false,
  pay: false
})
const { getLocationParams } = useInit()
const categoryList = computed(() => {
  return (appStore.enums.cate[0]?.categoryList || []).map(item => {
    return {
      ...item,
      text: item.name,
      value: item.id
    }
  })
})



const fetchData = async () => {
  const res = await getDetail({ taskId: taskId.value })
  if (res?.code === 0) {

    form.taskCategory = [res.data.taskCategory]
    form.acreNum = res.data.acreNum
    form.taskCategoryRow = categoryList.value.find(item => item.value === res.data.taskCategory)
    form.totalPrice = res.data.totalPrice

  }
}
onMounted(() => {
  fetchData()
})
const changeSwitch = (cellKey: string, isShow: boolean) => {
  switchVisible[cellKey] = isShow
}
const handleTaskCategoryChange = ({ selectedValue, selectedOptions }: any) => {
  form.taskCategory = selectedValue
  form.taskCategoryRow = selectedOptions[0]
  changeSwitch('taskCategory', false)
  onBlurValidate('taskCategory')
}



const onBlurValidate = (prop: string) => {
  formRef.value?.validate(prop)
}
const handleUploader = ({ data, fileItem }, fieldKey) => {
  const ossData = JSON.parse(data.data)
  setTimeout(() => {
    form[fieldKey] = form[fieldKey].map(item => {
      if (item.uid === fileItem.uid) {
        item.ossUrl = ossData.data
      }
      return item
    })
  }, 100);
}

const onSubmit = async (values: Record<string, any>) => {
  formRef.value?.validate().then(async ({ valid, errors }: any) => {
    if (!valid) return
    const res = await postFinishTask({
      ...form,
      id: getLocationParams('id'),
      workPic: form.workPic?.map(item => item.ossUrl).join(','),
      taskCategory: form.taskCategory[0],
      taskCategoryRow: undefined,
    })
    if (res?.code === 0) {
      formRef.value?.reset()
      showToast('提交成功')
      redirectTo(`/pages/details/index?id=${taskId.value}`)
      // redirectBack()
    }

  })
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

      .nut-cell {
        padding: 0;
      }
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
