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
          "当天订单量",
          "当天成功订单量",
          "当天会员注册量",
          "当天交易量",
          "总订单量",
          "总成功订单量",
          "当天流水量",
          "总流水量"
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
            { value: 435, name: "会员量" },
            { value: 679, name: "订单总成功量" },
            { value: 1248, name: "订单总量", selected: true }
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
            { value: 335, name: "当天订单量" },
            { value: 310, name: "当天成功订单量" },
            { value: 234, name: "当天会员注册量" },
            { value: 135, name: "当天交易量" },
            { value: 1048, name: "总订单量" },
            { value: 251, name: "总成功订单量" },
            { value: 147, name: "当天流水量" },
            { value: 102, name: "总流水量" }
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
      const res = await this.$http.get("/admin/init");
      this.data = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.pie {
  width: 1200px;
  height: 800px;
  margin: 0 auto;
}
</style>