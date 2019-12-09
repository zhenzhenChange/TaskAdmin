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
        width="140"
        column-key="order_release_time"
        :filters="timeData"
        :filter-method="filterHandler"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.order_release_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布账号" prop="uid_give"></el-table-column>
      <el-table-column align="center" label="订单编号" prop="order_id"></el-table-column>
      <el-table-column align="center" label="订单标题" prop="order_title"></el-table-column>
      <el-table-column align="center" label="订单价格" prop="order_price"></el-table-column>
      <el-table-column align="center" label="接单账号" prop="uid_recive"></el-table-column>
      <el-table-column align="center" label="接单时间" prop="uid_recive"></el-table-column>
      <el-table-column align="center" label="结单时间" prop="order_end_datetime"></el-table-column>
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
      <el-table-column align="center" label="平台利润" prop="order_end_datetime"></el-table-column>
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
      data: [
        {
          order_id: "订单编号",
          uid_give: "放单用户",
          uid_recive: "结单用户",
          action_resState: "接单状态",
          action_datetime: "接单时间",
          order_end_datetime: "结单时间",
          order_title: "订单标题",
          order_release_time: "发布日期",
          order_state: "订单状态",
          order_type: "订单类型",
          order_price: "订单价格",
          order_remark: "订单备注",
          order_effectPeriod: "有效时间",
          profits: "平台利润"
        },
        {
          order_id: "订单编号",
          uid_give: "放单用户",
          uid_recive: "结单用户",
          action_resState: "接单状态",
          action_datetime: "接单时间",
          order_end_datetime: "结单时间",
          order_title: "订单标题",
          order_release_time: "发布日期",
          order_state: "订单状态",
          order_type: "订单类型",
          order_price: "订单价格",
          order_remark: "订单备注",
          order_effectPeriod: "有效时间",
          profits: "平台利润"
        },
        {
          order_id: "订单编号",
          uid_give: "放单用户",
          uid_recive: "结单用户",
          action_resState: "接单状态",
          action_datetime: "接单时间",
          order_end_datetime: "结单时间",
          order_title: "订单标题",
          order_release_time: "发布日期",
          order_state: "订单状态",
          order_type: "订单类型",
          order_price: "订单价格",
          order_remark: "订单备注",
          order_effectPeriod: "有效时间",
          profits: "平台利润"
        },
        {
          order_id: "订单编号",
          uid_give: "放单用户",
          uid_recive: "结单用户",
          action_resState: "接单状态",
          action_datetime: "接单时间",
          order_end_datetime: "结单时间",
          order_title: "订单标题",
          order_release_time: "发布日期",
          order_state: "订单状态",
          order_type: "订单类型",
          order_price: "订单价格",
          order_remark: "订单备注",
          order_effectPeriod: "有效时间",
          profits: "平台利润"
        },
        {
          order_id: "订单编号",
          uid_give: "放单用户",
          uid_recive: "结单用户",
          action_resState: "接单状态",
          action_datetime: "接单时间",
          order_end_datetime: "结单时间",
          order_title: "订单标题",
          order_release_time: "发布日期",
          order_state: "订单状态",
          order_type: "订单类型",
          order_price: "订单价格",
          order_remark: "订单备注",
          order_effectPeriod: "有效时间",
          profits: "平台利润"
        },
        {
          order_id: "订单编号",
          uid_give: "放单用户",
          uid_recive: "结单用户",
          action_resState: "接单状态",
          action_datetime: "接单时间",
          order_end_datetime: "结单时间",
          order_title: "订单标题",
          order_release_time: "发布日期",
          order_state: "订单状态",
          order_type: "订单类型",
          order_price: "订单价格",
          order_remark: "订单备注",
          order_effectPeriod: "有效时间",
          profits: "平台利润"
        },
        {
          order_id: "订单编号",
          uid_give: "放单用户",
          uid_recive: "结单用户",
          action_resState: "接单状态",
          action_datetime: "接单时间",
          order_end_datetime: "结单时间",
          order_title: "订单标题",
          order_release_time: "发布日期",
          order_state: "订单状态",
          order_type: "订单类型",
          order_price: "订单价格",
          order_remark: "订单备注",
          order_effectPeriod: "有效时间",
          profits: "平台利润"
        },
        {
          order_id: "订单5编号",
          uid_give: "放单用户",
          uid_recive: "结单6用户",
          action_resState: "接单状态",
          action_datetime: "接单7时间",
          order_end_datetime: "结11单时间",
          order_title: "订单标题",
          order_release_time: "发布日期",
          order_state: "订单状态",
          order_type: "订单类型",
          order_price: "订单价格",
          order_remark: "订单备注",
          order_effectPeriod: "有效时间",
          profits: "平台利润"
        },
        {
          order_id: "222",
          uid_give: "放单222222用户",
          uid_recive: "结单2用户",
          action_resState: "接单2状态",
          action_datetime: "接单2时间",
          order_end_datetime: "结2单时间",
          order_title: "订单标2题",
          order_release_time: "发布日期",
          order_state: "订单状态",
          order_type: "订单类型",
          order_price: "订单价格",
          order_remark: "订单备注",
          order_effectPeriod: "有效时间",
          profits: "平台利润"
        }
      ],
      timeData: [{ text: "", value: "" }],
      stateData: [{ text: "", value: "" }],
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
    stateType(type) {
      return type === "成功" ? "success" : "primary";
    },
    getFiltersData() {
      let timeHash = {};
      let stateHash = {};
      this.timeData = this.data
        .map(item => {
          return {
            text: item.reg_datetime,
            value: item.reg_datetime
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
    getData() {
      // this.$http.get(`/api/admin/man/get`);
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
        .then(() => {
          // this.$http.post(`/api/admin/disableAccount/${id}`);
          this.$message({
            type: "success",
            message: "操作成功!" + id
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