import React, { useEffect, useRef, useState } from "react";
import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";
HighchartsMap(Highchart);
const initOptions = {
  chart: {
    height: "500",
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1, "	#7A0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Dân số",
      joinBy: ["hc-key", "key"],
    },
  ],
};
const Mapchart = ({ data }) => {
  const [options, setOptions] = useState({});
  const [configLoaded, setConfigLoaded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (data && Object.keys(data).length) {
      console.log({ data });
      const fakeData = data.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));
      console.log("fakedata", fakeData);

      setOptions(() => ({
        ...initOptions,
        title: {
          text: data.title,
        },
        series: [{ ...initOptions.series[0], mapData: data, data: fakeData }],
        accessibility: {
          enabled: false,
        },
      }));

      if (!configLoaded) setConfigLoaded(true);
    }
  }, [data, configLoaded]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.chart.series[0].update({
        mapData: data,
      });
    }
  }, [options, data]);

  if (!configLoaded) return null;
  return (
    <HighchartsReact
      highcharts={Highchart}
      options={cloneDeep(options)}
      constructorType={"mapChart"}
      ref={ref}
    />
  );
};
export default React.memo(Mapchart);
