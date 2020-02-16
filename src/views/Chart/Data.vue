<template>
  <div>
    <el-date-picker
      type="date"
      v-model="date"
      :clearable="false"
      @change="changeDate"
      placeholder="选择日期"
    >
    </el-date-picker>
    <el-tabs>
      <el-tab-pane label="平台报表">
        <div ref="pieOrder" class="pie-order"></div>
      </el-tab-pane>
      <el-tab-pane label="财务报表">
        <div ref="pieMoney" class="pie-money"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  data() {
    return {
      data: [],
      date: this.$options.filters.onlyDate(new Date()),
    };
  },
  mounted() {
    this.PieChartOrder();
    this.PieChartMoney();
  },
  methods: {
    PieChartOrder(date) {
      const myChart = echarts.init(this.$refs.pieOrder);
      myChart.setOption({
        tooltip: { trigger: "item", formatter: "{a} <br/>{b}: {c} ({d}%)" },
        legend: {
          orient: "vertical",
          x: "left",
          data: [
            "当天接单总量",
            "当天成功订单总量",
            "当天发布订单总量",
            "当天下单注册量",
            "当天接单注册量",
            "当天接单总人数",
            "当天下单总人数",
            "接单总量",
            "成功订单总量",
            "发单总量",
            "下单注册总量",
            "接单注册总量",
            "接单总人数",
            "下单总人数",
          ],
        },
        series: [
          {
            name: "数据中心",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: { normal: { position: "inner" } },
            labelLine: { normal: { show: false } },
          },
          {
            name: "数据中心",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                shadowBlur: 3,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: "#999",
                padding: [0, 7],
                rich: {
                  a: { color: "#999", lineHeight: 22, align: "center" },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0,
                  },
                  b: { fontSize: 16, lineHeight: 33 },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2,
                  },
                },
              },
            },
          },
        ],
      });
      this.$http
        .post("/admin/init", { date: date ? date : this.date })
        .then(result => {
          const data = result.data;
          myChart.hideLoading();
          myChart.setOption({
            series: [
              {
                data: [
                  {
                    value: data.all_get_order + data.all_put_order,
                    name: "订单总量",
                    selected: true,
                  },
                  {
                    value: data.put_register + data.get_register,
                    name: "会员总人数",
                  },
                  {
                    value: data.all_success_order + data.all_put_success_order,
                    name: "订单总成功量",
                  },
                ],
              },
              {
                data: [
                  { value: data.today_all_get_order, name: "当天接单总量" },
                  {
                    value: data.today_all_put_success_order + data.today_all_success_order,
                    name: "当天成功订单总量",
                  },
                  { value: data.today_all_put_order, name: "当天发布订单总量" },
                  { value: data.today_put_register, name: "当天下单注册量" },
                  { value: data.today_get_register, name: "当天接单注册量" },
                  {
                    value: data.today_get_order_number,
                    name: "当天接单总人数",
                  },
                  {
                    value: data.today_put_order_number,
                    name: "当天下单总人数",
                  },
                  { value: data.put_register, name: "下单注册总量" },
                  { value: data.get_register, name: "接单注册总量" },
                  { value: data.all_get_order, name: "接单总量" },
                  { value: data.all_put_order, name: "发单总量" },
                  { value: data.get_order_number, name: "接单总人数" },
                  { value: data.put_order_number, name: "下单总人数" },
                ],
              },
            ],
          });
        })
        .catch();
    },
    PieChartMoney(date) {
      const myChart = echarts.init(this.$refs.pieMoney);
      myChart.setOption({
        tooltip: { trigger: "item", formatter: "{a} <br/>{b}: {c} ({d}%)" },
        legend: {
          orient: "vertical",
          x: "left",
          data: [
            "利润",
            "充值总额",
            "提现总额",
            "发布佣金总额",
            "当天充值总额",
            "当天提现总额",
            "当天发布佣金总额",
          ],
        },
        series: [
          {
            name: "数据中心",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: { normal: { position: "inner" } },
            labelLine: { normal: { show: false } },
          },
          {
            name: "数据中心",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                shadowBlur: 3,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: "#999",
                padding: [0, 7],
                rich: {
                  a: { color: "#999", lineHeight: 22, align: "center" },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0,
                  },
                  b: { fontSize: 16, lineHeight: 33 },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2,
                  },
                },
              },
            },
          },
        ],
      });
      this.$http
        .post("/admin/init", { date: date ? date : this.date })
        .then(result => {
          const data = result.data;
          myChart.hideLoading();
          myChart.setOption({
            series: [
              {
                data: [
                  { value: data.profit, name: "利润" },
                  { value: data.all_recharge, name: "充值总额" },
                  { value: data.all_withdraw, name: "提现总额" },
                ],
              },
              {
                data: [
                  { value: data.all_put_price, name: "发布佣金总额" },
                  { value: data.today_all_recharge, name: "当天充值总额" },
                  { value: data.today_all_withdraw, name: "当天提现总额" },
                  { value: data.today_all_put_price, name: "当天发布佣金总额" },
                ],
              },
            ],
          });
        })
        .catch();
    },
    changeDate(date) {
      if (date) {
        const formatDate = this.$options.filters.onlyDate(date);
        this.PieChartOrder(formatDate);
        this.PieChartMoney(formatDate);
      } else {
        this.PieChartOrder(this.$options.filters.onlyDate(new Date()));
        this.PieChartMoney(this.$options.filters.onlyDate(new Date()));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pie-order {
  width: 1300px;
  height: 800px;
  margin: 0 auto;
}

.pie-money {
  width: 1300px;
  height: 550px;
  margin: 0 auto;
}
</style>
