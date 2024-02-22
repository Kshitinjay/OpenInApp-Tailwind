export const preProcessChartData = (data, selectedMeters, chartType) => {
  const chartConfig = {
    theme: "gammel",
    type: chartType,
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Energy Consumption",
        xaxisname: "Years",
        yaxisname: "Units consumed by each",
        formatnumberscale: "1",
        plottooltext:
          "<b>$dataValue</b> units consumed <b>$seriesName</b> in $label",
        drawcrossline: "1",
      },
      categories: [
        {
          category: data.map((timeInterval) => ({
            label: timeInterval[0],
          })),
        },
      ],
      dataset: selectedMeters.sort().map((meterNo, index) => {
        console.log(`Mapping for ${meterNo}`);
        return {
          seriesname: selectedMeters[meterNo],
          data: data.map((meterReading) => {
            const value = meterReading[meterNo];
            return { value };
          }),
        };
      }),
    },
  };
  return chartConfig;
};
