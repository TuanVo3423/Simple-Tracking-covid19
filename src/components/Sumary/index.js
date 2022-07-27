import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import LineChart from "../Charts/LineCharts";
import Mapchart from "../Charts/Mapchart";
import classNames from "classnames/bind";
import styles from "../Charts/Charts.module.scss";
const cx = classNames.bind(styles);

export default function Sumary({ report, selectedId }) {
  const [mapData, setMapdata] = useState({});
  useEffect(() => {
    if (selectedId) {
      console.log(selectedId)
      import(
        `@highcharts/map-collection/countries/${selectedId}/${selectedId}-all.geo.json`
      ).then((res) => setMapdata(res));
    }
  }, [selectedId]);
  return (
    <Grid className={cx("wrapper")} container spacing={3}>
      <Grid item sm={8} xs={12}>
        <LineChart data={report} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <Mapchart data={mapData} />
      </Grid>
    </Grid>
  );
}
