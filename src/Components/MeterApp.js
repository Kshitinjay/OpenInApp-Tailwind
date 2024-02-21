import React, { useState, useEffect, useRef } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

import ChartManipulation from "../Components/ChartManipulation";

// Adding the chart as dependency to the core FusionCharts
ReactFC.fcRoot(FusionCharts, Charts);

const MeterApp = () => {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState(null);
  const [chartType, setChartType] = useState("line");
  const [selectedMeters, setSelectedMeters] = useState([]);
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
      const chartConfig = {
        type: chartType,
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: {
          chart: {
            caption: "App Publishing Trend",
            subcaption: "2018-2022",
            xaxisname: "Years",
            yaxisname: "Total number of apps in store",
            formatnumberscale: "1",
            plottooltext:
              "<b>$dataValue</b> units consumed <b>$seriesName</b> in $label",
            theme: "candy",
            drawcrossline: "1",
          },
          categories: [
            {
              category: data.map((timeInterval) => ({
                label: timeInterval[0],
              })),
            },
          ],
          dataset: selectedMeters.sort().map(
            (timeInterval, index) => {
              console.log(`Mapping for ${timeInterval}`);
              return {
                seriesname: selectedMeters[index],
                data: data.map((meterReading) => {
                  const value = meterReading[index + 1];
                  console.log(`Meter ${index + 1} reading: ${value}`);
                  return { value };
                }),
              };
            }
          ),
        },
      };

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
        />
        <div id="chart-container"></div>
      </div>
    )
  );
};

export default MeterApp;
