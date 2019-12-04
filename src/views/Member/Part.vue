<template>
  <div>
    <el-card class="part-card">
      <el-input size="medium" placeholder="输入关键字搜索" autofocus />
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
      <el-button @click="resetAllFilter">重置所有筛选</el-button>
    </el-card>
    <el-table ref="filterTable" :data="partData" stripe border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="part-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="余额">
              <span>{{ props.row.my_balance }}</span>
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
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="reg_datetime"
        label="注册日期"
        sortable
        width="180"
        column-key="date"
        :filters="filtersData"
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
            @click="openEditPrice(scope.row.phone)"
          >修改微信下单价格</el-button>
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
      partData: [
        {
          phone: 18278459466,
          pwd: "123456",
          my_balance: 78.04,
          wb_fee: 1304.5,
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
      filtersData: [{ text: "", value: "" }]
    };
  },
  created() {
    this.getFiltersData();
  },
  methods: {
    getFiltersData() {
      this.filtersData = this.partData.map(item => {
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
    openEditPrice(phone) {
      this.$prompt("请重新输入价格", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          // this.$http.post(`/api/admin/give/modPrice/${phone}`);
          this.$message({
            type: "success",
            message: "您修改的价格为: " + phone
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作取消",
            offset: 10
          });
        });
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
            message: phone + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作取消",
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
.part-card {
  margin-bottom: 10px;
  display: flex;
  .el-input {
    width: 300px;
    margin-right: 30px;
  }
}

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