'use client'

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ChartDataRecord } from "@/utils/charts";
import { ApexOptions } from "apexcharts";
import React from "react";
import getPlayersSummaryData from "@/utils/getSummary";



type SummaryPageState = {
  options: ApexOptions
  sumData: ChartDataRecord
}

const colors = ["#0f0", "#f00"];

export class SummaryPage extends React.Component<
  ChartDataRecord, 
  SummaryPageState
> {
  constructor() {
    super({});
    const sumData: ChartDataRecord = getPlayersSummaryData();
 
    this.state = {
      sumData: sumData,
      options: {
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        fill: {
          opacity: 1
        },
      },
    };
    
  }

  render() {
    return (
      <div id="chart">
      <ReactApexChart 
        options={{
          ...this.state.options,
          labels: this.state.sumData['wonLost'].categories,
          yaxis: {
            title: {
              text: 'Matches'
            }
          } 
        }} 
        series={this.state.sumData['wonLost'].series} 
        type="bar" height={350} width='100%' />
      <ReactApexChart 
        options={{
          ...this.state.options,
          labels: this.state.sumData['ratio'].categories,
          yaxis: {
            title: {
              text: 'Matches'
            }
          } 
        }} 
        series={this.state.sumData['ratio'].series} 
        type="bar" height={350} width='100%' />
      </div>
    );
  }
}

      
