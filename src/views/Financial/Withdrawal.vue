<template>
  <div>
    <el-card class="card">
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
      <el-button @click="resetAllFilter">重置所有筛选</el-button>
    </el-card>
    <el-table ref="filterTable" :data="wasteBookData" stripe border>
      <el-table-column
        prop="wb_datetime"
        label="流水日期"
        sortable
        width="180"
        column-key="wb_datetime"
        :filters="filtersData"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.wb_datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="wb_uid" label="交易账号" width="180"></el-table-column>
      <el-table-column prop="wb_type" label="交易类型" width="180"></el-table-column>
      <el-table-column prop="wb_fee" label="交易费用" width="180"></el-table-column>
      <el-table-column prop="wb_state" label="交易状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-thumb"
            type="primary"
            @click="openBan(scope.row.phone)"
          >通过</el-button>
          <el-button
            size="mini"
            icon="el-icon-thumb"
            type="primary"
            @click="openBan(scope.row.phone)"
          >驳回</el-button>
          <el-button
            size="mini"
            icon="el-icon-warning"
            type="danger"
            @click="openBan(scope.row.phone)"
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
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        }
      ],
      filtersData: [{ text: "", value: "" }]
    };
  },
  created() {
    this.getFiltersData();
  },
  methods: {
    getFiltersData() {
      this.filtersData = this.wasteBookData.map(item => {
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
    resetAllFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    openBan(phone) {
      this.$confirm("确定要禁止该账号登录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$http.post(`/api/admin/disableAccount/${phone}`);
          this.$message({
            type: "success",
            message: "操作成功!" + phone
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
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