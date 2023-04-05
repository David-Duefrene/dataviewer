import React, { useState, useEffect } from 'react'

import * as d3 from 'd3'

import LineChart from './LineChart'
import { ChartBoxData, ChartData } from './types'

interface ChartBoxProps {
	data: ChartBoxData[],
    title: string
}

const ChartBox = ({ data, title }: ChartBoxProps) => {
	const svgRef = React.useRef(null)

	const [ width, setWidth ] = useState(1500)
	const [ height, setHeight ] = useState(750)

	const linesColors: React.ReactElement<unknown, string> | JSX.Element[] = []

	// Resize the chart on window resize
	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth * 0.75)
			setHeight(window.innerHeight * 0.75)
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	let min = Number.MAX_SAFE_INTEGER
	let max = 0

	data.map((dataPoint: ChartBoxData, index: number) => {
		const testMin = d3.min(dataPoint.data, (d: ChartData) => d.value) || Number.MAX_SAFE_INTEGER
		const testMax = d3.max(dataPoint.data, (d: ChartData) => d.value) || max

		if (testMin < min) {
			min = testMin
		}
		if (testMax > max) {
			max = testMax
		}

		const color = `var(--line-color-${index%10})`
		const name = dataPoint.name
		dataPoint.lineColor = color
		linesColors.push(
			<tr key={`liceColor-${name}`}>
				<td>{name}</td>
				<td style={{ backgroundColor: color }} />
			</tr>,
		)
	})

	useEffect(() => {
		const dimensions = { width, height }
		LineChart({
			data, dimensions, svgRef, min, max,
		})
	}, [ data, width, height, svgRef, min, max ])

	return (
		<article>
			<h1>{title}</h1>
			<table>
				<tr>
					<th>Name</th>
					<th>Color</th>
				</tr>
				{linesColors}
			</table>
			<svg className='Chart' ref={svgRef} width={width + 120} height={height * 1.1} />
		</article>
	)
}

export default ChartBox
