import React from "react";
import { Grid } from "@mui/material";
import CardComponent from "../Card";

export default function Highlight({ report }) {
  const data = report && report.length ? report[report.length - 1] : [];
  const sumary = [
    {
      title: "Số ca nhiễm",
      count: data.Confirmed,
      type: "comfirmed",
    },
    {
      title: "Khỏi",
      count: data.Recovered,
      type: "recovered",
    },
    {
      title: "Tử vong",
      count: data.Deaths,
      type: "deaths",
    },
  ];
  return (
    <Grid container spacing={3}>
      {sumary.map((card, index) => (
        <Grid key={index} item sm={4} xs={12}>
          <CardComponent
            title={card.title}
            count={card.count}
            type={card.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
