// 登录
import Login from "../views/Login.vue";

// 后台
import Home from "../views/Home.vue";

// 会员中心
import MemberCenter from "../views/Member/MemberCenter.vue";

// 订单中心
import OrderCenter from "../views/Order/OrderCenter.vue";

import Data from "../views/Chart/Data.vue";

// 系统设置
import FinancialCenter from "../views/Financial/FinancialCenter.vue";

import AgencyCenter from "../views/Agency/AgencyCenter.vue";

import SetPart from "../views/Set/Part.vue";
import SetClerk from "../views/Set/Clerk.vue";

const routes = [
  { path: "/", name: "login", component: Login, meta: { isPublic: true } },
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      { path: "/members", name: "MemberCenter", component: MemberCenter },
      { path: "/orders", name: "OrderCenter", component: OrderCenter },
      { path: "/chart", name: "chart", component: Data },
      { path: "/financial", name: "FinancialCenter", component: FinancialCenter },
      { path: "/agency", name: "AgencyCenter", component: AgencyCenter },
      { path: "/settings/part", name: "setPart", component: SetPart },
      { path: "/settings/clerk", name: "setClerk", component: SetClerk },
    ],
  },
];

export default routes;
