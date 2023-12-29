'use client'
import { PlayerPage } from "@/charts/PlayerPage";
import { SummaryPage } from "@/charts/SummaryPage";
import { Container } from "@mui/material";

export default function ContentHolder(props: {playerId: string}){
  
  return(
    <Container maxWidth="sm">
      {
        (props.playerId === 'home') ?
        <SummaryPage/>
        :
        <PlayerPage 
          id={props.playerId}
        />
      }
    </Container>
  )
}