<template>
  <el-container class="vh-100">
    <el-aside class="home-aside">
      <el-menu router :default-active="$route.path" unique-opened>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user"></i>会员管理</template>
          <el-menu-item-group>
            <el-menu-item index="/members">会员中心</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-shopping-bag-1"></i>订单管理</template>
          <el-menu-item-group>
            <el-menu-item index="/orders">订单中心</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/chart">数据总控</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
          <el-menu-item-group>
            <el-menu-item index="/financial">流水中心</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/agency">总代中心</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/settings/part">下单端设置</el-menu-item>
            <el-menu-item index="/settings/clerk">接单端设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="home-header">
        <span class="userID" v-show="userID">管理员：{{ userID }}</span>
        <el-button @click="logout" type="primary" round>注销</el-button>
      </el-header>
      <el-main>
        <keep-alive>
          <!-- :key="$route.path" 根据路由区分组件 -->
          <router-view :key="$route.path" />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    logout() {
      this.$router.push("/");
      localStorage.removeItem("userID");
      localStorage.removeItem("sonPumpRation");
    },
  },
  computed: {
    ...mapState({ userID: state => state.userID }),
  },
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

.el-menu-item {
  color: gray;
  font-size: 12px;
}

.userID {
  float: left;
  font-size: 18px;
  margin-left: 10px;
}
</style>
