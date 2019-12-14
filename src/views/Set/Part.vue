<template>
  <el-tabs :tab-position="position" class="vh-80">
    <el-tab-pane class="pane" label="下单会员初始设置">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>初始参数</span>
          <el-button class="btn" type="text" @click="saveSet">保存</el-button>
        </div>
        <div>
          <el-input v-model="su_vipInitPrice">
            <template slot="prepend">会员注册初始价格</template>
          </el-input>
          <el-input v-model="su_extensionAward" class="mt-20">
            <template slot="prepend">邀请价格初始设置</template>
          </el-input>
          <div>
            <span class="exCode">邀请码是否为必填项：</span>
            <el-switch
              class="switch"
              v-model="su_isExtensionCodeReq"
              active-text="是"
              inactive-text="否"
              active-value="1"
              inactive-value="0"
              @change="changeValue"
            ></el-switch>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>下单端公告发布</span>
          <el-button class="btn" type="text" @click="saveSet">发布</el-button>
        </div>
        <div>
          <el-input resize type="textarea" rows="6" placeholder="请输入内容" v-model="textarea"></el-input>
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
          width="150"
          column-key="reg_datetime"
        >
          <template v-slot="scope">
            <i class="el-icon-time"></i>
            <span class="ml-10">{{ scope.row.reg_datetime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="phone" label="账号"></el-table-column>
        <el-table-column align="center" prop="user_remark" label="备注"></el-table-column>
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
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          phone: "17777",
          reg_datetime: "注册日期",
          user_remark: "备注"
        }
      ],
      multipleSelection: [],
      su_vipInitPrice: "",
      su_extensionAward: "",
      su_isExtensionCodeReq: 1,
      textarea: "",
      position: "top",
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 300, 400]
    };
  },
  methods: {
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
      const priceRes = await this.$http.post(`/setup/setFreshmanPrice`, {
        su_vipInitPrice: this.su_vipInitPrice
      });
      const awardRes = await this.$http.post(`/setup/extensionAward`, {
        su_extensionAward: this.su_extensionAward
      });
      const codeRes = await this.$http.post(`/setup/isExtCodeReq`, {
        su_isExtensionCodeReq: this.su_isExtensionCodeReq
      });
      if (priceRes.statusCode && awardRes.statusCode && codeRes.statusCode) {
        this.$message({
          type: "suceess",
          message: "保存成功",
          offset: 10
        });
      }
    },
    async sendNotice() {
      const res = await this.$http.post(`/setup/setRecvAnno`, {
        su_giveAnno: this.textarea
      });
      if (res.statusCode) {
        this.$message({
          type: "suceess",
          message: "发布成功",
          offset: 10
        });
      }
    },
    openBatchEditPrice() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: "error",
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
          this.multipleSelection = this.multipleSelection.map(item => {
            return {
              phone: item.phone
            };
          });
          const res = await this.$http.post(`/give/modPrice`, {
            phoneArray: this.multipleSelection,
            su_generalUserTicketRatio: value
          });
          this.$message({
            type: "success",
            message: `您修改的价格为: ${res}`,
            offset: 10
          });
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