<template>
  <div>
    <el-card class="card">
      <el-date-picker
        size="medium"
        type="datetimerange"
        v-model="value"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="filterDate"
        class="ml-20"
      ></el-date-picker>
    </el-card>
    <el-table
      ref="filterTable"
      :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      border
    >
      <el-table-column
        prop="wb_datetime"
        label="提现日期"
        align="center"
        width="180"
        column-key="wb_datetime"
        sortable
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.wb_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="wb_id" label="流水编号"></el-table-column>
      <el-table-column align="center" prop="wb_uid" label="提现账号"></el-table-column>
      <el-table-column align="center" prop="Alipay_account" label="支付宝账号"></el-table-column>
      <el-table-column align="center" prop="Alipay_name" label="支付宝姓名"></el-table-column>
      <el-table-column align="center" prop="wb_fee" label="提现金额"></el-table-column>
      <el-table-column align="center" prop="wb_state" label="提现状态"></el-table-column>
      <el-table-column align="center" label="操作" width="450">
        <template v-slot="scope">
          <el-button
            size="mini"
            icon="el-icon-success"
            type="primary"
            @click="openAgreed(scope.row.wb_id)"
          >同意申请</el-button>
          <el-button
            size="mini"
            icon="el-icon-warning"
            type="warning"
            @click="openRejected(scope.row.wb_id)"
          >驳回申请</el-button>
          <el-button
            size="mini"
            icon="el-icon-error"
            type="danger"
            @click="openDeleteRecord(scope.row.wb_id)"
          >删除该条记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page="currentPage"
      :total="data.length"
      layout="total, sizes, prev, pager, next, jumper"
      class="mt-20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      foreverData: [],
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
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`/finac/get`);
      res.data.data.map(item => {
        if (item.wb_type === 1) {
          this.data.push(item);
        }
      });
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
          new Date(dataTable.wb_datetime) >= new Date(start) &&
          new Date(dataTable.wb_datetime) <= new Date(end)
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
    openAgreed(id) {
      this.$confirm("确定同意提现申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async () => {
          const res = await this.$http.post(`/finac/doWithdraw`, {
            wb_id: id,
            wb_state: 1
          });
          this.$message({
            type: "success",
            message: "操作成功!" + res,
            offset: 10
          });
        })
        .catch(() => {});
    },
    openRejected(id) {
      this.$confirm("确定驳回提现申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async () => {
          const res = await this.$http.post(`/finac/doWithdraw`, {
            wb_id: id,
            wb_state: 0
          });
          this.$message({
            type: "success",
            message: "操作成功!" + res,
            offset: 10
          });
        })
        .catch(() => {});
    },
    openDeleteRecord(id) {
      this.$confirm("确定删除该条记录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.post(`/finac/delWbRec`, {
            wb_id: id
          });
          this.$message({
            type: "success",
            message: "操作成功!" + res,
            offset: 10
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.part-table-expand {
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