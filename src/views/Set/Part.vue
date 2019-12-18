<template>
  <el-tabs :tab-position="position" class="vh-80">
    <el-tab-pane class="pane" label="下单会员初始设置">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>初始参数</span>
          <el-button class="btn" type="text" @click="saveSet">保存</el-button>
        </div>
        <div>
          <el-input v-model="defaultSet.su_vipInitPrice">
            <template slot="prepend">会员注册初始价格</template>
          </el-input>
          <el-input v-model="defaultSet.su_extensionAward" class="mt-20">
            <template slot="prepend">邀请价格初始设置</template>
          </el-input>
          <div>
            <span class="exCode">邀请码是否为必填项：</span>
            <el-switch
              class="switch"
              v-model="defaultSet.su_isExtensionCodeReq"
              active-text="是"
              inactive-text="否"
              :active-value="true"
              :inactive-value="false"
              @change="changeValue"
            ></el-switch>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>下单端公告发布</span>
          <el-button class="btn" type="text" @click="sendNotice">发布</el-button>
        </div>
        <div>
          <el-input
            resize
            type="textarea"
            rows="6"
            placeholder="请输入内容"
            v-model="defaultSet.su_giveAnno"
          ></el-input>
        </div>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="批量调节价格百分比">
      <el-card class="card">
        <el-button
          size="meduim"
          icon="el-icon-edit"
          type="primary"
          @click="openBatchEditPrice"
        >批量修改已选取对象的微信下单价格</el-button>
      </el-card>
      <el-table
        v-if="data"
        ref="multipleTable"
        :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        tooltip-effect="dark"
        class="w-100"
        @selection-change="selectionChange"
        stripe
        border
      >
        <el-table-column type="selection" width="55"></el-table-column>
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
        <el-table-column align="center" prop="phone" label="账号"></el-table-column>
        <el-table-column align="center" prop="user_remark" label="备注"></el-table-column>
        <el-table-column align="center" prop="my_balance" label="余额"></el-table-column>
        <el-table-column align="center" prop="is_valide" label="账号状态"></el-table-column>
      </el-table>
      <el-pagination
        v-if="data"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :current-page="currentPage"
        :total="data.length"
        layout="total, sizes, prev, pager, next, jumper"
        class="mt-20"
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: [],
      multipleSelection: [],
      defaultSet: {
        su_vipInitPrice: "",
        su_extensionAward: "",
        su_isExtensionCodeReq: "",
        su_giveAnno: ""
      },
      position: "top",
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 300, 400]
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState({
      userID: state => state.userID
    })
  },
  methods: {
    async getData() {
      const res = await this.$http.post("/setup/get");
      const giveRes = await this.$http.get("/give/get");
      this.data = giveRes.data.data;
      this.defaultSet = res.data;
    },
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    currentChange(val) {
      this.currentPage = val;
    },
    selectionChange(val) {
      this.multipleSelection = val;
    },
    changeValue(value) {
      this.su_isExtensionCodeReq = value;
    },
    async saveSet() {
      const res = await this.$http.post(`/setup/defaultPartSet`, {
        uid: this.userID,
        su_vipInitPrice: this.defaultSet.su_vipInitPrice,
        su_extensionAward: this.defaultSet.su_extensionAward,
        su_isExtensionCodeReq: this.defaultSet.su_isExtensionCodeReq ? 1 : 0
      });
      if (res.status === 200 && JSON.parse(res.data.status)) {
        this.$message({
          type: "success",
          message: "保存成功",
          offset: 10
        });
        this.getData();
      }
    },
    async sendNotice() {
      const res = await this.$http.post(`/setup/setRelesAnno`, {
        uid: this.userID,
        su_giveAnno: this.defaultSet.su_giveAnno
      });
      if (res.status === 200 && JSON.parse(res.data.status)) {
        this.$message({
          type: "success",
          message: "发布成功",
          offset: 10
        });
        this.getData();
      }
    },
    openBatchEditPrice() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: "warning",
          message: "请选取修改对象",
          offset: 10
        });
        return;
      }
      this.$prompt("请重新输入价格", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async ({ value }) => {
          // phone数组
          this.multipleSelection = this.multipleSelection.map(item => {
            return {
              phone: item.phone
            };
          });
          const res = await this.$http.post(`/setup/setOrderRatio`, {
            uid: this.userID,
            phoneArray: this.multipleSelection,
            user_minPrice: value
          });
          if (res.status === 200 && JSON.parse(res.data.status)) {
            this.$message({
              type: "success",
              message: `修改成功！`,
              offset: 10
            });
          } else {
            this.$message({
              type: "warning",
              message: `服务器已超时~`,
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.pane {
  display: flex;
  justify-content: space-around;
  .box-card {
    width: 480px;
    padding-bottom: 20px;
    float: left;
    .btn {
      float: right;
      padding: 3px 0;
    }
    .exCode {
      margin-top: 10px;
      float: left;
    }
    .switch {
      margin-top: 12px;
      margin-left: 10px;
      float: left;
    }
  }
}
</style>