<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <el-col
      v-for="item in panelItems"
      :key="item.label"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div class="card-panel">
        <div class="clearfix">
          <div
            class="card-panel-icon-wrapper"
            :class="item.className"
          >
            <span>{{ item.label }}</span>
          </div>
          <div class="card-panel-description">
            <CountTo
              :start-val="0"
              :end-val="item.val"
              :duration="3000"
              class="card-panel-num"
            />
          </div>
        </div>
        <ul class="card-panel-items">
          <li>
            <p>原始状态</p>
            <h6>{{ item.status[0] }}</h6>
          </li>
          <li>
            <p>当前状态</p>
            <h6>{{ item.status[1] }}</h6>
          </li>
          <li>
            <p>已完成</p>
            <h6>{{ item.status[2] }}</h6>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CountTo } from 'vue3-count-to'

export default defineComponent({
  components: {
    CountTo
  },
  setup() {
    const panelItems = ref([
      {
        label: '正常（绿灯）',
        val: 123123,
        status: [10, 20, 30],
        className: 'icon-green'
      },
      {
        label: '异常（黄灯）',
        val: 999999,
        status: [40, 50, 60],
        className: 'icon-yellow'
      },
      {
        label: '紧急（橙灯）',
        val: 123,
        status: [30, 30, 30],
        className: 'icon-origin'
      },
      {
        label: '严重（红灯）',
        val: 123,
        status: [30, 30, 30],
        className: 'icon-red'
      }
    ])

    return {
      panelItems
    }
  }
})
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    font-size: 14px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;

    .icon-green {
      color: $green;
    }

    .icon-yellow {
      color: $yellow;
    }

    .icon-origin {
      color: $origin;
    }

    .icon-red {
      color: $red;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 20px 0 0 14px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 14px 14px 0 0;

      .card-panel-num {
        font-size: 20px;
      }
    }

    .card-panel-items {
      display: flex;
      padding: 0;
      margin: 18px 0 0;
      list-style: none;
      li {
        flex: 1;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        line-height: 16px;
        color: #2f3033;
        text-align: center;
        p {
          margin: 0;
          padding: 0;
        }
        h6 {
          margin: 6px 0 0;
          padding: 0;
        }
      }
    }
  }
}
</style>
