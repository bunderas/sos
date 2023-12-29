'use client'

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ChartDataRecord, ChartDataType } from "@/utils/charts";
import { ApexOptions } from "apexcharts";
import React from "react";
import getPlayersRadarData from "@/utils/getRadarData";
// import ReactApexChart from "react-apexcharts";

type PlayerPageProps = {
  id: string;
}

type PlayerPageState = {
  options: ApexOptions,
}

const colors = ["#0f0", "#f00"];

export class PlayerPage extends React.Component<PlayerPageProps, PlayerPageState> {
  private getData(id: string){
    
  }

  constructor(props: PlayerPageProps) {
    super(props);
 
    this.state = {
      options: {
        chart: {
          height: 351,
          width: 100,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        title: {
          text: 'Matches agains others'
        },
        stroke: {
          width: 2,
          colors: colors,
        },
        fill: {
          opacity: 0.1,
          colors: colors,
        },
        markers: {
          colors: colors,
          size: 4,
          hover: {
            size: 8
          }
        },
        legend: {
          show: true,
          labels: {
            colors: undefined,
            useSeriesColors: false
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 10,
            strokeColor: '#fff',
            fillColors: colors,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
        }
      },
    };
    
  }

  render() {
    const data:ChartDataRecord = getPlayersRadarData(this.props.id)
    return (
      <div id="chart">
      <ReactApexChart 
        options={{
          ...this.state.options,
          labels: data['radar'].categories
        }} 
        series={data['radar'].series} 
        type="radar" height={350} width={350} />
      </div>
    );
  }
}

      
