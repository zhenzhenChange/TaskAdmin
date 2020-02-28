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
              active-text="是"
              inactive-text="否"
              :active-value="true"
              @change="changeValue"
              :inactive-value="false"
              v-model="defaultSet.su_isExtensionCodeReq"
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
            rows="6"
            type="textarea"
            placeholder="请输入内容"
            v-model="defaultSet.su_giveAnno"
          ></el-input>
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      multipleSelection: [],
      defaultSet: {
        su_vipInitPrice: "",
        su_extensionAward: "",
        su_isExtensionCodeReq: "",
        su_giveAnno: "",
      },
      position: "top",
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 300, 400],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState({ userID: state => state.userID }),
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/admin/setup/get");
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
      const res = await this.$http.post(`/admin/setup/defaultPartSet`, {
        uid: this.userID,
        su_vipInitPrice: this.defaultSet.su_vipInitPrice,
        su_extensionAward: this.defaultSet.su_extensionAward,
        su_isExtensionCodeReq: this.defaultSet.su_isExtensionCodeReq ? 1 : 0,
      });
      if (res.status === 200 && JSON.parse(res.data.status)) {
        this.$message.success({ message: "保存成功", offset: 10 });
        this.getData();
      }
    },
    async sendNotice() {
      const res = await this.$http.post(`/admin/setup/setRelesAnno`, {
        uid: this.userID,
        su_giveAnno: this.defaultSet.su_giveAnno,
      });
      if (res.status === 200 && JSON.parse(res.data.status)) {
        this.$message.success({ message: "发布成功", offset: 10 });
        this.getData();
      }
    },
  },
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
