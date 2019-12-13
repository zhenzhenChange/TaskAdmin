<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
      <el-button @click="openEditDefaultIncome" icon="el-icon-edit" type="primary">总代提成默认设置</el-button>
      <span class="ml-10">总代默认提成：{{son_pumpRation}}</span>
    </el-card>
    <el-table
      ref="filterTable"
      :data="searchData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      border
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="agent-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="当天提成">
              <span>{{ props.row.general_income }}</span>
            </el-form-item>
            <el-form-item label="当天接单">
              <span>{{ props.row.orderData }}</span>
            </el-form-item>
            <el-form-item label="当天成功订单">
              <span>{{ props.row.orderData }}</span>
            </el-form-item>
            <el-form-item label="下级总接订单">
              <span>{{ props.row.sonData }}</span>
            </el-form-item>
            <el-form-item label="下级总成功订单">
              <span>{{ props.row.sonData }}</span>
            </el-form-item>
            <el-form-item label="下级当天接订单">
              <span>{{ props.row.sonData }}</span>
            </el-form-item>
            <el-form-item label="下级当天成功订单">
              <span>{{ props.row.sonData }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="reg_datetime"
        label="注册日期"
        sortable
        width="180"
        align="center"
        column-key="reg_datetime"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.reg_datetime | date }}</span>
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
        <template v-slot="scope">
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
            type="warning"
            @click="openBan(scope.row.phone)"
          >禁止账号登录</el-button>
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
      data: [],
      timeData: [{ text: "", value: "" }],
      son_pumpRation: "下级抽层率",
      search: "",
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 300, 400]
    };
  },
  created() {
    this.getData();
  },
  computed: {
    searchData() {
      if (this.search) {
        return this.data.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).includes(this.search);
          });
        });
      }
      return this.data;
    }
  },
  methods: {
    getFiltersData() {
      let hash = {};
      this.timeData = this.data
        .map(item => {
          return {
            text: item.reg_datetime,
            value: item.reg_datetime
          };
        })
        .reduce((arr, current) => {
          hash[current.text]
            ? ""
            : (hash[current.text] = true && arr.push(current));
          return arr;
        }, []);
    },
    async getData() {
      const res = await this.$http.get(`/agent/get`);
      this.data = res.data.data;
      this.getFiltersData();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    currentChange(val) {
      this.currentPage = val;
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
        .then(async ({ value }) => {
          const data = {
            phone,
            newPwd: value
          };
          const res = await this.$http.post(`/changePwd/${data}`);
          this.$message({
            type: "success",
            message: res,
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
        .then(async () => {
          const res = await this.$http.post(`/disableAccount/${phone}`);
          this.$message({
            type: "success",
            message: "禁止成功!" + res,
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
        .then(async ({ value }) => {
          const data = {
            phone,
            newAgRetRatio: value
          };
          const res = await this.$http.post(`/agent/modAgRetRatio/${data}`);
          this.$message({
            type: "success",
            message: res,
            offset: 10
          });
        })
        .catch(() => {});
    },
    openEditDefaultIncome() {
      this.$prompt("请重新设置总代默认提成", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async ({ value }) => {
          const res = await this.$http.post(`/agent/setRetRatio/${value}`);
          this.son_pumpRation = value;
          this.$message({
            type: "success",
            message: res,
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