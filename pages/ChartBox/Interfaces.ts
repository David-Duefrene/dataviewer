export interface ChartData {
	date: number;
	value: number;
}

export interface ChartBoxData {
	data: ChartData[];
	name: string;
}

export default interface ChartBoxProps {
	data: ChartBoxData[]
}
