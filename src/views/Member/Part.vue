<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-date-picker
        size="medium"
        unlink-panels
        align="center"
        v-model="value"
        @change="filterDate"
        type="datetimerange"
        range-separator="至"
        end-placeholder="结束日期"
        start-placeholder="开始日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </el-card>
    <el-table
      stripe
      border
      ref="filterTable"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @expand-change="expandChange"
      :data="searchData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="part-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="当天充值">
              <span>{{ showInfo.todayCharge / 100 }}</span>
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
              <span>{{ showInfo.relesTodaySussOrder }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        width="180"
        align="center"
        label="注册日期"
        prop="reg_datetime"
        column-key="reg_datetime"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.reg_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="phone" label="账号"></el-table-column>
      <el-table-column align="center" label="余额">
        <template v-slot="scope">
          <span class="ml-10">{{ scope.row.my_balance / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="user_minPrice" label="最低价格"></el-table-column>
      <el-table-column align="center" label="总充值">
        <template v-slot="scope">
          <span class="ml-10">{{ scope.row.wb_fee / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="user_remark" label="备注"></el-table-column>
      <el-table-column align="center" label="账号状态">
        <template v-slot="scope">
          <el-tag :type="scope.row.is_valide === 1 ? 'success' : 'danger'" disable-transitions hit>
            {{ scope.row.is_valide === 1 ? "正常" : "已封禁" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="450">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-error"
            @click="openBan(scope.row.phone)"
            :disabled="scope.row.is_valide === 0 ? true : false"
          >
            禁止账号登录
          </el-button>
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-thumb"
            @click="openRelieve(scope.row.uid)"
            :disabled="scope.row.is_valide === 0 ? false : true"
          >
            解除登录限制
          </el-button>
          <div class="mt-10"></div>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="openEditPrice(scope.row.uid)"
          >
            修改最低下单价格
          </el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="openEditPwd(scope.row.phone)"
          >
            修改密码
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="openDeleteUser(scope.row.uid)"
          >
            删除用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-20 mb-20"
      :total="data.length"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      @size-change="sizeChange"
      :current-page="currentPage"
      @current-change="currentChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      expands: [],
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
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value: "",
      showInfo: {},
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
    },
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`/admin/give/get`);
      this.data = res.data.data;
      this.foreverData = res.data.data;
    },
    getRowKeys(row) {
      return row.uid;
    },
    async expandChange({ uid }, expandedRows) {
      const data = await this.$http.post(`/admin/give/get`, { uid });
      this.showInfo = data.data;
      const _this = this;
      if (expandedRows.length) {
        _this.expands = [];
        if (uid) {
          _this.expands.push(uid);
        }
      } else {
        _this.expands = [];
      }
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
      this.$prompt("请重新输入价格", "提示", { type: "info" })
        .then(async ({ value }) => {
          const res = await this.$http.post(`/admin/give/modPrice`, { uid, user_minPrice: value });
          if (res.status === 200 && JSON.parse(res.data.statusCode)) {
            this.$message.success({ message: `修改成功！`, offset: 10 });
            this.getData();
          } else {
            this.$message.warning({ message: `服务器已超时，请稍后重试～`, offset: 10 });
          }
        })
        .catch(() => {});
    },
    openEditPwd(phone) {
      this.$prompt("请输入新密码", "提示", { type: "info", inputType: "password" })
        .then(async ({ value }) => {
          const res = await this.$http.post(`/admin/changePwd`, { phone, NewPwd: value });
          if (res.status === 200 && JSON.parse(res.data.status)) {
            this.$message.success({ message: "修改成功", offset: 10 });
          } else {
            this.$message.warning({ message: "服务器已超时~", offset: 10 });
          }
        })
        .catch(() => {});
    },
    openBan(phone) {
      this.$confirm("确定要禁止该账号登录吗？", "警告", { type: "warning" })
        .then(async () => {
          const res = await this.$http.post(`/admin/disableAccount`, { phone });
          if (res.data.status) {
            this.getData();
            this.$message.success({ message: `账号 ${phone} 已封禁!`, offset: 10 });
          } else {
            this.$message.warning({ message: `服务器已超时，请稍后重试～`, offset: 10 });
          }
        })
        .catch(() => {});
    },
    openRelieve(uid) {
      this.$confirm("确定要解除登录限制吗？", "警告", { type: "warning" })
        .then(async () => {
          const { data } = await this.$http.post("/admin/removeLimit", { uid });
          this.$message.info({ message: data.status, offset: 10 });
          this.getData();
        })
        .catch(() => {});
    },
    openDeleteUser(uid) {
      this.$confirm("确定要删除该用户吗？", "危险", { type: "error" })
        .then(async () => {
          const { data } = await this.$http.post("/admin/deleteUser", { uid });
          this.$message.success({ message: data.status, offset: 10 });
          this.getData();
        })
        .catch(() => {});
    },
  },
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
