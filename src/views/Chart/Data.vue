<template>
  <div ref="pieContainer" class="pie"></div>
</template>

<script>
const echarts = require("echarts");
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    var myChart = echarts.init(this.$refs.pieContainer);
    myChart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: [
          "当天接单总量",
          "当天成功订单总量",
          "当天发布订单总量",
          "当天充值总额",
          "当天提现总额",
          "当天发布佣金总额",
          "当天下单注册量",
          "当天接单注册量",
          "当天接单总人数",
          "当天下单总人数",
          "接单总量",
          "成功订单总量",
          "发单总量",
          "充值总额",
          "提现总额",
          "下单注册总量",
          "接单注册总量",
          "接单总人数",
          "下单总人数",
          "利润"
        ]
      },
      series: [
        {
          name: "数据中心",
          type: "pie",
          selectedMode: "single",
          radius: [0, "30%"],
          label: {
            normal: {
              position: "inner"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 1248, name: "订单总量", selected: true },
            { value: 435, name: "会员总人数" },
            { value: 679, name: "订单总成功量" },
            { value: 679, name: "充值总额" },
            { value: 679, name: "提现总额" },
            { value: 679, name: "利润" }
          ]
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
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          data: [
            { value: 335, name: "当天接单总量" },
            { value: 310, name: "当天成功订单总量" },
            { value: 234, name: "当天发布订单总量" },
            { value: 135, name: "当天充值总额" },
            { value: 1048, name: "当天提现总额" },
            { value: 251, name: "当天发布佣金总额" },
            { value: 147, name: "当天下单注册量" },
            { value: 102, name: "当天接单注册量" },
            { value: 102, name: "当天接单总人数" },
            { value: 102, name: "当天下单总人数" },
            { value: 102, name: "下单注册总量" },
            { value: 102, name: "接单注册总量" },
            { value: 102, name: "接单总量" },
            { value: 102, name: "发单总量" },
            { value: 102, name: "接单总人数" },
            { value: 102, name: "下单总人数" }
          ]
        }
      ]
    });
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/init");
      console.log(res);
      this.data = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.pie {
  width: 1600px;
  height: 800px;
  margin: 0 auto;
}
</style>
