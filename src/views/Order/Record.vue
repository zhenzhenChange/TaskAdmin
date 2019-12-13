<template>
  <div>
    <el-card class="card">
      <el-input size="medium" placeholder="输入关键字搜索" v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button @click="resetDateFilter">重置日期筛选</el-button>
      <el-button @click="resetAllFilter">重置所有筛选</el-button>
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
          <el-form label-position="left" inline class="order-table-expand">
            <el-form-item label="订单编号">
              <span>{{ props.row.order_id }}</span>
            </el-form-item>
            <el-form-item label="有效时间">
              <span>{{ props.row.order_effectPeriod }}</span>
            </el-form-item>
            <el-form-item label="订单类型">
              <span>{{ props.row.order_type }}</span>
            </el-form-item>
            <el-form-item label="订单备注">
              <span>{{ props.row.order_remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_release_time"
        label="发布日期"
        align="center"
        sortable
        width="180"
        column-key="order_release_time"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.order_release_time | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布账号" prop="uid_give"></el-table-column>
      <el-table-column align="center" label="订单编号" prop="order_id"></el-table-column>
      <el-table-column align="center" label="订单标题" prop="order_title"></el-table-column>
      <el-table-column align="center" label="订单价格" prop="order_price"></el-table-column>
      <el-table-column align="center" label="接单账号" prop="uid_recive"></el-table-column>
      <el-table-column align="center" label="接单时间" width="180">
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.action_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结单时间" width="180">
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.action_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_state"
        label="订单状态"
        align="center"
        width="120"
        :filters="stateData"
        :filter-method="filterHandler"
        filter-placement="bottom-end"
      >
        <template v-slot="scope">
          <el-tag hit :type="stateType(scope.row.order_state)">{{scope.row.order_state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="平台利润" prop="son_pumpRation"></el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template v-slot="scope">
          <el-button
            size="mini"
            icon="el-icon-error"
            type="danger"
            @click="deleteRecord(scope.row.order_id)"
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
      data: [],
      timeData: [],
      stateData: [],
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
    stateType(type) {
      return type === "成功" ? "success" : "primary";
    },
    getFiltersData() {
      let timeHash = {};
      let stateHash = {};
      this.timeData = this.data
        .map(item => {
          return {
            text: item.order_release_time,
            value: item.order_release_time
          };
        })
        .reduce((arr, current) => {
          timeHash[current.text]
            ? ""
            : (timeHash[current.text] = true && arr.push(current));
          return arr;
        }, []);
      this.stateData = this.data
        .map(item => {
          return {
            text: item.order_state,
            value: item.order_state
          };
        })
        .reduce((arr, current) => {
          stateHash[current.text]
            ? ""
            : (stateHash[current.text] = true && arr.push(current));
          return arr;
        }, []);
    },
    async getData() {
      const res = await this.$http.get(`/man/get`);
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
      this.$refs.filterTable.clearFilter("order_release_time");
    },
    resetAllFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    deleteRecord(id) {
      this.$confirm("确定要删除该条记录吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.post(`/man/delOrderRec`, {
            order_id: id
          });
          this.$message({
            type: "success",
            message: "操作成功!" + res
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.order-table-expand {
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