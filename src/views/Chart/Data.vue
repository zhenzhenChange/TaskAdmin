<template>
  <div>
    <div ref="pieContainer" class="pie"></div>
    <div ref="radarContainer" class="radar"></div>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  data() {
    return {};
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.pieContainer);
    // 绘制图表
    myChart.setOption({
      itemStyle: {
        normal: {
          shadowBlur: 200, // 阴影的大小
          shadowOffsetX: 0, // 阴影水平方向上的偏移
          shadowOffsetY: 0, // 阴影垂直方向上的偏移
          shadowColor: "rgba(0, 0, 0, 0.5)" // 阴影颜色
        }
      },
      backgroundColor: "#2c343c", //设置图标的背景色,
      label: {
        normal: {
          fontStyle: "italic" //文字字体的风格
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.3)" //设置标签的视觉引导线
          }
        }
      },
      series: [
        {
          name: "访问来源", //系列名称, 用于toolitp的显示
          type: "pie", //图形的类型
          radius: "150", //饼图的半径
          roseType: "angle", //通过roseType绘制南丁格尔图
          data: [
            //数据
            { value: 235, name: "视频广告" },
            { value: 274, name: "联盟广告" },
            { value: 310, name: "邮件营销" },
            { value: 335, name: "直接访问" },
            { value: 400, name: "搜索引擎" }
          ],
          itemStyle: {
            //设置每个item的颜色
            normal: {
              color: function(params) {
                //params是一个对象, 传入的是seriesIndex, dataIndex, data, value 等各个参数。
                var colorList = [
                  "#C1232B",
                  "#B5C334",
                  "#FCCE10",
                  "#E87C25",
                  "#27727B",
                  "#FE8463",
                  "#9BCA63",
                  "#FAD860",
                  "#F3A43B",
                  "#60C0DD",
                  "#D7504B",
                  "#C6E579",
                  "#F4E001",
                  "#F0805A",
                  "#26C0C0"
                ];
                return colorList[params.dataIndex];
              },
              shadowBlur: 100,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });

    var myChart2 = echarts.init(this.$refs.radarContainer);
    myChart2.setOption({
      title: {
        text: "预算 vs 开销",
        subtext: "纯属虚构"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        orient: "vertical",
        x: "right",
        y: "bottom",
        data: ["预算分配", "实际开销"]
      },
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      polar: [
        //雷达图必须设置polar
        {
          indicator: [
            {
              text: "销售",
              max: 6000,
              min: 0
            },
            {
              text: "管理",
              max: 16000,
              min: 0
            },
            {
              text: "信息技术",
              max: 30000,
              min: 0
            },
            {
              text: "客服",
              max: 38000,
              min: 0
            },
            {
              text: "研发",
              max: 52000,
              min: 0
            },
            {
              text: "市场",
              max: 25000,
              min: 0
            }
          ]
        }
      ],
      calculable: true,
      series: [
        {
          name: "",
          type: "radar",
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: "预算分配"
            }
          ]
        },
        {
          name: "",
          type: "radar",
          data: [
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: "实际开销"
            }
          ]
        }
      ]
    });
  }
};
</script>

<style lang="scss" scoped>
.pie,
.radar {
  width: 500px;
  height: 500px;
  float: left;
  margin-left: 100px;
}
</style>