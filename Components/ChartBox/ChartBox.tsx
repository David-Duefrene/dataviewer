import React, { useState, useEffect } from 'react';

// @ts-ignore
import LineChart from './LineChart/LineChart';
import * as d3 from 'd3';

// import './ChartBox.css';

export interface ChartData {
	date: string;
	value: number;
}

interface ChartBoxData {
	data: ChartData[];
	name: string;
}

interface ChartBoxProps {
	data: ChartBoxData[],
    title: string
}


/**
 *  ChartBox is a React wrapper for LineChart.
 */
const ChartBox = ({ data, title }: ChartBoxProps) => {
    const svgRef = React.useRef(null);

    /**
     * The width of the chart
     */
    const [width, setWidth] = useState(1500);

    /**
     * The height of the chart
     */
    const [height, setHeight] = useState(750);

    // Resize the chart on window resize
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth * 0.75);
            setHeight(window.innerHeight * 0.75);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dimensions = { width, height };
    useEffect(() => {
		let min = Number.MAX_SAFE_INTEGER;
		let max = 0;

		for(const county of data) {
			const testMin = d3.min(county.data, (d: ChartData) => {console.log(d); return d.value}) || Number.MAX_SAFE_INTEGER;
			const testMax = d3.max(county.data, (d: ChartData) => d.value) || max;

			if (testMin < min) { min = testMin; }
			if (testMax > max) { max = testMax; }
		};

		LineChart({ data, dimensions, svgRef, min, max });
    }, [data, dimensions, svgRef]);

    return (
		<article>
            <h1>{title}</h1>
			<svg className='Chart' ref={svgRef} width={width + 120} height={height * 1.1} />
		</article>
	);
};

export default ChartBox;
