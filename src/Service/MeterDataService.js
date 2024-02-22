export const preProcessMeterBarData = (data, selectedMeters, chartType) => {
  const chartConfig = {
    theme: "gammel",
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
        legendItemClicked: "return false;",
      },
      categories: [
        {
          category: data.map((timeInterval) => ({
            label: timeInterval[0],
          })),
        },
      ],
      dataset: selectedMeters.sort().map((timeInterval, index) => {
        console.log(`Mapping for ${timeInterval}`);
        return {
          seriesname: selectedMeters[index],
          data: data.map((meterReading) => {
            const value = meterReading[index + 1];
            console.log(`Meter ${index + 1} reading: ${value}`);
            return { value };
          }),
        };
      }),
    },
  };
  return chartConfig;
};

