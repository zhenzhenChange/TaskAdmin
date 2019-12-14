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
      v-if="searchData"
      ref="filterTable"
      :data="searchData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      border
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="clerk-table-expand">
            <el-form-item label="账号">
              <span class="mr-10">{{ props.row.phone }}</span>
              <el-button
                size="mini"
                :loading="flag"
                type="text"
                @click="viewDetails(props.row.uid)"
              >{{btnText}}</el-button>
            </el-form-item>
            <!-- <el-form-item label="备注">
              <span>{{ props.row.user_remark }}</span>
            </el-form-item>
            <el-form-item label="当天提成">
              <span>{{ props.row.general_income }}</span>
            </el-form-item>
            <el-form-item label="当天接单">
              <span>{{ mineOrder.length }}</span>
            </el-form-item>
            <el-form-item label="当天成功订单">
              <span>{{ mineOrder.length }}</span>
            </el-form-item>
            <el-form-item label="下级总接订单">
              <span>{{ sonOrderData.length }}</span>
            </el-form-item>
            <el-form-item label="下级总成功订单">
              <span>{{ sonOrderData.length }}</span>
            </el-form-item>
            <el-form-item label="下级当天接订单">
              <span>{{ sonOrderData.length }}</span>
            </el-form-item>
            <el-form-item label="下级当天成功订单">
              <span>{{ sonOrderData.length }}</span>
            </el-form-item>-->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="reg_datetime"
        align="center"
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
      <el-table-column align="center" prop="phone" label="账号"></el-table-column>
      <el-table-column align="center" prop="my_balance" label="余额"></el-table-column>
      <el-table-column align="center" prop="general_income" label="总提成"></el-table-column>
      <el-table-column align="center" label="总接单">
        <!-- <template>{{ mineOrder.length }}</template> -->
      </el-table-column>
      <el-table-column align="center" label="总成功">
        <!-- <template>{{ mineOrder.map(item => item.order_state).toString() }}</template> -->
      </el-table-column>
      <el-table-column align="center" prop="extension_code" label="推广码"></el-table-column>
      <el-table-column align="center" label="账号状态">
        <template v-slot="scope">
          <el-tag
            :type="scope.row.is_valide === 1 ? 'success' : 'danger'"
            disable-transitions
            hit
          >{{ scope.row.is_valide === 1 ? "正常" : "已封禁" }}</el-tag>
        </template>
      </el-table-column>
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
            icon="el-icon-warning"
            type="warning"
            @click="openBan(scope.row.phone)"
          >禁止账号登录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="data"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page="currentPage"
      :total="length || data.length"
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
      foreverData: [],
      onlyData: [],
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
      length: "",
      flag: false,
      btnText: "点击查看详细信息"
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
      const res = await this.$http.get(`/recv/get`);
      this.data = res.data.data;
      this.foreverData = res.data.data;
    },
    async viewDetails(uid) {
      this.flag = true;
      this.btnText = "加载中...";
      const res = await this.$http.post(`/recv/get`, {
        uid
      });
      if (res.status) {
        this.btnText = "详细信息如下";
      }
      this.onlyData = res.data;
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
    openEditPwd(phone) {
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        type: "info",
        inputType: "password"
      })
        .then(async ({ value }) => {
          const res = await this.$http.post("/changePwd", {
            phone,
            NewPwd: value
          });
          this.$message({
            type: "success",
            message: `${res}  密码修改成功！`,
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
          const res = await this.$http.post("/disableAccount", {
            phone
          });
          if (JSON.parse(res.data.status)) {
            this.getData();
            this.$message({
              type: "success",
              message: `账号 ${phone} 已封禁!`,
              offset: 10,
              center: true
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