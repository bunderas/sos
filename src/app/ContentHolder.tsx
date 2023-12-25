'use client'
import { RadarChart } from "@/charts/Radar";
import { RadarType } from "@/utils/charts";
import getPlayersRadarData from "@/utils/getRadarData";
import { Container } from "@mui/material";

export default function ContentHolder(props: {playerId: string}){
  const data:Record<string, RadarType> = getPlayersRadarData()
  
  return(
    <Container maxWidth="sm">
      {
        (props.playerId === 'home') ?
        <></>
      :
      <RadarChart 
        series={data[props.playerId].series}
        categories={data[props.playerId].categories}></RadarChart>
      }
    </Container>
  )
}