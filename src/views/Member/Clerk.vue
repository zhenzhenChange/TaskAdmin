<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" autofocus />
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
    </el-card>
    <el-table ref="filterTable" :data="clerkData" stripe border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="clerk-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.user_remark }}</span>
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
        align="center"
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
      <el-table-column align="center" prop="phone" label="账号"></el-table-column>
      <el-table-column align="center" prop="my_balance" label="余额"></el-table-column>
      <el-table-column align="center" prop="general_income" label="总提成"></el-table-column>
      <el-table-column align="center" prop="my_balance" label="总接单"></el-table-column>
      <el-table-column align="center" prop="orderData.length" label="总成功"></el-table-column>
      <el-table-column align="center" prop="extension_code" label="推广码"></el-table-column>
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
      /**
       * /api/admin/recv/get/
       */
      clerkData: [
        {
          phone: "手机号",
          pwd: "密码",
          my_balance: "余额",
          general_income: "总提成",
          reg_datetime: "注册时间",
          user_remark: "备注",
          extension_code: "推广码",
          is_valide: "账号是否可用",
          incomeData: [
            // 流水数据
            {
              wb_id: "流水编号",
              wb_uid: "流水账号",
              wb_datetime: "流水时间"
            }
          ],
          orderData: [
            //自身订单数据
            {
              order_id: "订单编号",
              order_release_time: "生成日期",
              order_state: "订单状态"
            }
          ],
          sonOrderData: [
            //下级订单数据
            {
              my_superior: "上级推广码",
              extension_code: "自身推广码",
              order_id: "订单编号",
              order_release_time: "生成日期",
              order_state: "订单状态"
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
      // this.$http.get(`/api/admin/recv/get/`);
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
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        type: "info",
        inputType: "password"
      })
        .then(({ value }) => {
          // this.$http.post(`/api/admin/give/changePwd/${phone}`);
          this.$message({
            type: "success",
            message: `${phone + value}  密码修改成功！`,
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
            message: `禁止成功!${phone}`,
            offset: 10
          });
        })
        .catch(() => {});
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