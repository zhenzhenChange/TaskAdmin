<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" autofocus />
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
      <el-button @click="openEditDefaultIncome" icon="el-icon-edit" type="primary">总代提成默认设置</el-button>
    </el-card>
    <el-table ref="filterTable" :data="AgentData" stripe border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="agent-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="当天提成">
              <span>{{ props.row.general_income }}</span>
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
        align="center"
        column-key="reg_datetime"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.reg_datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="phone" label="账号"></el-table-column>
      <el-table-column align="center" prop="extension_code" label="推广码"></el-table-column>
      <el-table-column align="center" prop="my_balance" label="余额"></el-table-column>
      <el-table-column align="center" prop="user_remark" label="备注"></el-table-column>
      <el-table-column align="center" prop="general_income" label="总提成"></el-table-column>
      <el-table-column align="center" prop="orderData.length" label="总领取订单"></el-table-column>
      <el-table-column align="center" prop="orderData.length" label="总成功订单"></el-table-column>
      <el-table-column align="center" prop="is_valide" label="账号状态"></el-table-column>
      <el-table-column align="center" label="操作" width="450">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="openEditPwd(scope.row.phone)"
          >修改密码</el-button>
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="openEditIncome(scope.row.phone)"
          >修改总代提成</el-button>
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
      AgentData: [
        {
          phone: 18172641474,
          pwd: "18172641474",
          my_balance: 78.04,
          user_remark: "备注",
          general_income: 100.5,
          reg_datetime: "2019-12-04",
          wb_datetime: "提成时间",
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
      this.timeData = this.AgentData.map(item => {
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
            message: "操作成功!" + phone,
            offset: 10
          });
        })
        .catch(() => {});
    },
    openEditIncome(phone) {
      this.$prompt("请重新设置提成", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
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
    openEditDefaultIncome() {
      this.$prompt("请设置默认提成", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(({ value }) => {
          // this.$http.post(`/api/admin/give/changePwd/${phone}`);
          this.$message({
            type: "success",
            message: value,
            offset: 10
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.agent-table-expand {
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