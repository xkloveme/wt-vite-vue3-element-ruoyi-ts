<!--
 * @Description:
 * @Author: xkloveme
 * @Date: 2020-12-24 10:35:47
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-10-15 18:24:11
-->
<template>
  <div :class="{'has-logo': showLogo}">
    <SidebarLogo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="!isCollapse"
        :unique-opened="true"
        :default-active="activeMenu"
        :active-text-color="menuActiveTextColor"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import variables from '@/styles/element-variables.scss'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    SidebarItem,
    SidebarLogo
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const routes = computed(() => {
      return store.state.permission.routes
    })
    const showLogo = computed(() => {
      return store.state.settings.showSidebarLogo
    })

    const menuActiveTextColor = computed(() => {
      if (store.state.settings.sidebarTextTheme) {
        return store.state.settings.theme
      } else {
        return variables.menuActiveText
      }
    })

    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return path
    })

    const isCollapse = computed(() => {
      return sidebar.value.opened
    })

    return {
      sidebar,
      routes,
      showLogo,
      menuActiveTextColor,
      variables,
      activeMenu,
      isCollapse
    }
  }
})
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  background: #fff;
  border-right: 1px solid #d8dce5;
  box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;

    .el-submenu__title:hover,
    .el-menu-item:hover,
    .el-menu-item.is-active {
      outline: 0;
      color: #fff !important;
      background: #435ebe;
    }
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 100px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
