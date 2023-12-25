import { MatchType } from "./matches";
import { PlayerType } from "./player";
import { RadarSerie, RadarType } from "./charts";

type PlayerRadarResultType = {
  won:number,
  lost: number,
  opponent: string
}



export default function getPlayersRadarData(){
  const players: PlayerType[] = require('./../../public/data/players.json');
  const matches: MatchType[] = require('./../../public/data/allMatches.json');


  let result: Record<string, Record<string, PlayerRadarResultType>> = {}
  players.forEach(onePlayer => {
    matches.forEach(oneMatch => {
      if (oneMatch.won.id === onePlayer.id) {
        if (result[onePlayer.id] == undefined){
          result[onePlayer.id] = createPlayerObject(onePlayer.id, players);
        }
        result[onePlayer.id][oneMatch.lost.id]['won']++;
      }
      if (oneMatch.lost.id === onePlayer.id) {
        if (result[onePlayer.id] == undefined){
          result[onePlayer.id] = createPlayerObject(onePlayer.id, players);
        }
        result[onePlayer.id][oneMatch.won.id]['lost']++;
      }
    })
  })
  let radar: Record<string, RadarType> = {}
  Object.entries(result).forEach((onePlayer) => {
    const [key, value] = onePlayer
    let series: RadarSerie[] = [
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
    Object.entries(value).forEach((oneSerie)=>{
      const [key, value] = oneSerie
      series[0].data.push(value.won)
      series[1].data.push(value.lost)
      categories.push(value.opponent)
    })
    radar[key] = {
      series: series,
      categories: categories
    }
  })
  // console.log('utils/getRadarData.ts [63] :: radar : ', radar)
  return radar;
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
