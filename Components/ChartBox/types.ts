export interface ChartData {
	date: string
	value: number
}

export interface ChartBoxData {
	data: ChartData[]
	name: string
	lineColor?: string
}
