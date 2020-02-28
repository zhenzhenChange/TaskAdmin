<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-date-picker
        class="mr-20"
        size="medium"
        align="center"
        unlink-panels
        v-model="value"
        @change="filterDate"
        type="datetimerange"
        range-separator="至"
        end-placeholder="结束日期"
        start-placeholder="开始日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </el-card>
    <el-table
      stripe
      border
      ref="filterTable"
      v-if="searchData"
      :data="searchData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="order-table-expand">
            <el-form-item label="订单编号">
              <span>{{ props.row.order_id }}</span>
            </el-form-item>
            <el-form-item label="有效时间">
              <span>{{ props.row.order_effectPeriod }} 分钟</span>
            </el-form-item>
            <el-form-item label="订单类型">
              <span>{{ props.row.order_type }}</span>
            </el-form-item>
            <el-form-item label="订单备注">
              <span>{{ props.row.order_remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        width="180"
        align="center"
        label="发布日期"
        prop="order_release_time"
        column-key="order_release_time"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.order_release_time | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布账号" prop="uid_give"></el-table-column>
      <el-table-column
        width="180"
        align="center"
        label="订单编号"
        prop="order_id"
      ></el-table-column>
      <el-table-column align="center" label="订单标题" prop="order_title"></el-table-column>
      <el-table-column align="center" label="订单价格">
        <template v-slot="scope">
          <span class="ml-10">{{ scope.row.order_price / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="接单账号" prop="uid_recive"></el-table-column>
      <el-table-column align="center" label="接单时间" width="180">
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.action_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结单时间" width="180">
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.action_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="140"
        align="center"
        label="订单状态"
        prop="order_state"
        filter-placement="bottom-end"
      >
        <template v-slot="scope">
          <el-tag hit :type="stateType(scope.row.order_state)">
            {{
              scope.row.order_state === 1
                ? "未领取"
                : scope.row.order_state === 2
                ? "进行中"
                : scope.row.order_state === 3
                ? "已过期"
                : scope.row.order_state === 4
                ? "已放弃"
                : scope.row.order_state === 5
                ? "未完成"
                : scope.row.order_state === 6
                ? "用户确认完成"
                : scope.row.order_state === 7
                ? "用户确认未完成"
                : scope.row.order_state === 8
                ? "放单端确认完成"
                : "放单端确认未完成"
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="平台利润">
        <template v-slot="scope">
          <span class="ml-10">{{ scope.row.son_pumpRation * 100 }}%</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="150">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-error"
            @click="deleteRecord(scope.row.order_id)"
          >
            删除该记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-20 mb-20"
      :total="data.length"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      @size-change="sizeChange"
      :current-page="currentPage"
      @current-change="currentChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      foreverData: [],
      search: "",
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 300, 400],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value: "",
    };
  },
  created() {
    this.getData();
  },
  computed: {
    searchData() {
      if (this.search) {
        return this.data.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).includes(this.search);
          });
        });
      }
      return this.data;
    },
    orderState(state) {
      return state;
    },
  },
  methods: {
    stateType(type) {
      return type === 1
        ? "info"
        : type === 2
        ? ""
        : type === 3
        ? "warning"
        : type === 4
        ? "warning"
        : type === 5
        ? "danger"
        : type === 6
        ? "success"
        : type === 7
        ? "danger"
        : type === 8
        ? "success"
        : "danger";
    },
    async getData() {
      const res = await this.$http.get(`/admin/man/get`);
      this.data = res.data.data;
      this.foreverData = res.data.data;
    },
    filterDate(value) {
      if (!value) {
        this.data = this.foreverData;
        return;
      }
      this.data = this.foreverData;
      const start = value[0];
      const end = value[1];
      const dataTable = this.data.filter(dataTable => {
        return (
          new Date(dataTable.order_release_time) >= new Date(start) &&
          new Date(dataTable.order_release_time) <= new Date(end)
        );
      });
      this.data = dataTable;
    },
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    currentChange(val) {
      this.currentPage = val;
    },
    deleteRecord(id) {
      this.$confirm("确定要删除该条记录吗？", "警告", { type: "warning" })
        .then(async () => {
          const res = await this.$http.post(`/admin/man/delOrderRec`, { order_id: id });
          if (res.status === 200 && JSON.parse(res.data.statusCode)) {
            this.$message.success({ message: "删除成功!" });
            this.getData();
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.order-table-expand {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
