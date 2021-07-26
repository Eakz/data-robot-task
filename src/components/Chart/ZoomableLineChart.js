import React, { useRef, useEffect, useState } from "react";
import {
    select,
    scaleLinear,
    line,
    max,
    curveCardinal,
    axisBottom,
    axisLeft,
    zoom,
    min,
} from "d3";
import useResizeObserver from "./useResizeObserver";
import { useStore } from "../../services/Store";
import './styles.css'
/**
 * Component that renders a ZoomableLineChart
 */

function ZoomableLineChart({ data, data2,days, id = "myZoomableLineChart", id2 = "myZoomableLineChart2" }) {
    console.log(data, data2);
    const svgRef = useRef();
    console.log(days)
    const { theme, primaryCurrency, secondaryCurrency } = useStore()
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [currentZoomState, setCurrentZoomState] = useState();
    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        const svgContent = svg.select(".content");
        const svgContent2 = svg.select(".content2");
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();

        // scales + line generator
        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([10, width - 10]);

        if (currentZoomState) {
            const newXScale = currentZoomState.rescaleX(xScale);
            xScale.domain(newXScale.domain());
        }

        const yScale = scaleLinear()
            .domain([min([...data, ...data2]), max([...data, ...data2])])
            .range([height - 10, 10]);

        const lineGenerator = line()
            .x((d, index) => xScale(index))
            .y((d) => yScale(d))
            .curve(curveCardinal);

        // render the line
        svgContent
            .selectAll(".myLine")
            .data([data])
            .join("path")
            .attr("class", "myLine")
            .attr("stroke", theme === 'light' ? 'black' : 'white')
            .attr("fill", "none")
            .attr("d", lineGenerator);
        svgContent2
            .selectAll(".myLine")
            .data([data2])
            .join("path")
            .attr("class", "myLine")
            .attr("stroke", "red")
            .attr("fill", "none")
            .attr("d", lineGenerator);

        svgContent
            .selectAll(".myDot")
            .data(data)
            .join("circle")
            .attr("class", "myDot")
            .attr("stroke", "black")
            .attr("r", 4)
            .attr("fill", "orange")
            .attr("cx", (value, index) => xScale(index))
            .attr("cy", yScale);
        svgContent2
            .selectAll(".myDot")
            .data(data2)
            .join("circle")
            .attr("class", "myDot")
            .attr("stroke", "red")
            .attr("r", 4)
            .attr("fill", "purple")
            .attr("cx", (value, index) => xScale(index))
            .attr("cy", yScale);

        // axes
        const xAxis = axisBottom(xScale);
        svg
            .select(".x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        const yAxis = axisLeft(yScale);
        svg.select(".y-axis").call(yAxis);

        // zoom
        const zoomBehavior = zoom()
            .scaleExtent([0.5, 5])
            .translateExtent([
                [0, 0],
                [width, height],
            ])
            .on("zoom", (event) => {
                const zoomState = event.transform;
                setCurrentZoomState(zoomState);
            });

        svg.call(zoomBehavior);
    }, [currentZoomState, data, data2, dimensions, theme]);

    return (
        <div id="chart-container">
            <h5>DISCLAIMER: API couldn't provide info regarding the exchange rates for last 24 hours therefore I exchanged that for last month</h5>

            <div ref={wrapperRef} style={{ marginBottom: "2rem", position: 'relative' }}>
                <svg ref={svgRef}>
                    <defs>
                        <clipPath id={id}>
                            <rect x="0" y="0" width="100%" height="100%" />
                        </clipPath>
                    </defs>
                    <g className="content" clipPath={`url(#${id})`}></g>
                    <g className="content2" clipPath={`url(#${id2})`}></g>
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
                <div id="info-bar">
                    <div id="primary">
                        <p>{primaryCurrency}</p>
                    </div>
                    <div id="secondary">
                        <p> {secondaryCurrency}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ZoomableLineChart;