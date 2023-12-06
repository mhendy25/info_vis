import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart(props) {
  const {
    offsetX,
    offsetY,
    data,
    height,
    width,
    selectedPointClub,
    setSelectedPointClub,
  } = props;

  // display 1st view if no teams selected for the fitler; otherwise display the 2nd view
  if (!selectedPointClub) {
    let maximunCount = max(data, (d) => d.TitlesCount);
    const xScale = scaleLinear()
      .range([0, width])
      .domain([0, maximunCount])
      .nice();
    const yScale = scaleBand()
      .range([0, height])
      .domain(data.map((a) => a.Club))
      .padding(0.2);
    return (
      <g transform={`translate(${offsetX}, ${offsetY})`}>
        {data.map((d) => (
          <g key={d.Club} transform={`translate(0, ${yScale(d.Club)})`}>
            <image
              x={xScale(d.TitlesCount) + 0.1} // Adjust the spacing between the bar and the logo
              y={0}
              width={30} // Set the desired width for the logo
              height={20} // Set the desired height for the logo
              href={`${d.ClubLogoUrl}`} // Replace 'logo' with the actual property name for the logo URL in your data
            />
            <rect
              x={0}
              y={0}
              width={xScale(d.TitlesCount)}
              height={yScale.bandwidth()}
              stroke="black"
              fill={"#0c194b"}
            />
          </g>
        ))}
        <YAxis yScale={yScale} height={height} offsetX={offsetX} />
        <XAxis xScale={xScale} width={width} height={height} />
      </g>
    );
  } else {
    let maximunCount = max(data, (d) => d.Appearance);
    const xScale = scaleLinear()
      .range([0, width])
      .domain([0, maximunCount])
      .nice();
    const yScale = scaleBand()
      .range([0, height])
      .domain(data.map((a) => a.Coach))
      .padding(0.2);
    return (
      <g transform={`translate(${offsetX}, ${offsetY})`}>
        {data.map((d) => (
          <g key={d.Coach} transform={`translate(0, ${yScale(d.Coach)})`}>
            <image
              x={xScale(d.Appearance) + 0.1} // Adjust the spacing between the bar and the logo
              y={0}
              width={30} // Set the desired width for the logo
              height={20} // Set the desired height for the logo
              // href={`${d.ClubLogoUrl}`} // Replace 'logo' with the actual property name for the logo URL in your data
            />
            <rect
              x={0}
              y={0}
              width={xScale(d.Appearance)}
              height={yScale.bandwidth()}
              stroke="black"
              fill={"#0c194b"}
            />
          </g>
        ))}
        <YAxis yScale={yScale} height={height} offsetX={offsetX} />
        <XAxis xScale={xScale} width={width} height={height} />
      </g>
    );
  }
}
