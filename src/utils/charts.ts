export type ChartDataType ={
  series: ChartDataSerie[],
  categories: string[]
}

export type ChartDataSerie = {
  name: string,
  data: number[]
}

export type ChartDataRecord = Record<string, ChartDataType>
