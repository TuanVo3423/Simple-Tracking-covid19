import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "../Card/Card.module.scss";
import CountUp from "react-countup";
const cx = classNames.bind(styles);

export default function CardComponent({ title, count, type }) {
  return (
    <Card className={cx(type)}>
      <CardContent>
        <Typography component="p" variant="body2" className={cx("title")}>
          {title}
        </Typography>
        <Typography component="span" variant="body2" className={cx("count")}>
          <CountUp end={count || 0} duration="2" separator=" " />
        </Typography>
      </CardContent>
    </Card>
  );
}
