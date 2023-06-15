<!--
 * @Author: Jackie
 * @Date: 2023-06-12 22:05:02
 * @LastEditTime: 2023-06-15 19:07:35
 * @LastEditors: Jackie
 * @Description: 环形进度条
 * @FilePath: /circular-progress-bar-demo/src/App.vue
 * @version: 
-->
<template>
  <div id="app">
    <!-- 封装组件的方式 -->
    <!-- <HelloWorld :v="pieValue" /> -->
    <div class="warp">
      <!-- 环形进度条 -->
      <div class="chartsWrap">
        <div id="pieCharts"></div>
        <div id="pieChartsShadow"></div>
      </div>
      <!-- 状态信息 -->
      <div class="warningInfo">
        <img v-show="warningStatus == 0" src="./assets/weizhi.png" />
        <img v-show="warningStatus == 1" src="./assets/zhengchang.png" />
        <img v-show="warningStatus == 2" src="./assets/baojing.png" />
        <div class="warningText">
          <div>检测状态</div>
          <div
            :class="
              warningStatus == 0
                ? 'weizhi'
                : warningStatus == 1
                ? 'zhengchang'
                : 'baojing'
            "
          >
            {{
              warningStatus == 0 ? "未知" : warningStatus == 1 ? "正常" : "报警"
            }}
          </div>
        </div>
      </div>
    </div>
    <el-slider class="slider" v-model="pieValue"></el-slider>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      pieValue: 20,
    };
  },
  computed: {
    // 动态计算
    warningStatus() {
      if (this.pieValue == 0) {
        return 0;
      } else if (this.pieValue > 0 && this.pieValue <= 50) {
        return 1;
      } else {
        return 2;
      }
    },
  },
  watch: {
    // 监听值的变化
    pieValue(newValue, oldvalue) {
      this.getPieCharts(newValue);
    },
  },
  mounted() {
    // 初始化
    this.getPieCharts(this.pieValue);
    this.getPieChartsShadow(this.pieValue);
  },
  methods: {
    // 加载仪表盘
    getPieCharts(num) {
      // console.log(total, pieData);
      echarts.init(document.getElementById("pieCharts")).dispose();
      let chartDom = document.getElementById("pieCharts");
      let myChart = echarts.init(chartDom);
      let pieConf;
      const gaugeData = [
        {
          value: num,
          name: "异常分数",
          title: {
            offsetCenter: ["0%", "30%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-10%"],
          },
          itemStyle: {
            color: {
              type: "linear",
              name: "异常分数",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(147,114,241)",
                },
                {
                  offset: 1,
                  color: "rgba(167,142,242,.6)", // 100% 处的颜色
                },
              ],
            },
            global: false,
          },
        },
      ];
      pieConf = {
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            radius: "100%",
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
            },
            axisLine: {
              lineStyle: {
                width: 25,
                color: [[1, "rgb(230,233,241)"]],
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: gaugeData,
            title: {
              fontSize: 18,
              color: "rgb(72,72,124)",
            },
            detail: {
              width: 50,
              height: 14,
              fontSize: 40,
              color: "rgb(147,114,241)",
              formatter: "{value}%",
            },
          },
        ],
      };

      pieConf && myChart.setOption(pieConf);
    },
    // 叠加仪表盘底图
    getPieChartsShadow(num) {
      // console.log(total, pieData);
      echarts.init(document.getElementById("pieChartsShadow")).dispose();
      var chartDom = document.getElementById("pieChartsShadow");
      var myChart = echarts.init(chartDom);
      var pieConf;
      const gaugeData = [
        {
          value: 0,
          name: "异常分数",
          title: {
            show: false,
            offsetCenter: ["0%", "30%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-10%"],
          },
          min: 0,
          progress: false,
          itemStyle: {
            color: {
              type: "linear",
              name: "异常分数",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(147,114,241,0)",
                },
                {
                  offset: 1,
                  color: "rgba(167,142,242,0)", // 100% 处的颜色
                },
              ],
            },
            global: false,
          },
        },
      ];
      pieConf = {
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            radius: "100%",
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
            },
            axisLine: {
              lineStyle: {
                width: 25,
                color: [[1, "rgb(221,221,236)"]],
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: gaugeData,
            title: {
              fontSize: 18,
              color: "rgb(72,72,124)",
            },
            detail: {
              show: false,
              width: 50,
              height: 14,
              fontSize: 30,
              color: "rgb(147,114,241)",
              formatter: "{value}%",
            },
          },
        ],
      };
      pieConf && myChart.setOption(pieConf);
    },
    // demo
    init() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scope>
#app {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .slider {
    width: 200px;
  }
  .warp {
    .chartsWrap {
      width: 200px;
      height: 200px;
      position: relative;

      #pieCharts,
      #pieChartsShadow {
        width: 200px;
        height: 200px;
      }

      #pieChartsShadow {
        position: absolute;
        top: 4px;
        left: 0;
        z-index: -1;
      }
    }
    .warningInfo {
      margin-top: 16px;
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
      }

      .warningText {
        margin-left: 10px;
        color: rgb(149, 148, 179);
        font-size: 16px;

        .weizhi {
          color: rgb(155, 155, 183);
        }
        .zhengchang {
          color: rgb(129, 198, 250);
        }
        .baojing {
          color: rgb(226, 98, 94);
        }
      }
    }
  }
}
</style>
