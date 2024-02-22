import React, { useState, useEffect, useRef } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import { preProcessMeterBarData } from "../Service/MeterDataService";

import ChartManipulation from "../Components/ChartManipulation";
import Alert from "../Components/Alert";

// Adding the chart as dependency to the core FusionCharts
ReactFC.fcRoot(FusionCharts, Charts);

const MeterApp = () => {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState(null);
  const [chartType, setChartType] = useState("msline");
  const [selectedMeters, setSelectedMeters] = useState([1]);
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
      const chartConfig = preProcessMeterBarData(
        data,
        selectedMeters,
        chartType
      );
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

  const handleMeterSelection = (e, met) => {
    setSelectedMeters((prevMeters) =>
      e.target.checked
        ? [...prevMeters, met]
        : prevMeters.filter((m) => m !== met)
    );
  };

  const handleAlertClick = () => {
    console.log("Alert clicked");
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
        <div className="fixed top-0 right-10 mt-8">
          <Alert
            id={1}
            timestamp="21-11-2023 10:00"
            description="Total power consumption exceeded 1000W"
            onClick={handleAlertClick} // Add a function to handle alert click
          />
        </div>
      </div>
    )
  );
};

export default MeterApp;
