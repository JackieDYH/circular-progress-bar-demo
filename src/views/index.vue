<script setup>
import * as echarts from "echarts";
import { ref, onMounted, warn } from "vue";
import slider from "../components/slider.vue";
const total = ref(100);
let pieData = ref(40);
const warningStatus = ref(1);

// 获取图片
// const getAssetsImages = (name)=> {
//   return new URL(`/src/assets/img/${name}`, import.meta.url).href;
// }
// 加载仪表盘
const getPieCharts = (num) => {
  console.log(total, pieData);
  echarts.init(document.getElementById("pieCharts")).dispose();
  var chartDom = document.getElementById("pieCharts");
  var myChart = echarts.init(chartDom);
  var pieConf;
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
};
// 叠加仪表盘底图
const getPieChartsShadow = (num) => {
  console.log(total, pieData);
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
};

// 滚动条
const getWarningNum = (data) => {
  console.log("接受传参", data);
  if (data == 0) {
    warningStatus.value = 0;
  } else if (data > 0 && data <= 50) {
    warningStatus.value = 1;
  } else {
    warningStatus.value = 2;
  }
  getPieCharts(data);
};

onMounted(() => {
  getPieCharts(pieData.value);
  getPieChartsShadow(pieData.value);
});
</script>

<template>
  <div class="content">
    <div class="chartsBox">
      <div id="pieCharts"></div>
      <div id="pieChartsShadow"></div>
    </div>
    <div class="warningInfo">
      <img v-show="warningStatus == 0" src="../assets/img/weizhi.png" alt="" />
      <img v-show="warningStatus == 2" src="../assets/img/baojing.png" alt="" />
      <img
        v-show="warningStatus == 1"
        src="../assets/img/zhengchang.png"
        alt=""
      />
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
    <slider
      :min="0"
      :max="100"
      :pieData="pieData"
      class="scrollLine"
      @getWarningNum="getWarningNum"
    ></slider>
  </div>
</template>

<style scoped lang="less">
@media (min-width: 1024px) {
  .content {
    width: 200px;
  }
  .chartsBox {
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

  .scrollLine {
    width: 200px;
  }
}
</style>
