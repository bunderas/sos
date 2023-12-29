import { ChartDataRecord, ChartDataSerie } from "./charts";
import { MatchType } from "./matches";

// series: [{
//   name: 'Net Profit',
//   data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
// }, {
//   name: 'Revenue',
//   data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
// },

type SummaryResultType = {
  won:number,
  lost: number,
  playerName: string,
}

export default function getPlayersSummaryData(): ChartDataRecord{
  const matches: MatchType[] = require('./../../public/data/allMatches.json');

  let result: Record<string, SummaryResultType> ={}
  matches.forEach((oneMatch) => {
    if (result[oneMatch.won.id] == undefined){
      result[oneMatch.won.id] = createPlayerObject(oneMatch.won.displayName);
    }
    result[oneMatch.won.id]['won']++;
    
    if (result[oneMatch.lost.id] == undefined){
      result[oneMatch.lost.id] = createPlayerObject(oneMatch.lost.displayName);
    }
    result[oneMatch.lost.id]['lost']++;
  })
  console.log('utils/getSummary.ts [24] :: result : ', result)

  // let radar: ChartDataType = {}
  let serieWonLost: ChartDataSerie[] = [
    {
      name: 'Won',
      data: []
    },
    {
      name: 'Lost',
      data: []
    },
  ]
  let serieRatio: ChartDataSerie[] = [
    {
      name: 'Win Ratio',
      data: []
    },
  ]
  let categories: string[] =[];
  Object.entries(result).forEach((onePlayer) => {
    const [key, value] = onePlayer
    serieWonLost[0].data.push(value.won)
    serieWonLost[1].data.push(value.lost)
    serieRatio[0].data.push(value.won/value.lost)
    categories.push(value.playerName)
  })
  console.log('utils/getSummary.ts [55] :: serie : ', serieWonLost)
  return {
    'wonLost': {
      series: serieWonLost,
      categories
    },
    'ratio': {
      series: serieRatio,
      categories
    },

  } 
  
}

function createPlayerObject(name: string){
  return {won: 0, lost: 0, playerName: name }
}
