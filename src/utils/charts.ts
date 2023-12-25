export type RadarType ={
  series: RadarSerie[],
  // series: ApexAxisChartSeries,
  categories: string[]
}

export type RadarSerie = {
  name: string,
  data: number[]
}

