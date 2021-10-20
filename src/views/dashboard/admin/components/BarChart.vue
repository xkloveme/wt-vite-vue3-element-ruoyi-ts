<!--
 * @Description: 首页柱形图小组件
-->

<template>
  <wt-form
    :formConfig="formConfig"
    :value="formData"
  />

  <div
    id="homebarcharts"
    :class="className"
    :style="{height: height, width: width}"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  nextTick,
  ref,
  reactive,
  toRefs
} from 'vue'
import resize from '@/components/charts/mixins/resize'
import { init, EChartsOption } from 'echarts'
export default defineComponent({
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%',
      required: true
    },
    height: {
      type: String,
      default: '300px',
      required: true
    }
  },
  setup() {
    const { mounted, chart, beforeDestroy, activated, deactivated } = resize()

    const animationDuration = 6000
    const initChart = () => {
      const barChart = init(
        document.getElementById('homebarcharts') as HTMLDivElement,
        'macarons'
      )
      barChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['初审', '审核', '批示', '办理', '复核'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            stack: 'vistors',
            barWidth: '40%',
            data: [79, 52, 200, 334, 390],
            animationDuration,
            itemStyle: {
              normal: {
                color: (params: any) => {
                  const colorList = [
                    '#E86B59',
                    '#F7C32C',
                    '#6ADBAE',
                    '#6293F9',
                    '#FD871A'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      } as EChartsOption)
      chart.value = barChart
    }

    onMounted(() => {
      mounted()
      nextTick(() => {
        initChart()
      })
    })

    onBeforeUnmount(() => {
      if (!chart.value) {
        return
      }
      chart.value.dispose()
      chart.value = null
      beforeDestroy()
    })

    onActivated(() => {
      activated()
    })

    onDeactivated(() => {
      deactivated()
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
            type: 'select',
            prop: 'visible',
            label: '',
            placeholder: '请选择日期',
            optList: [
              { dictLabel: '近七天', dictValue: '近七天' },
              { dictLabel: '近一个月', dictValue: '近一个月' },
              { dictLabel: '近一个月', dictValue: '近一个月' },
              { dictLabel: '近三个月', dictValue: '近三个月' },
              { dictLabel: '近半年', dictValue: '近半年' },
              { dictLabel: '近一年', dictValue: '近一年' },
              { dictLabel: '全部', dictValue: '全部' }
            ]
          },
          {
            type: 'date-picker',
            dataType: 'monthrange',
            prop: 'apply',
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY/MM/DD',
            label: '',
            bindDatePicker: {
              'start-placeholder': '开始日期',
              'end-placeholder': '截止日期'
            }
          }
        ]
      }
    })

    return {
      formData,
      ...toRefs(wtForm)
    }
  }
})
</script>
