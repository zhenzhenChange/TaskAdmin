<template>
  <div>
    <el-card class="card">
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
    </el-card>
    <el-table ref="filterTable" :data="wasteBookData" stripe border>
      <el-table-column
        prop="wb_datetime"
        label="提现日期"
        align="center"
        width="140"
        column-key="wb_datetime"
        :filters="timeData"
        :filter-method="filterHandler"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.wb_datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="140" prop="wb_uid" label="提现账号"></el-table-column>
      <el-table-column align="center" width="140" prop="Alipay_account" label="支付宝账号"></el-table-column>
      <el-table-column align="center" width="140" prop="Alipay_name" label="支付宝姓名"></el-table-column>
      <el-table-column align="center" width="140" prop="wb_fee" label="提现金额"></el-table-column>
      <el-table-column align="center" width="140" prop="wb_state" label="提现状态"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            icon="el-icon-success"
            type="primary"
            @click="openAgreed(scope.row.wb_id)"
          >同意申请</el-button>
          <el-button
            size="medium"
            icon="el-icon-error"
            type="danger"
            @click="openRejected(scope.row.wb_id)"
          >驳回申请</el-button>
          <el-button
            size="medium"
            icon="el-icon-warning"
            type="danger"
            @click="openDeleteRecord(scope.row.wb_id)"
          >删除该条记录</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wasteBookData: [
        {
          wb_id: "流水号",
          wb_fee: "提现金额",
          wb_uid: "提现账号",
          Alipay_account: "支付宝账号",
          Alipay_name: "支付宝姓名",
          wb_state: "提现状态",
          wb_datetime: "提现日期"
        }
      ],
      timeData: [{ text: "", value: "" }]
    };
  },
  created() {
    this.getFiltersData();
  },
  methods: {
    getFiltersData() {
      this.timeData = this.wasteBookData.map(item => {
        return {
          text: item.reg_datetime,
          value: item.reg_datetime
        };
      });
    },
    getPartData() {
      // this.$http.get(`/api/admin/give/get/${my_stratum}`);
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("reg_datetime");
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    openAgreed(id) {
      this.$confirm("确定同意提现申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          // this.$http.post(`/api/admin/disableAccount/${phone}`);
          this.$message({
            type: "success",
            message: "操作成功!" + id,
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
        .then(() => {
          // this.$http.post(`/api/admin/disableAccount/${phone}`);
          this.$message({
            type: "success",
            message: "操作成功!" + id,
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
        .then(() => {
          // this.$http.post(`/api/admin/disableAccount/${phone}`);
          this.$message({
            type: "success",
            message: "操作成功!" + id,
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