<!--
 * @Description: 首页饼图组件
-->
<template>
  <div
    id="homePieCharts"
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
  nextTick
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

    const initChart = () => {
      const pieChart = init(
        document.getElementById('homePieCharts') as HTMLDivElement,
        'macarons'
      )
      pieChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#E86B59', '#6ADBAE', '#6293F9 ', '#F7C32C'],
        legend: {
          left: 'right',
          bottom: 'center',
          orient: 'vertical',
          data: [
            {
              name: '警告',
              icon: 'roundRect'
            },
            {
              name: '点赞',
              icon: 'roundRect'
            },
            {
              name: '肯定',
              icon: 'roundRect'
            },
            {
              name: '预警',
              icon: 'roundRect'
            }
          ]
        },
        series: [
          {
            name: '政治生态评估分布',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 100],
            center: ['50%', '50%'],
            data: [
              { value: 320, name: '警告' },
              { value: 240, name: '点赞' },
              { value: 149, name: '肯定' },
              { value: 100, name: '预警' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      } as EChartsOption)
      chart.value = pieChart
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

    return {}
  }
})
</script>
