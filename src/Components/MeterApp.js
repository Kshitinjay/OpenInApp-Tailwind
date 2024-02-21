import React, { useState, useEffect, useRef } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import {preProcessMeterBarData} from "../Service/MeterDataService";

import ChartManipulation from "../Components/ChartManipulation";

// Adding the chart as dependency to the core FusionCharts
ReactFC.fcRoot(FusionCharts, Charts);

const MeterApp = () => {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState(null);
  const [chartType, setChartType] = useState("line");
  const [selectedMeters, setSelectedMeters] = useState(['M1']);
  const chartRef = useRef(null);

  const parsedData = [
    ["Timestamp", "Meter 1", "Meter 2", "Meter 3", "Meter 4", "Meter 5"],
    ["21-11-2023 10:00", 307, 31, 102, 545, 1314],
    ["21-11-2023 10:01", 308, 51, 91, 547, 1300],
    ["21-11-2023 10:02", 294, 33, 117, 578, 1293],
    ["21-11-2023 10:03", 304, 55, 103, 556, 1288],
    ["21-11-2023 10:05", 309, 23, 109, 486, 1299],
    ["21-11-2023 10:06", 289, 17, 131, 522, 1305],
    ["21-11-2023 10:08", 285, 103, 96, 570, 1319],
  ];

  useEffect(() => {
    const slicedData = parsedData.slice(1);
    setData(slicedData);
  }, []);

  const handleChartTypeChange = (e) => {
    // Change chart type (line or bar)
    if (chart) {
      setChartType(e.target.value);
    }
  };

  useEffect(() => {
    // FusionCharts configuration
    if (data.length > 0) {
      const chartConfig = preProcessMeterBarData(data, selectedMeters, chartType);
      // Initialize FusionCharts
      setChart(new FusionCharts(chartConfig));
    }
    return () => {
      // Cleanup FusionCharts instance
      if (chart) {
        chart.dispose();
      }
    };
  }, [data, chartType, selectedMeters]);

  useEffect(() => {
    if (chart) {
      // Render FusionCharts
      chart.render("chart-container");
    }
  }, [chart]);

  const handleMeterSelection = (e) => {
    setSelectedMeters((prevMeters) =>
      e.target.checked
        ? [...prevMeters, e.target.value]
        : prevMeters.filter((m) => m !== e.target.value)
    );
  };

  return (
    data.length && (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center my-4">
          Electricity Metering Data
        </h1>
        <ChartManipulation
          handleChartTypeChange={handleChartTypeChange}
          handleMeterSelection={handleMeterSelection}
          data={data}
          selectedMeters={selectedMeters}
        />
        <div id="chart-container"></div>
      </div>
    )
  );
};

export default MeterApp;
