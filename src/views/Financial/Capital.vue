<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" autofocus />
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
    </el-card>
    <el-table ref="filterTable" :data="wasteBookData" stripe border>
      <el-table-column
        prop="wb_datetime"
        label="流水日期"
        sortable
        align="center"
        width="140"
        column-key="wb_datetime"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.wb_datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="wb_uid" label="交易账号" width="140"></el-table-column>
      <el-table-column align="center" prop="Alipay_account" label="支付宝账号" width="140"></el-table-column>
      <el-table-column align="center" prop="Alipay_name" label="支付宝姓名" width="140"></el-table-column>
      <el-table-column align="center" prop="wb_type" label="交易类型" width="140"></el-table-column>
      <el-table-column align="center" prop="wb_fee" label="交易费用" width="140"></el-table-column>
      <el-table-column align="center" prop="wb_state" label="交易状态" width="140"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            icon="el-icon-edit"
            type="primary"
            @click="openEditAlipayAccount(scope.row.wb_uid)"
          >修改支付宝账号</el-button>
          <el-button
            size="medium"
            icon="el-icon-warning"
            type="danger"
            @click="openDeleteRecord(scope.row.wb_id)"
          >删除该记录</el-button>
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
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "支付宝账号",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
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
    openEditAlipayAccount(uid) {
      this.$prompt("请输入新的支付宝账号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(({ value }) => {
          // this.$http.post(`/api/admin/give/changePwd/${phone}`);
          this.$message({
            type: "success",
            message: uid + value,
            offset: 10
          });
        })
        .catch(() => {});
    },
    openDeleteRecord(id) {
      this.$confirm("确定要删除该条记录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$http.post(`/api/admin/disableAccount/${id}`);
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