import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import classNames from "classnames/bind";
import styles from "../LineCharts/LineCharts.module.scss";
import moment from "moment";
import { Button, ButtonGroup } from "@mui/material";
const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format("DD/MM/YYYY"));

  return {
    chart: {
      height: 500,
    },
    title: {
      text: "Tổng ca nhiễm",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ["#F3585B"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tổng Ca nhiễm",
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};
const cx = classNames.bind(styles);

const LineChart = ({ data }) => {
  const [options, setOptions] = useState({});
  const [active, setActive] = useState("all");
  let customData = [];
  useEffect(() => {
    if (active === "all") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      customData = data;
    } else if (active === "month") {
      customData = data.slice(data.length - 30, data.length - 1);
    } else if (active === "day") {
      customData = data.slice(data.length - 7, data.length - 1);
    }
    setOptions(generateOptions(customData));
  }, [data, active]);

  return (
    <div>
      <ButtonGroup size="small" className={cx("wrapper")}>
        <Button
          onClick={() => setActive("all")}
          className={cx("btn-all", { active: active === "all" })}
        >
          TẤT CẢ
        </Button>
        <Button
          onClick={() => setActive("month")}
          className={cx("btn-month", { active: active === "month" })}
        >
          30 NGÀY
        </Button>
        <Button
          onClick={() => setActive("day")}
          className={cx("btn-day", { active: active === "day" })}
        >
          7 NGÀY
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default React.memo(LineChart);
