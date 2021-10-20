<template>
  <div class="app-container">
    <wt-form
      :formConfig="formConfig"
      :value="formData"
      @submit="resetQuery"
      @reset="resetQuery"
    >
      <template #amount>
        <el-input
          v-model.number="formData.amount"
          placeholder="请输入数量"
        />
      </template>
    </wt-form>

    <wt-table
      :columns="[{type: 'index', align: 'center', label: '索引'},{prop: 'loginLocation', label: '位置'}]"
      :params="formData"
      api="online.list"
    />
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import {
  computed,
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  toRefs
} from 'vue'
export default defineComponent({
  setup() {
    const store = useStore()
    const currentRole = ref('admin-dashboard')
    const roles = computed(() => {
      return store.state.user.roles
    })
    onBeforeMount(() => {
      if (!roles.value.includes('admin')) {
        currentRole.value = 'editor-dashboard'
      }
    })

    const formData = ref({
      applyBeginTime: '',
      applyEndTime: '',
      visible: '',
      status: '',
      password: '',
      age: 22,
      remark: '',
      amount: 1
    })

    const wtForm = reactive({
      formConfig: {
        formItemList: [
          {
            type: 'date-picker',
            dataType: 'monthrange',
            prop: 'apply',
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY/MM/DD',
            label: '统计日期',
            placeholder: '统计日期'
          },
          {
            type: 'select',
            prop: 'visible',
            label: '显示状态',
            placeholder: '选择显示状态',
            optList: [{ dictLabel: '静态选项', dictValue: '1' }]
          },
          {
            type: 'select',
            prop: 'status',
            label: '部门状态',
            placeholder: '选择部门状态',
            optList: [],
            DictKey: 'SYS_NORMAL_DISABLE'
          },
          {
            type: 'text',
            prop: 'password',
            label: '密码',
            placeholder: '请输入密码',
            bindItem: {},
            bindInput: {
              'prefix-icon': 'el-icon-search',
              'show-password': true,
              disabled: false
            }
          },
          {
            type: 'text',
            prop: 'age',
            label: '年龄行内校验',
            placeholder: '请输入年龄',
            bindItem: {
              class: 'el-item-lh',
              rules: [
                { required: true, message: '年龄不能为空' },
                { type: 'number', message: '年龄必须为数字值' }
              ]
            }
          },
          {
            type: 'textarea',
            prop: 'remark',
            label: '备注',
            placeholder: '请输入备注',
            bindInput: {}
          },
          {
            type: 'slot',
            slotName: 'amount',
            prop: 'amount',
            label: '数量'
          }
        ],
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          status: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          amount: [
            { required: true, message: '数量不能为空' },
            { type: 'number', message: '数量必须为数字值' }
          ]
        },
        operate: true
      }
    })

    const resetQuery = () => {
      console.log('resetQuery')
    }

    return {
      currentRole,
      ...toRefs(wtForm),
      formData,
      resetQuery
    }
  }
})
</script>
