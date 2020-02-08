<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-date-picker
        size="medium"
        type="datetimerange"
        v-model="value"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="filterDate"
      ></el-date-picker>
    </el-card>
    <el-table
      ref="filterTable"
      :data="
        searchData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      @expand-change="expandChange"
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="part-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.user_remark }}</span>
            </el-form-item>
            <el-form-item label="当天充值">
              <span>{{ showInfo.totalCharge }}</span>
            </el-form-item>
            <el-form-item label="总订单">
              <span>{{ showInfo.relesSumOrder }}</span>
            </el-form-item>
            <el-form-item label="总成功订单">
              <span>{{ showInfo.relesSussSumOrder }}</span>
            </el-form-item>
            <el-form-item label="当天下订单">
              <span>{{ showInfo.relesTodayOrder }}</span>
            </el-form-item>
            <el-form-item label="当天成功订单">
              <span>{{ showInfo.relesTodaySuccOrder }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="reg_datetime"
        label="注册日期"
        sortable
        width="180"
        column-key="reg_datetime"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.reg_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="账号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="my_balance"
        label="余额"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="wb_fee"
        label="总充值"
      ></el-table-column>
      <el-table-column align="center" label="账号状态">
        <template v-slot="scope">
          <el-tag
            :type="scope.row.is_valide === 1 ? 'success' : 'danger'"
            disable-transitions
            hit
            >{{ scope.row.is_valide === 1 ? "正常" : "已封禁" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="450">
        <template v-slot="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="openEditPrice(scope.row.uid)"
            >修改微信最低下单价格</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="openEditPwd(scope.row.phone)"
            >修改密码</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-warning"
            type="warning"
            @click="openBan(scope.row.phone)"
            :disabled="scope.row.is_valide === 0 ? true : false"
            >禁止账号登录</el-button
          >
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
      class="mt-20 mb-20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      foreverData: [],
      search: "",
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 300, 400],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value: "",
      flag: false,
      showInfo: {}
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
    async getData() {
      const res = await this.$http.get(`/give/get`);
      this.data = res.data.data;
      this.foreverData = res.data.data;
    },
    async expandChange({ uid }) {
      const data = await this.$http.post(`/give/get`, { uid });
      console.log(data);
      this.showInfo = data;
    },
    filterDate(value) {
      if (!value) {
        this.data = this.foreverData;
        return;
      }
      this.data = this.foreverData;
      const start = value[0];
      const end = value[1];
      const dataTable = this.data.filter(dataTable => {
        return (
          new Date(dataTable.reg_datetime) >= new Date(start) &&
          new Date(dataTable.reg_datetime) <= new Date(end)
        );
      });
      this.data = dataTable;
    },
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    currentChange(val) {
      this.currentPage = val;
    },
    openEditPrice(uid) {
      this.$prompt("请重新输入价格", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async ({ value }) => {
          const res = await this.$http.post(`/give/modPrice`, {
            uid,
            user_minPrice: value
          });
          if (res.status === 200 && JSON.parse(res.data.statusCode)) {
            this.$message({
              type: "success",
              message: `修改成功！`,
              offset: 10
            });
          } else {
            this.$message({
              type: "warning",
              message: `服务器已超时，请稍后重试～`,
              offset: 10
            });
          }
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
        .then(async ({ value }) => {
          const res = await this.$http.post(`/changePwd`, {
            phone,
            NewPwd: value
          });
          if (res.status === 200 && JSON.parse(res.data.status)) {
            this.$message({
              type: "success",
              message: "修改成功",
              offset: 10
            });
          } else {
            this.$message({
              type: "warning",
              message: "服务器已超时~",
              offset: 10
            });
          }
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
          const res = await this.$http.post(`/disableAccount`, {
            phone
          });
          if (res.data.status) {
            this.getData();
            this.$message({
              type: "success",
              message: `账号 ${phone} 已封禁!`,
              offset: 10
            });
          } else {
            this.$message({
              type: "warning",
              message: `服务器已超时，请稍后重试～`,
              offset: 10
            });
          }
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
