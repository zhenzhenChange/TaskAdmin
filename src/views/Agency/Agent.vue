<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-date-picker
        class="mr-20"
        size="medium"
        unlink-panels
        align="center"
        v-model="value"
        type="datetimerange"
        @change="filterDate"
        range-separator="至"
        end-placeholder="结束日期"
        start-placeholder="开始日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-edit" @click="openEditDefaultIncome">
        总代提成默认设置
      </el-button>
      <span class="ml-10">总代默认提成：{{ sonPumpRation }}</span>
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
          <el-form label-position="left" inline class="agent-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="总领取订单">
              <span>{{ showInfo.sumOrder }}</span>
            </el-form-item>
            <el-form-item label="总成功订单">
              <span>{{ showInfo.sussOrder }}</span>
            </el-form-item>
            <el-form-item label="当天接单">
              <span>{{ showInfo.todayOrder }}</span>
            </el-form-item>
            <el-form-item label="当天成功订单">
              <span>{{ showInfo.todaySussOrder }}</span>
            </el-form-item>
            <el-form-item label="下级总接订单">
              <span>{{ showInfo.sonSumOrder }}</span>
            </el-form-item>
            <el-form-item label="下级总成功订单">
              <span>{{ showInfo.sonSussOrder }}</span>
            </el-form-item>
            <el-form-item label="下级当天接订单">
              <span>{{ showInfo.sonTodayOrder }}</span>
            </el-form-item>
            <el-form-item label="下级当天成功订单">
              <span>{{ showInfo.sonTodaySussOrder }}</span>
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
      <el-table-column width="180" prop="phone" label="账号" align="center"></el-table-column>
      <el-table-column
        width="180"
        align="center"
        label="推广码"
        prop="extension_code"
      ></el-table-column>
      <el-table-column label="余额" align="center">
        <template v-slot="scope">
          <span class="ml-10">{{ scope.row.my_balance / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" label="备注" align="center" prop="user_remark"></el-table-column>
      <el-table-column align="center" label="提成比例">
        <template v-slot="scope">
          <span class="ml-10">{{ scope.row.my_returnRatio * 100 }}%</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总提成" width="150">
        <template v-slot="scope">
          <span class="ml-10">{{ scope.row.general_income / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号状态">
        <template v-slot="scope">
          <el-tag hit disable-transitions :type="scope.row.is_valide === 1 ? 'success' : 'danger'">
            {{ scope.row.is_valide === 1 ? "正常" : "已封禁" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="400">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="openEditCode(scope.row.uid)"
            >修改邀请码</el-button
          >
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="openRemark(scope.row.uid)"
            >修改备注</el-button
          >
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="openEditPwd(scope.row.phone)"
            >修改密码</el-button
          >
          <br />
          <div class="mt-10"></div>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="openRatio(scope.row.uid)"
            >修改提成</el-button
          >
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-warning"
            @click="openBan(scope.row.phone)"
            :disabled="scope.row.is_valide === 0 ? true : false"
            >禁止账号登录</el-button
          >
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: [],
      expands: [],
      mineOrder: [],
      foreverData: [],
      son_pumpRation: "",
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
      search: "",
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 300, 500],
      flag: false,
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
    ...mapState({
      userID: state => state.userID,
      sonPumpRation: state => state.sonPumpRation,
    }),
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`/admin/agent/get`);
      this.data = res.data.data;
      this.foreverData = res.data.data;
    },
    getRowKeys(row) {
      return row.uid;
    },
    async expandChange({ uid }, expandedRows) {
      const { data } = await this.$http.post(`/admin/recv/get`, { uid });
      this.showInfo = data;
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
    openEditPwd(phone) {
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
        inputType: "password",
      })
        .then(async ({ value }) => {
          const res = await this.$http.post(`/admin/changePwd`, {
            phone,
            NewPwd: value,
          });
          if (res.status === 200 && JSON.parse(res.data.status)) {
            this.$message({
              type: "success",
              message: `修改成功！`,
              offset: 10,
            });
          } else {
            this.$message({
              type: "warning",
              message: `服务器已超时，请稍后重试～`,
              offset: 10,
            });
          }
        })
        .catch(() => {});
    },
    openRemark(uid) {
      this.$prompt("请输入新备注", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async ({ value }) => {
          const { data } = await this.$http.post(`/recv/setNickname`, {
            uid,
            user_remark: value,
          });
          if (JSON.parse(data.ret)) {
            this.$message({
              type: "success",
              message: `修改成功！`,
              offset: 10,
            });
          } else {
            this.$message({
              type: "warning",
              message: `服务器已超时，请稍后重试～`,
              offset: 10,
            });
          }
          this.getData();
        })
        .catch(() => {});
    },
    openRatio(uid) {
      this.$prompt("请输入新提成（0-1之间的数（包含0-1））", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async ({ value }) => {
          if (value > 1 || value < 0) {
            this.$message({ type: "success", message: "请输入0-1之间的数（包含0-1）", offset: 10 });
            return;
          }
          const { data } = await this.$http.post(`/admin/updateSunRatio`, {
            uid,
            my_returnRatio: value,
          });
          this.$message({ type: "success", message: data.status, offset: 10 });
          this.getData();
        })
        .catch(() => {});
    },
    openEditCode(uid) {
      this.$prompt("请设置新邀请码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async ({ value }) => {
          value = value.replace(/\s*/g, "");
          const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
          if (reg.test(value) || value.length > 10) {
            this.$message({
              type: "warning",
              message: `邀请码限制为10位以下的英文字符和数字组合~`,
              offset: 10,
            });
            return;
          }
          const res = await this.$http.post(`/admin/adminUpdateCode`, {
            uid,
            extension_code: value,
          });
          if (res.status === 200) {
            if (res.data.status === "邀请码已存在！") {
              this.$message({
                type: "warning",
                message: `邀请码已存在，请您重新设置~`,
                offset: 10,
              });
              return;
            }
            this.$message({
              type: "success",
              message: `${res.data.status}`,
              offset: 10,
            });
          } else {
            this.$message({
              type: "warning",
              message: `服务器已超时，请稍后重试～`,
              offset: 10,
            });
          }
          this.getData();
        })
        .catch(() => {});
    },
    openBan(phone) {
      this.$confirm("确定要禁止该账号登录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.post(`/admin/disableAccount`, {
            phone,
          });
          if (res.status === 200 && JSON.parse(res.data.status)) {
            this.$message({
              type: "success",
              message: `总代 ${phone} 已封禁成功！`,
              offset: 10,
            });
          } else {
            this.$message({
              type: "warning",
              message: `服务器已超时，请稍后重试～`,
              offset: 10,
            });
          }
          this.getData();
        })
        .catch(() => {});
    },
    openEditDefaultIncome() {
      this.$prompt("请重新设置总代默认提成", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async ({ value }) => {
          const res = await this.$http.post(`/admin/agent/setRetRatio`, {
            uid: this.userID,
            son_pumpRation: value,
          });
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "设置成功！",
              offset: 10,
            });
            this.$store.commit("SaveUserSonPumpRation", res.data.son_pumpRation);
          } else {
            this.$message({
              type: "warning",
              message: `服务器已超时，请稍后重试～`,
              offset: 10,
            });
          }
        })
        .catch(() => {});
    },
  },
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
