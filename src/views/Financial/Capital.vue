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
        class="ml-20"
      ></el-date-picker>
    </el-card>
    <el-table
      v-if="searchData"
      ref="filterTable"
      :data="
        searchData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
    >
      <el-table-column
        prop="wb_datetime"
        label="流水日期"
        sortable
        align="center"
        width="180"
        column-key="wb_datetime"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.wb_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="wb_uid"
        label="交易账号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="Alipay_account"
        label="支付宝账号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="Alipay_name"
        label="支付宝姓名"
      ></el-table-column>
      <el-table-column align="center" prop="wb_type" label="交易类型">
        <template v-slot="scope">
          <el-tag hit :type="scope.row.wb_type === 0 ? 'success' : 'warning'">{{
            scope.row.wb_type === 0 ? "充值" : "提现"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="wb_fee"
        label="交易费用"
      ></el-table-column>
      <el-table-column align="center" prop="wb_state" label="交易状态">
        <template v-slot="scope">
          <el-tag hit :type="scope.row.wb_state === 0 ? 'danger' : 'success'">{{
            scope.row.wb_state === 0 ? "失败" : "成功"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template v-slot="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="openEditAlipayAccount(scope.row.wb_uid)"
            >修改支付宝账号</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-error"
            type="danger"
            @click="openDeleteRecord(scope.row.wb_id)"
            >删除该记录</el-button
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
      daforeverDatata: [],
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
      const res = await this.$http.get(`/admin/finac/get`);
      this.data = res.data.data;
      this.foreverData = res.data.data;
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
          new Date(dataTable.wb_datetime) >= new Date(start) &&
          new Date(dataTable.wb_datetime) <= new Date(end)
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
    openEditAlipayAccount(uid) {
      this.$prompt("请输入新的支付宝账号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async ({ value }) => {
          const res = await this.$http.post(`/admin/changeAlipayAccount`, {
            uid,
            Alipay_account: value
          });
          this.$message({
            type: "success",
            message: `${res.data.status}`,
            offset: 10
          });
          this.getData();
        })
        .catch(() => {});
    },
    openDeleteRecord(id) {
      this.$confirm("确定要删除该条记录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.post(`/admin/finac/delWbRec`, {
            wb_id: id
          });
          this.$message({
            type: "success",
            message: "操作成功!" + res,
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
