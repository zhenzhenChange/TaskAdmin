<template>
  <div>
    <el-card class="card">
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
        class="mr-20"
      ></el-date-picker>
    </el-card>
    <el-table
      v-if="data"
      ref="filterTable"
      :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      border
    >
      <el-table-column
        prop="order_release_time"
        label="发布日期"
        align="center"
        sortable
        width="180"
        column-key="order_release_time"
      >
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.order_release_time | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结单时间" width="180">
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.order_end_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申诉时间" width="180">
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span class="ml-10">{{ scope.row.action_datetime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布账号" prop="uid_give"></el-table-column>
      <el-table-column align="center" label="订单编号" prop="order_id"></el-table-column>
      <el-table-column align="center" label="订单价格" prop="order_price"></el-table-column>
      <el-table-column align="center" label="接单账号" prop="uid_recive"></el-table-column>
      <el-table-column align="center" label="申诉证据" prop="order_apply_proof">
        <template
          v-slot="scope"
        >{{ scope.row.order_apply_proof ? scope.row.order_apply_proof : "无上传" }}</template>
      </el-table-column>
      <el-table-column
        prop="action_resState"
        label="申诉状态"
        align="center"
        width="120"
        filter-placement="bottom-end"
      >
        <template v-slot="scope">
          <el-tag hit :type="stateType(scope.row.action_resState)">{{scope.row.action_resState}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template v-slot="scope">
          <el-button
            size="mini"
            icon="el-icon-error"
            type="danger"
            @click="openDeleteRecord(scope.row.order_id)"
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
      foreverData: [],
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
      value: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    stateType(type) {
      return type === "成功" ? "success" : "primary";
    },
    async getData() {
      const res = await this.$http.get(`/man/get`);
      res.data.data.map(item => {
        if (item.action_resState === 11) {
          this.data.push(item);
        }
      });
      this.foreverData = this.data;
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
          new Date(dataTable.order_release_time) >= new Date(start) &&
          new Date(dataTable.order_release_time) <= new Date(end)
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
    openDeleteRecord(id) {
      this.$confirm("确定要删除此记录吗？", "警告", {
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
            message: `${res} 删除成功!`,
            offset: 10
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