import React, { useState } from "react";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";

const ChartManipulation = ({
  handleChartTypeChange,
  data,
  handleMeterSelection,
  selectedMeters,
  chartType,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const meterList = [
    { name: "Meter 1", value: 1 },
    { name: "Meter 2", value: 2 },
    { name: "Meter 3", value: 3 },
    { name: "Meter 4", value: 4 },
  ];

  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const handleTimeWindowSubmit = (e) => {
    e.preventDefault();
    console.log("StartTime: " + startTime);
    console.log("EndTime: " + endTime);
  };

  return (
    <div className="my-4">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chart Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chartType}
          label="Chart Type"
          onChange={handleChartTypeChange}
        >
          <MenuItem value="msline">Line chart</MenuItem>
          <MenuItem value="mscolumn2d">Bar chart</MenuItem>
        </Select>
      </FormControl>
      <div className="mt-3 flex flex-col">
        <label htmlFor="startTime" className="mr-2">
          Start Time:
        </label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => handleStartTime(e)}
        />
        <label htmlFor="endTime" className="mr-2">
          End Time:
        </label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => handleEndTime(e)}
        />
      </div>
      <div className="flex flex-col mt-3">
        {meterList.map((meter, index) => (
          <label key={meter.value} className="mr-2">
            <input
              className="mr-2"
              type="checkbox"
              value={meter.value}
              onChange={(e) => handleMeterSelection(e, meter.value)}
              checked={selectedMeters.indexOf(meter.value) > -1}
            />
            {`Meter ${index + 1}`}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ChartManipulation;
