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
          <el-input v-model="su_extensionAward">
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
          <el-input
            resize
            type="textarea"
            rows="6"
            placeholder="请输入内容"
            v-model="textarea"
            clearable
          ></el-input>
        </div>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="批量调节价格百分比">
      <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template v-slot="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="mt-20">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      su_vipInitPrice: "",
      su_extensionAward: "",
      su_isExtensionCodeReq: 1,
      textarea: "",
      position: "left"
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    selectionChange(val) {
      this.multipleSelection = val;
    },
    changeValue(value) {
      this.su_isExtensionCodeReq = value;
    },
    async saveSet() {
      const partData = {
        su_isExtensionCodeReq: this.su_isExtensionCodeReq,
        userType: "下单端"
      };
      const priceRes = await this.$http.post(
        `/setup/setFreshmanPrice/${this.su_vipInitPrice}`
      );
      const awardRes = await this.$http.post(
        `/setup/extensionAward/${this.su_extensionAward}`
      );
      const codeRes = await this.$http.post(`/setup/isExtCodeReq/${partData}`);
      if (priceRes.statusCode && awardRes.statusCode && codeRes.statusCode) {
        this.$message({
          type: "suceess",
          message: "保存成功",
          offset: 10
        });
      }
    },
    async sendNotice() {
      const res = await this.$http.post(`/setup/setRecvAnno/${this.textarea}`);
      if (res.statusCode) {
        this.$message({
          type: "suceess",
          message: "发布成功",
          offset: 10
        });
      }
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
      display: inline-block;
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