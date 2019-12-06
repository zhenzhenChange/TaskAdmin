<template>
  <div>
    <el-card class="card">
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
    </el-card>
    <el-table ref="filterTable" :data="appealOrderData" stripe border>
      <el-table-column
        prop="order_release_time"
        label="发布日期"
        sortable
        width="180"
        column-key="order_release_time"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.order_release_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结单时间" prop="order_end_datetime"></el-table-column>
      <el-table-column label="申诉时间" prop="order_end_datetime"></el-table-column>
      <el-table-column label="发布账号" prop="uid_give"></el-table-column>
      <el-table-column label="订单编号" prop="order_id"></el-table-column>
      <el-table-column label="订单价格" prop="order_price"></el-table-column>
      <el-table-column label="接单账号" prop="uid_recive"></el-table-column>
      <el-table-column label="申诉证据" prop="order_type"></el-table-column>
      <el-table-column label="申诉状态" prop="action_resState"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-warning"
            type="danger"
            @click="deleteRecord(scope.row.order_id)"
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
      /**
       * 仅查申诉的订单
       * 参数：action_resState === 申诉
       * /api/admin/man/get/${action_resState}
       */
      appealOrderData: [
        {
          order_id: "订单编号",
          uid_give: "发布账号",
          order_release_time: "发布日期",
          order_price: "订单价格",
          uid_recive: "接单账号",
          order_end_datetime: "失败时间",
          order_state: "订单状态（申诉）",
          action_datetime: "申诉时间",
          action_resState: "申诉状态",
          order_apply_proof: "申诉证据"
        }
      ],
      timeData: [{ text: "", value: "" }],
      stateData: [{ text: "", value: "" }]
    };
  },
  created() {
    this.getFiltersData();
  },
  methods: {
    getFiltersData() {
      this.timeData = this.appealOrderData.map(item => {
        return {
          text: item.order_release_time,
          value: item.order_release_time
        };
      });
      this.stateData = this.appealOrderData.map(item => {
        return {
          text: item.order_state,
          value: item.order_state
        };
      });
    },
    getAppealOrderData() {
      // this.$http.get(`/api/admin/man/get`);
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("order_release_time");
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    deleteRecord(order_id) {
      this.$confirm("确定要删除此记录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$http.post(`/api/admin/disableAccount/${phone}`);
          this.$message({
            type: "success",
            message: `${order_id} 删除成功!`,
            offset: 10
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
            offset: 10
          });
        });
    }
  }
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