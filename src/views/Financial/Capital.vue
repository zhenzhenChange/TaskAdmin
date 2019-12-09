<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
    </el-card>
    <el-table
      ref="filterTable"
      :data="searchData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      border
    >
      <el-table-column
        prop="wb_datetime"
        label="流水日期"
        sortable
        align="center"
        width="140"
        column-key="wb_datetime"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.wb_datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="wb_uid" label="交易账号"></el-table-column>
      <el-table-column align="center" prop="Alipay_account" label="支付宝账号"></el-table-column>
      <el-table-column align="center" prop="Alipay_name" label="支付宝姓名"></el-table-column>
      <el-table-column align="center" prop="wb_type" label="交易类型"></el-table-column>
      <el-table-column align="center" prop="wb_fee" label="交易费用"></el-table-column>
      <el-table-column align="center" prop="wb_state" label="交易状态"></el-table-column>
      <el-table-column align="center" label="操作" width="450">
        <template v-slot="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="openEditAlipayAccount(scope.row.wb_uid)"
          >修改支付宝账号</el-button>
          <el-button
            size="mini"
            icon="el-icon-error"
            type="danger"
            @click="openDeleteRecord(scope.row.wb_id)"
          >删除该记录</el-button>
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
      data: [
        {
          wb_id: "流水号",
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "支付宝账号",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        },
        {
          wb_id: "流水号",
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "支付宝账号",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        },
        {
          wb_id: "流水号",
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "支付宝账号",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        },
        {
          wb_id: "流水号",
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "支付宝账号",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        },
        {
          wb_id: "流水号",
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "22222222",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        },
        {
          wb_id: "流水号",
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "支付宝2222222账号",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        },
        {
          wb_id: "流水号",
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "支付宝账号",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        },
        {
          wb_id: "流水号",
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "支付宝账号",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        },
        {
          wb_id: "流水号",
          wb_fee: "交易费用",
          wb_type: "交易类型",
          wb_uid: "交易账号",
          Alipay_account: "4444444444",
          Alipay_name: "支付宝姓名",
          wb_datetime: "2019-12-04",
          wb_state: "交易状态"
        }
      ],
      timeData: [{ text: "", value: "" }],
      search: "",
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 300, 400]
    };
  },
  created() {
    this.getFiltersData();
  },
  computed: {
    searchData() {
      if (this.search) {
        return this.data.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).indexOf(this.search) > -1;
          });
        });
      }
      return this.data;
    }
  },
  methods: {
    getFiltersData() {
      this.timeData = this.data.map(item => {
        return {
          text: item.reg_datetime,
          value: item.reg_datetime
        };
      });
    },
    getPartData() {
      // this.$http.get(`/api/admin/give/get/${my_stratum}`);
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
    openEditAlipayAccount(uid) {
      this.$prompt("请输入新的支付宝账号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(({ value }) => {
          // this.$http.post(`/api/admin/give/changePwd/${phone}`);
          this.$message({
            type: "success",
            message: uid + value,
            offset: 10
          });
        })
        .catch(() => {});
    },
    openDeleteRecord(id) {
      this.$confirm("确定要删除该条记录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$http.post(`/api/admin/disableAccount/${id}`);
          this.$message({
            type: "success",
            message: "操作成功!" + id,
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