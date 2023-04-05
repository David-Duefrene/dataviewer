import * as d3 from 'd3'

import { ChartData, ChartBoxData } from './types'

interface LineChartProps {
	data: ChartBoxData[]
	dimensions: {
		width: number;
		height: number;
	};
	svgRef: React.RefObject<SVGSVGElement>
	min: number;
	max: number;
  }

const LineChart = ({
	data, dimensions, svgRef, min, max,
}: LineChartProps) => {
	const { width, height } = dimensions
	const parseDate = d3.timeParse('%Y-%m-%d')
	const xScale = d3.scaleTime()
		.domain(d3.extent(data[0].data, (d) => parseDate(d.date)) as [Date, Date])
		.range([ 0, width ])

	const yScale = d3.scaleLinear()
		.domain([
			min < 0 ? min * 1.25 : min * 0.75,
			max < 0 ? max * 0.75 : max * 1.1,
		])
		.range([ height - 50, 0 ])

	// Create root container where we will append all other chart elements
	const svgEl = d3.select(svgRef.current)
	svgEl.selectAll('*').remove() // Clear svg content before adding new elements
	const svg = svgEl
		.append('g')
		.attr('transform', 'translate(100,20)')

	// Add X grid lines with labels
	const xAxis = d3.axisBottom(xScale)
		.tickSize(-height)
		.tickFormat(d3.timeFormat('%Y') as never)
	const xAxisGroup = svg.append('g')
		.attr('transform', `translate(0, ${height})`)
		.call(xAxis)
	xAxisGroup.select('.domain').remove()
	xAxisGroup.selectAll('line').attr('stroke', 'var(--alt-color)')
	xAxisGroup.selectAll('text')
		.attr('transform', 'rotate(-45)')
		.attr('color', 'var(--text-color)')
		.attr('font-size', '0.75rem')

	// Add Y grid lines with labels
	const yAxis = d3.axisLeft(yScale)
		.tickSize(-width)
	const yAxisGroup = svg.append('g').call(yAxis)
	yAxisGroup.select('.domain').remove()
	yAxisGroup.selectAll('line').attr('stroke', 'var(--alt-color)')
	yAxisGroup.selectAll('text')
		.attr('color', 'var(--text-color)')
		.attr('font-size', '0.75rem')

	// Draw the line
	const DrawLine = (lineData: ChartData[], color: string) => {
		const line = d3.line()
			.x((d: any) => xScale(parseDate(d.date) as Date))
			.y((d: any) => yScale(d.value) as number)

		svg.append('path')
			.attr('d', line(lineData as Iterable<[number, number]>))
			.attr('stroke', color)
			.attr('stroke-width', 2)
			.attr('fill', 'none')
			.attr('class', 'line')
	}

	data.forEach((lineData) => DrawLine(lineData.data, lineData.lineColor))
}

export default LineChart
