<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total hours today"
            type="gradient-red"
            :sub-title="totalHours"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 3.48%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <!-- <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 12.18%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-danger mr-2">
                <i class="fa fa-arrow-down"></i> 5.72%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 54.8%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div> -->
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                  <h5 class="h3 text-white mb-0">Your working hours</h5>
                </div>
                <div class="col">
                  <ul class="nav nav-pills justify-content-end">
                    <li class="nav-item mr-2 mr-md-0">
                      <a
                        class="nav-link py-2 px-3"
                        href="#"
                        :class="{ active: bigLineChart.activeIndex === 0 }"
                        @click.prevent="Start()"
                        @click="toggleTimer"
                      >
                        <!-- <p ></p> -->
                        <span class="d-none d-md-block">{{timerRunning ? 'Pause' : 'Start'}}</span>
                        <span class="d-md-none">{{timerRunning ? 'P' : 'S'}}</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <h1 class="textTime">{{ (timeCurr / 1000).toFixed(0) }}</h1>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link py-2 px-3"
                        href="#"
                        :class="{ active: bigLineChart.activeIndex === 1 }"
                        @click.prevent="Finish()"
                        @click="clearTimer"
                      >
                        <span class="d-none d-md-block">Finish</span>
                        <span class="d-md-none">F</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <div class="chart-area">
              <canvas :height="350" :id="salesChartID"></canvas>
            </div>
          </card>
        </div>

        <!-- <div class="col-xl-4">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">
                    Performance
                  </h6>
                  <h5 class="h3 mb-0">Total hours</h5>
                </div>
              </div>
            </template>
            <div class="chart-area">
              <canvas :height="350" :id="ordersChartID"></canvas>
            </div>
          </card>
        </div> -->
      </div>
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-5">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <page-visits-table></page-visits-table>
        </div>
        <div class="col-xl-4">
          <social-traffic-table></social-traffic-table>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Charts
import { ordersChart } from "@/components/Charts/Chart";
import Chart from "chart.js";

import PageVisitsTable from "./Dashboard/PageVisitsTable";
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import axios from "axios";
import moment from "moment";
// let chart;

export default {
  components: {
    PageVisitsTable,
    SocialTrafficTable,
  },
  data() {
    return {
    timeCurr: 0,
    interval: null,
    offset: null,
    timerRunning: false,


      totalHours:0,
      salesChartID: "salesChart",
      ordersChartID: "ordersChart",
      recordData: "",
      // schedules:[],
      bigLineChart: {
        allData: [
        ],
        activeIndex: 0,
      },
    };
  },
    watch: {
    timerRunning(value) {
      if (value) {
        this.runTimer();
      } else {
        this.pauseTimer();
      }
    }
  },

  methods: {
    async Start() {
        let record = {regType:"MANUAL"};
        let response = await axios.post("https://se-backend-hlwhr.herokuapp.com/v1/start",record); //.then(response => this.recordData = response.data)
        console.log("HEREE1: ", response);
        console.log("HEREE3: ", response.data.data);
        this.recordData = response.data.data;
    },
    async Finish() {
        let response = await axios.post("https://se-backend-hlwhr.herokuapp.com/v1/end/"+this.recordData.id);
        console.log("HEREE2: ", response.data)
        ordersChart.createChart(this.ordersChartID,this.allData);

    },


    toggleTimer() {
      this.timerRunning = !this.timerRunning;
    },
    runTimer() {
      if (this.timerRunning) {
        this.interval = setInterval(this.update, 1000);
        this.offset = moment();
      }
    },
    update() {
      this.timeCurr += this.delta();
    },
    delta() {
      let now = moment();
      var passed = now - this.offset;
      this.offset = now;
      return passed;
    },
    clearTimer() {
      this.timeCurr = 0;
    },
    pauseTimer() {
      clearInterval(this.interval);
    }


  },
  async mounted() {
    //  AllHours() {
    let response = await axios.get("https://se-backend-hlwhr.herokuapp.com/v1/schedules");
    console.log("HEREE4: ", response.data.data);
    let arrIns = response.data.data;
    let arrRes = [];
    for (let i = 0; i < arrIns.length; i++) {
      arrRes.push(arrIns[i].hoursTotal);
    }
    console.log("arrRes: ", arrRes);
    this.bigLineChart.allData.push(arrRes);
    // }

    response = await axios.get("https://se-backend-hlwhr.herokuapp.com/v1/get-day-hours");
    this.totalHours = response.data.data;
    console.log(this.totalHours);



    new Chart(
      document.getElementById(this.salesChartID).getContext("2d"),
      {
        type: "line",
        data: {
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Performance",
              tension: 0.4,
              borderWidth: 4,
              borderColor: "#5e72e4",
              pointRadius: 0,
              backgroundColor: "transparent",
              data: this.bigLineChart.allData[0],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            enabled: true,
            mode: "index",
            intersect: false,
          },
          scales: {
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 0,
                  fontColor: "#8898aa",
                  fontSize: 13,
                  fontFamily: "Open Sans",
                },
              },
            ],
            xAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 10,
                  fontColor: "#8898aa",
                  fontSize: 13,
                  fontFamily: "Open Sans",
                },
              },
            ],
          },
          layout: {
            padding: 0,
          },
        },
      }
    );
    
  },
};
</script>
<style>
.textTime {
  color:#f8f9fe
}
</style>














