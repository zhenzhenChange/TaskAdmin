<template>
  <el-container class="container">
    <el-aside class="aside">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>下单会员
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">下单会员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>接单会员
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>微信订单管理
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>财务管理
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-setting"></i>总代管理
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-setting"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-setting"></i>仪表盘
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main class="home-order-member">
        <el-table :data="tableData" stripe border class="w-100">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="order-member">
                <el-form-item label="注册日期">
                  <span>{{ props.row.date }}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="余额">
                  <span>{{ props.row.balance }} ￥</span>
                </el-form-item>
                <el-form-item label="总充值">
                  <span>{{ props.row.recharge }} ￥</span>
                </el-form-item>
                <el-form-item label="当天充值">
                  <span>{{ props.row.currentRecharge }} ￥</span>
                </el-form-item>
                <el-form-item label="总接单">
                  <span>{{ props.row.receipt }}</span>
                </el-form-item>
                <el-form-item label="总成功率">
                  <span>{{ props.row.successRate }} %</span>
                </el-form-item>
                <el-form-item label="当天接单">
                  <span>{{ props.row.currentReceipt }}</span>
                </el-form-item>
                <el-form-item label="当天成功率">
                  <span>{{ props.row.currentSuccessRate }} %</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column width="120" label="注册日期" prop="date" sortable></el-table-column>
          <el-table-column width="120" label="手机号" prop="phone" sortable></el-table-column>
          <el-table-column width="150" label="余额（单位：￥）" prop="balance"></el-table-column>
          <el-table-column width="150" label="总充值（单位：￥）" prop="recharge"></el-table-column>
          <el-table-column width="400">
            <template slot="header">
              <el-input type="text" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >修改微信下单价格</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >修改密码</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >禁止账户登录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2019-03-23",
          phone: "18278459999",
          balance: "3245.31",
          recharge: "2351.00",
          currentRecharge: "1300.00",
          receipt: "39",
          successRate: "45",
          currentReceipt: "3",
          currentSuccessRate: "66"
        },
        {
          date: "2019-03-23",
          phone: "18278459999",
          balance: "3245.31",
          recharge: "2351.00",
          currentRecharge: "1300.00",
          receipt: "39",
          successRate: "45",
          currentReceipt: "3",
          currentSuccessRate: "66"
        },
        {
          date: "2019-03-23",
          phone: "18278459999",
          balance: "3245.31",
          recharge: "2351.00",
          currentRecharge: "1300.00",
          receipt: "39",
          successRate: "45",
          currentReceipt: "3",
          currentSuccessRate: "66"
        },
        {
          date: "2019-03-23",
          phone: "18278459999",
          balance: "3245.31",
          recharge: "2351.00",
          currentRecharge: "1300.00",
          receipt: "39",
          successRate: "45",
          currentReceipt: "3",
          currentSuccessRate: "66"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.order-member {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    span {
      color: rgb(219, 17, 17);
    }
  }
}

.container {
  height: 100%;
  border: 1px solid #eee;
  .aside {
    width: 200px !important;
    background-color: rgb(238, 241, 246);
  }
  .header {
    text-align: right;
    font-size: 12px;
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }
}
</style>