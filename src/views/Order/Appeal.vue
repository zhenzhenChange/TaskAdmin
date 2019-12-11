<template>
  <div>
    <el-card class="card">
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
    </el-card>
    <el-table
      ref="filterTable"
      :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      border
    >
      <el-table-column
        prop="order_release_time"
        label="发布日期"
        align="center"
        sortable
        width="140"
        column-key="order_release_time"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.order_release_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结单时间" prop="order_end_datetime"></el-table-column>
      <el-table-column align="center" label="申诉时间" prop="action_datetime"></el-table-column>
      <el-table-column align="center" label="发布账号" prop="uid_give"></el-table-column>
      <el-table-column align="center" label="订单编号" prop="order_id"></el-table-column>
      <el-table-column align="center" label="订单价格" prop="order_price"></el-table-column>
      <el-table-column align="center" label="接单账号" prop="uid_recive"></el-table-column>
      <el-table-column align="center" label="申诉证据" prop="order_apply_proof"></el-table-column>
      <el-table-column
        prop="action_resState"
        label="申诉状态"
        align="center"
        width="120"
        :filters="stateData"
        :filter-method="filterHandler"
        filter-placement="bottom-end"
      >
        <template v-slot="scope">
          <el-tag hit :type="stateType(scope.row.action_resState)">{{scope.row.action_resState}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template v-slot="scope">
          <el-button
            size="mini"
            icon="el-icon-error"
            type="danger"
            @click="openDeleteRecord(scope.row.order_id)"
          >删除该记录</el-button>
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
      data: [
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
      stateData: [{ text: "", value: "" }],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 300, 400]
    };
  },
  created() {
    this.getData();
    this.getFiltersData();
  },
  methods: {
    stateType(type) {
      return type === "成功" ? "success" : "primary";
    },
    getFiltersData() {
      let timeHash = {};
      let stateHash = {};
      this.timeData = this.data
        .map(item => {
          return {
            text: item.order_release_time,
            value: item.order_release_time
          };
        })
        .reduce((arr, current) => {
          timeHash[current.text]
            ? ""
            : (timeHash[current.text] = true && arr.push(current));
          return arr;
        }, []);
      this.stateData = this.data
        .map(item => {
          return {
            text: item.action_resState,
            value: item.action_resState
          };
        })
        .reduce((arr, current) => {
          stateHash[current.text]
            ? ""
            : (stateHash[current.text] = true && arr.push(current));
          return arr;
        }, []);
    },
    async getData() {
      const data = {
        order_state: "申诉"
      };
      const res = await this.$http.get(`/man/get/${data}`);
      this.data = res.data;
    },
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    currentChange(val) {
      this.currentPage = val;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("order_release_time");
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    openDeleteRecord(id) {
      this.$confirm("确定要删除此记录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.post(`/man/delOrderRec/${id}`);
          this.$message({
            type: "success",
            message: `${res} 删除成功!`,
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