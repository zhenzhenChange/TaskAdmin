<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" autofocus />
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
    </el-card>
    <el-table ref="filterTable" :data="partData" stripe border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="part-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.user_remark }}</span>
            </el-form-item>
            <el-form-item label="总充值">
              <span>{{ props.row.wb_fee }}</span>
            </el-form-item>
            <el-form-item label="当天充值">
              <span>{{ props.row.wb_fee }}</span>
            </el-form-item>
            <el-form-item label="总下订单">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
            <el-form-item label="总成功订单">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
            <el-form-item label="当天下订单">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
            <el-form-item label="当天成功订单">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
            <el-form-item label="余额">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
            <el-form-item label="账号状态">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="reg_datetime"
        label="注册日期"
        sortable
        width="150"
        column-key="reg_datetime"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.reg_datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="phone" label="账号" width="140"></el-table-column>
      <el-table-column align="center" prop="my_balance" label="余额" width="100"></el-table-column>
      <el-table-column align="center" prop="wb_fee" label="总充值" width="100"></el-table-column>
      <el-table-column align="center" prop="my_balance" label="总下订单" width="100"></el-table-column>
      <el-table-column align="center" prop="my_balance" label="总成功订单" width="100"></el-table-column>
      <el-table-column align="center" prop="is_valide" label="账号状态" width="100"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            icon="el-icon-edit"
            type="primary"
            @click="openEditPrice(scope.row.phone)"
          >修改微信下单价格</el-button>
          <el-button
            size="medium"
            icon="el-icon-edit"
            type="primary"
            @click="openEditPwd(scope.row.phone)"
          >修改密码</el-button>
          <el-button
            size="medium"
            icon="el-icon-warning"
            type="danger"
            @click="openBan(scope.row.phone)"
          >禁止账号登录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      class="mt-20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partData: [
        {
          phone: 18278459466,
          pwd: "18278459466",
          my_balance: 78.04,
          wb_fee: 1304.5,
          user_remark: "beizhu",
          wb_datetime: "2019-12-04",
          reg_datetime: "2019-12-04",
          is_valide: 1,
          orderData: [
            {
              order_id: 45641523498631,
              order_price: 100,
              order_release_time: "2017-08-08",
              order_state: 1
            }
          ]
        }
      ],
      timeData: [{ text: "", value: "" }],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  created() {
    this.getFiltersData();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    getFiltersData() {
      this.timeData = this.partData.map(item => {
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
    openEditPrice(phone) {
      this.$prompt("请重新输入价格", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(({ value }) => {
          // this.$http.post(`/api/admin/give/modPrice/${phone}`);
          this.$message({
            type: "success",
            message: "您修改的价格为: " + phone + value,
            offset: 10
          });
        })
        .catch(() => {});
    },
    openEditPwd(phone) {
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
        inputType: "password"
      })
        .then(({ value }) => {
          // this.$http.post(`/api/admin/give/changePwd/${phone}`);
          this.$message({
            type: "success",
            message: phone + value,
            offset: 10
          });
        })
        .catch(() => {});
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
            message: "禁止成功!" + phone,
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