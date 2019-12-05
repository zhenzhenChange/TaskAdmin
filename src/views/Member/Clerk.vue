<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" autofocus />
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
      <el-button @click="resetAllFilter">重置所有筛选</el-button>
    </el-card>
    <el-table ref="filterTable" :data="clerkData" stripe border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="clerk-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="余额">
              <span>{{ props.row.my_balance }}</span>
            </el-form-item>
            <el-form-item label="总提成">
              <span>{{ props.row.general_income }}</span>
            </el-form-item>
            <el-form-item label="当天提成">
              <span>{{ props.row.general_income }}</span>
            </el-form-item>
            <el-form-item label="总接单">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
            <el-form-item label="总成功订单">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
            <el-form-item label="当天接单">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
            <el-form-item label="当天成功订单">
              <span>{{ props.row.orderData.length }}</span>
            </el-form-item>
            <el-form-item label="下级总接订单">
              <span>{{ props.row.sonOrderData.length }}</span>
            </el-form-item>
            <el-form-item label="下级总成功订单">
              <span>{{ props.row.sonOrderData.length }}</span>
            </el-form-item>
            <el-form-item label="下级当天接订单">
              <span>{{ props.row.sonOrderData.length }}</span>
            </el-form-item>
            <el-form-item label="下级当天成功订单">
              <span>{{ props.row.sonOrderData.length }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="reg_datetime"
        label="注册日期"
        sortable
        width="180"
        column-key="reg_datetime"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.reg_datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="账号" width="180"></el-table-column>
      <el-table-column prop="is_valide" label="账号状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="openEditPwd(scope.row.phone)"
          >修改密码</el-button>
          <el-button
            size="mini"
            icon="el-icon-warning"
            type="danger"
            @click="openBan(scope.row.phone)"
          >禁止账号登录</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clerkData: [
        {
          phone: 18172641474,
          pwd: "18172641474",
          my_balance: 78.04,
          general_income: 100.5,
          reg_datetime: "2019-12-04",
          // 提成时间
          extension_code: "ABCDEF",
          is_valide: 1,
          orderData: [
            {
              order_id: 45641523498631,
              order_release_time: "2017-08-08",
              order_state: 1
            }
          ],
          sonOrderData: [
            {
              my_superior: "ABCDEF",
              extension_code: "HHHHHH",
              order_id: 45641523498631,
              order_release_time: "2017-08-08",
              order_state: 1
            }
          ]
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
      this.timeData = this.clerkData.map(item => {
        return {
          text: item.reg_datetime,
          value: item.reg_datetime
        };
      });
    },
    getClerkData() {
      // this.$http.get(`/api/admin/recv/get/${my_stratum}`);
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
    openEditPwd(phone) {
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
        inputType: "password"
      })
        .then(() => {
          // this.$http.post(`/api/admin/give/changePwd/${phone}`);
          this.$message({
            type: "success",
            message: `${phone} 密码修改成功！`
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作~",
            offset: 10
          });
        });
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
            message: `操作成功!${phone}`
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作~"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.clerk-table-expand {
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