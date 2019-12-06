<template>
  <el-container class="vh-100">
    <el-aside class="home-aside">
      <el-menu router :default-active="$route.path" unique-opened>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>会员中心
          </template>
          <el-menu-item-group>
            <template slot="title">下单会员</template>
            <el-menu-item index="/members/part">会员列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">接单会员</template>
            <el-menu-item index="/members/clerk">会员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-shopping-bag-1"></i>订单管理
          </template>
          <el-menu-item-group>
            <template slot="title">微信订单管理</template>
            <el-menu-item index="/orders/record">订单记录</el-menu-item>
            <el-menu-item index="/orders/appeal">申诉管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group class="solot">
            <template slot="title">仪表盘</template>
            <el-menu-item index="/charts/data">数据总控</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">财务管理</template>
            <el-menu-item index="/financial/capital">资金流水</el-menu-item>
            <el-menu-item index="/financial/customer">人工充值</el-menu-item>
            <el-menu-item index="/financial/withdrawal">提现处理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">总代管理</template>
            <el-menu-item index="/agency/agent">总代中心</el-menu-item>
            <el-menu-item index="/agency/create">添加总代</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">系统设置</template>
            <el-menu-item index="/settings/part">下单端设置</el-menu-item>
            <el-menu-item index="/settings/clerk">接单端设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="home-header">
        <el-button @click="logout">退出登录</el-button>
      </el-header>
      <el-main>
        <!-- :key="$route.path" 根据路由区分组件 -->
        <router-view :key="$route.path" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.home-aside {
  color: #333;
  width: 200px !important;
  background-color: rgb(238, 241, 246);
}

.home-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
}
</style>