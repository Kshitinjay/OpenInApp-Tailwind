import React, { useState } from "react";

const ChartManipulation = ({ handleChartTypeChange, data}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedMeters, setSelectedMeters] = useState([]);

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
    console.log("selectedMeters: " + selectedMeters);
  };

  return (
    <div className="my-4">
      <label htmlFor="chartType" className="mr-2">
        Chart Type:
      </label>
      <select id="chartType" onChange={handleChartTypeChange}>
        <option value="line">Line</option>
        <option value="mscolumn2d">Bar</option>
      </select>
      <form onSubmit={handleTimeWindowSubmit}>
        <label htmlFor="startTime" className="mr-2">
          Start Time:
        </label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => handleStartTime(e)}
        />
        <label htmlFor="endTime" className="mx-2">
          End Time:
        </label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => handleEndTime(e)}
        />
        <div>
          {["M1", "M2", "M3", "M4"].map((meter) => (
            <label key={meter} className="mr-2">
              <input
                type="checkbox"
                value={meter}
                onChange={(e) =>
                  setSelectedMeters((prevMeters) =>
                    e.target.checked
                      ? [...prevMeters, e.target.value]
                      : prevMeters.filter((m) => m !== e.target.value)
                  )
                }
              />
              {meter}
            </label>
          ))}
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ChartManipulation;