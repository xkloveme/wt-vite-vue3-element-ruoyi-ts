<!--
 * @Description: admin 权限主页
-->
<template>
  <div class="dashboard-editor-container">
    <PanelGroup />

    <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>预警事项办理进度分析</span>
            </div>
          </template>
          <BarChart />
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>政治生态评估分布</span>
            </div>
          </template>
          <PieChart />
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin:32px 0;">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 24}"
        :xl="{span: 24}"
        style="margin-bottom:30px;"
      >
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>预警信息</span>
              <el-button
                class="button"
                type="text"
                size="medium"
                style="float: right;padding: 0;"
              >
                更多
                <i class="el-icon-arrow-right" />
              </el-button>
            </div>
          </template>
          <wt-table
            :columns="columns"
            api="online.list"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup.vue'
import PieChart from './components/PieChart.vue'
import BarChart from './components/BarChart.vue'
import {
  defineComponent,
  ref
} from 'vue'
export default defineComponent({
  components: {
    PanelGroup,
    PieChart,
    BarChart
  },

  setup() {
    const columns = ref([
      { type: 'index', align: 'center', label: '索引' },
      { prop: 'loginLocation', label: '位置' }
    ])

    return { columns }
  }
})
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>
