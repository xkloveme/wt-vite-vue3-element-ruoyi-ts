<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item
        label="参数名称"
        prop="configName"
      >
        <el-input
          v-model="queryParams.configName"
          placeholder="请输入参数名称"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="参数键名"
        prop="configKey"
      >
        <el-input
          v-model="queryParams.configKey"
          placeholder="请输入参数键名"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="系统内置"
        prop="configType"
      >
        <el-select
          v-model="queryParams.configType"
          placeholder="系统内置"
          clearable
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleQuery"
        >
          搜索
        </el-button>
        <el-button
          icon="el-icon-refresh"
          @click="resetQuery"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-row
      :gutter="10"
      class="mb8"
    >
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >
          新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          :disabled="single"
          @click="handleUpdate"
        >
          修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          :disabled="multiple"
          @click="handleDelete"
        >
          删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          @click="handleExport"
        >
          导出
        </el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-refresh"
          @click="handleClearCache"
        >
          清理缓存
        </el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      /> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="configList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="参数主键"
        align="center"
        prop="configId"
      />
      <el-table-column
        label="参数名称"
        align="center"
        prop="configName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="参数键名"
        align="center"
        prop="configKey"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="参数键值"
        align="center"
        prop="configValue"
      />
      <el-table-column
        label="系统内置"
        align="center"
        prop="configType"
        :formatter="typeFormat"
      />
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime( scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="500px"
      append-to-body
    >
      <el-form
        ref="formDialog"
        :model="formData"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="参数名称"
          prop="configName"
        >
          <el-input
            v-model="formData.configName"
            placeholder="请输入参数名称"
          />
        </el-form-item>
        <el-form-item
          label="参数键名"
          prop="configKey"
        >
          <el-input
            v-model="formData.configKey"
            placeholder="请输入参数键名"
          />
        </el-form-item>
        <el-form-item
          label="参数键值"
          prop="configValue"
        >
          <el-input
            v-model="formData.configValue"
            placeholder="请输入参数键值"
          />
        </el-form-item>
        <el-form-item
          label="系统内置"
          prop="configType"
        >
          <el-radio-group v-model="formData.configType">
            <el-radio
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >
              {{ dict.dictLabel }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remark"
        >
          <el-input
            v-model="formData.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button
            type="primary"
            @click="submitForm"
          >
            确 定
          </el-button>
          <el-button @click="open = false">
            取 消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
// import { listConfig, getConfig, delConfig, exportConfig, clearCache, getDicts } from '@/apis/system'
import {
  listConfig,
  getDicts,
  updateConfig,
  addConfig,
  getConfig,
  delConfig,
  exportConfig
} from '@/apis/system/system'
import { defineComponent, onMounted, reactive, toRefs, ref, unref } from 'vue'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { download, parseTime } from '@/utils/ruoyi'
import pagination from '@/components/pagination/Index.vue'

export default defineComponent({
  components: {
    pagination
  },
  setup() {
    const queryForm = ref(ElForm)
    const formDialog = ref(ElForm)
    const dataMap = reactive({
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 参数表格数据
      configList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      typeOptions: [],
      formData: {
        remark: '',
        configType: '',
        configValue: '',
        configKey: '',
        configName: '',
        configId: ''
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        configName: undefined,
        configKey: undefined,
        configType: undefined
      },
      // 表单参数
      // 表单校验
      rules: {
        configName: [
          { required: true, message: '参数名称不能为空', trigger: 'blur' }
        ],
        configKey: [
          { required: true, message: '参数键名不能为空', trigger: 'blur' }
        ],
        configValue: [
          { required: true, message: '参数键值不能为空', trigger: 'blur' }
        ]
      }
    })

    const getList = async (data?: any) => {
      dataMap.loading = true

      console.log(data)
      const result = await listConfig(data)
      if (result?.code === 200) {
        dataMap.configList = result?.rows
        dataMap.total = result?.total
        dataMap.loading = false
      }
    }

    /** 搜索按钮操作 */
    const handleQuery = () => {
      dataMap.queryParams.pageNum = 1
      getList(dataMap.queryParams)
    }
    const resetTable = () => {
      const form = unref(queryForm)
      form.resetFields()
      dataMap.formData = {
        remark: '',
        configType: '',
        configValue: '',
        configKey: '',
        configName: '',
        configId: ''
      }
    }
    const resetQuery = () => {
      resetTable()
      handleQuery()
    }

    /** 新增按钮操作 */
    const handleAdd = () => {
      resetTable()
      dataMap.open = true
      dataMap.title = '添加参数'
    }

    /** 提交按钮 */
    const submitForm = () => {
      const form = unref(formDialog)
      form.validate((valid: any) => {
        if (valid) {
          if (dataMap.formData.configId === '') {
            addConfig(dataMap.formData).then((res) => {
              res?.code === 200
                ? ElMessage.success('新增成功')
                : ElMessage.warning(res?.msg)
              dataMap.open = false
              getList()
            })
          } else {
            updateConfig(dataMap.formData).then((res) => {
              if (res?.code === 200) {
                ElMessage.success('修改成功')
                dataMap.open = false
                getList()
              } else {
                dataMap.open = false
                ElMessage.warning(res?.msg)
              }
            })
          }
        }
      })
    }

    /** 修改按钮操作 */
    const handleUpdate = (row: any) => {
      resetTable()
      const configId = row.configId || dataMap.ids
      dataMap.formData.configId = configId
      getConfig(configId).then((response) => {
        if (response?.code === 200) {
          dataMap.formData = response.data
          dataMap.open = true
          dataMap.title = '修改参数'
        }
      })
    }

    // 多选框选中数据
    const handleSelectionChange = (selection: any) => {
      dataMap.ids = selection.map((item: any) => item.configId)
      dataMap.single = selection.length !== 1
      dataMap.multiple = !selection.length
    }

    /** 删除按钮操作 */
    const handleDelete = (row: any) => {
      const configIds = row.configId || dataMap.ids
      ElMessageBox.confirm(
        '是否确认删除参数编号为"' + configIds + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          return delConfig(configIds)
        })
        .then((res) => {
          if (res?.code === 200) {
            getList()
            ElMessage.success('删除成功')
          } else {
            ElMessage.error(res?.msg)
          }
        })
    }

    /** 导出按钮操作 */
    const handleExport = () => {
      const queryParams = dataMap.queryParams
      ElMessageBox.confirm('是否确认导出所有参数数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return exportConfig(queryParams)
        })
        .then((response) => {
          download(response?.msg)
        })
    }
    onMounted(() => {
      getList()
      getDicts('sys_yes_no').then((response) => {
        dataMap.typeOptions = response?.data
      })
    })
    return {
      ...toRefs(dataMap),
      parseTime,
      handleExport,
      formDialog,
      getList,
      handleQuery,
      resetQuery,
      queryForm,
      handleAdd,
      submitForm,
      handleUpdate,
      handleSelectionChange,
      handleDelete
    }
  }
})
</script>
