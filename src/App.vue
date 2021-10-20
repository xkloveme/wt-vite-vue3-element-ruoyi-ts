<!--
 * @Description:
 * @Autor: xkloveme
 * @Date: 2020-12-07 10:30:20
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-10-15 17:44:38
-->
<template>
  <el-scrollbar>
    <router-view />
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
<style lang="scss">
.pagination-container .el-pagination {
  right: 25px;
  position: absolute;
}
</style>
