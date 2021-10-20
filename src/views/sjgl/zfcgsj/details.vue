<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        {{ item.label }}
        {{ item.name }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup() {
    const dataMap = reactive({
      activeName: 'cgsq',
      tabs: [
        {
          label: '采购申请',
          name: 'cgsq'
        },
        {
          label: '公示公告',
          name: 'gsgg'
        },
        {
          label: '招标信息',
          name: 'zbxx'
        },
        {
          label: '合同详情',
          name: 'htxq'
        }
      ]
    })

    const handleClick = (tab: string, event: any) => {
      console.log(tab, event)
    }

    return {
      ...toRefs(dataMap),
      handleClick
    }
  }
})
</script>

<style scoped>
</style>
