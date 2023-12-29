import { MatchType } from "./matches";
import { PlayerType } from "./player";
import { ChartDataSerie, ChartDataType } from "./charts";

type PlayerRadarResultType = {
  won:number,
  lost: number,
  opponent: string
}



export default function getPlayersRadarData(id: string){
  const players: PlayerType[] = require('./../../public/data/players.json');
  const matches: MatchType[] = require('./../../public/data/allMatches.json');


  let radarResult: Record<string, PlayerRadarResultType> = {}
  radarResult = createPlayerObject(id, players);
  // players.forEach(onePlayer => {
  matches.forEach(oneMatch => {
    if (oneMatch.won.id === id) {
      radarResult[oneMatch.lost.id]['won']++;
    }
    if (oneMatch.lost.id === id) {
      radarResult[oneMatch.won.id]['lost']++;
    }
  })
  console.log('utils/getRadarData.ts [20] :: result : ', radarResult)
  // })
  let result: Record<string, ChartDataType> = {}
  let series: ChartDataSerie[] = [
    {
      name: 'Won',
      data: []
    },
    {
      name: 'Lost',
      data: []
    },
  ]
  let categories: string[] =[];
  Object.entries(radarResult).forEach((oneSerie)=>{
    const [key, value] = oneSerie
    series[0].data.push(value.won)
    series[1].data.push(value.lost)
    categories.push(value.opponent)
  })
  result['radar'] = {
    series: series,
    categories: categories
  }
  return result;
}

function createPlayerObject(id: string, players:PlayerType[]){
  let result:Record<string, PlayerRadarResultType> = {}
  players.forEach(onePlayer => {
    if (onePlayer.id !== id){
      result[onePlayer.id] = {won: 0, lost: 0, opponent: onePlayer.displayName };
    }
  });
  return result;
}
