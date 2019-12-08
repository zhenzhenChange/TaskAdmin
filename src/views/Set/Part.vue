<template>
  <el-tabs :tab-position="'left'" class="vh-80">
    <el-tab-pane label="下单会员初始参数设置">
      <el-row>
        <el-col :span="12">
          <el-form
            ref="form"
            :model="form"
            label-width="140px"
            class="ml-50"
            @submit.native.prevent="partSetting"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="会员注册初始价格">
                  <el-input v-model="form.su_vipInitPrice"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="邀请奖励初始设置">
                  <el-input v-model="form.su_extensionAward"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1">
                <el-form-item label="邀请码是否为必填项">
                  <el-switch v-model="form.su_isExtensionCodeReq"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item>
                  <el-button type="primary" native-type="submit">保存</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form
            label-width="140px"
            :label-position="'top'"
            class="ml-50"
            @submit.native.prevent="sendNotice"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="发布公告">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    placeholder="请输入内容"
                    v-model="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="mt-20">
              <el-col :span="12">
                <el-form-item>
                  <el-button type="primary" native-type="submit">发布</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="批量调节价格百分比">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
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
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      form: {
        su_vipInitPrice: "",
        su_extensionAward: "",
        su_isExtensionCodeReq: ""
      },
      textarea: ""
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    partSetting() {
      // console.log("submit!");
    },
    sendNotice() {}
  }
};
</script>