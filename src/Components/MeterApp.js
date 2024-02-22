import React, { useState, useEffect, useRef } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import { preProcessChartData } from "../Service/MeterDataService";
import { Alert, Modal, Box } from "@mui/material";

import ChartManipulation from "../Components/ChartManipulation";

// Adding the chart as dependency to the core FusionCharts
ReactFC.fcRoot(FusionCharts, Charts);

const MeterApp = () => {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState(null);
  const [chartType, setChartType] = useState("msline");
  const [selectedMeters, setSelectedMeters] = useState([1]);
  const [openModal, setModalOpen] = useState(false);
  const [chartStartDate, setChartStartDate] = useState();
  const [chartEndDate, setChartEndDate] = useState();

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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    p: 4,
  };

  useEffect(() => {
    const slicedData = parsedData.slice(1);
    setData(slicedData);
  }, []);

  useEffect(() => {
    // FusionCharts configuration
    if (data.length > 0) {
      const chartConfig = preProcessChartData(data, selectedMeters, chartType);
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

  useEffect(() => {
    // filter chart data here according to date range
    console.log(chartStartDate);
    console.log(chartEndDate);
  }, [chartStartDate, chartEndDate]);

  const handleChartTypeChange = (e) => {
    // Change chart type (line or bar)
    if (chart) {
      setChartType(e.target.value);
    }
  };

  const handleMeterSelection = (e, met) => {
    setSelectedMeters((prevMeters) =>
      e.target.checked
        ? [...prevMeters, met]
        : prevMeters.filter((m) => m !== met)
    );
  };

  const dateSelectionFilteration = (selectedDate, startOrEnd) => {
    if (startOrEnd == "start") {
      setChartStartDate(selectedDate);
    } else {
      setChartEndDate(selectedDate);
    }
  };

  const handleAlertClick = () => {
    console.log("Alert clicked");
  };

  const toggleModal = () => {
    setModalOpen(!openModal);
  };

  const formatDateToSet = (dates) => {
    const inputDateString = dates;

    const [datePart, timePart] = inputDateString.split(" ");

    const [day, month, year] = datePart.split("-").map((part) => parseInt(part));

    const [hours, minutes] = timePart.split(":").map((part) => parseInt(part));

    const date = new Date(year + 2000, month - 1, day + 1, hours, minutes);

    const formattedDate = date.toISOString().slice(0, 16);

    return formattedDate;
  };

  return (
    data.length && (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center my-4">
          Electricity Metering Data
        </h1>
        <div id="chart-container" className="mt-10"></div>
        <button
          className={`mt-2 bg-customBlue rounded-lg py-2 text-white font-medium p-2`}
          onClick={toggleModal}
        >
          Configure Chart
        </button>
        <Modal
          open={openModal}
          onClose={toggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <ChartManipulation
              handleChartTypeChange={handleChartTypeChange}
              handleMeterSelection={handleMeterSelection}
              data={data}
              selectedMeters={selectedMeters}
              chartType={chartType}
              dateSelectionFilteration={dateSelectionFilteration}
              startDateRange={chartStartDate && formatDateToSet(chartStartDate)}
              endDateRange={chartEndDate && formatDateToSet(chartEndDate)}
            />
          </Box>
        </Modal>
        <div className="fixed top-0 right-10 mt-8">
          <Alert severity="warning" onClose={handleAlertClick}>
            This Alert displays the default close icon.
          </Alert>
        </div>
      </div>
    )
  );
};

export default MeterApp;
