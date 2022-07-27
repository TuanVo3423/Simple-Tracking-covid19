import React from "react";
import axios from "axios";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import styles from "../SelectorCourtry/SelectorCourtry.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function SelectorCountry({ value, handleOnchange, countries }) {
  return (
    <FormControl className={cx("wrapper")}>
      <InputLabel htmlFor="country-selector" shrink style={{ left: "-14px" }}>
        Quốc gia
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnchange}
        inputProps={{
          name: "country",
          id: "country-selector",
        }}
      >
        {countries.map((country) => {
          return (
            <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
              {country.Country}
            </option>
          );
        })}
      </NativeSelect>
      <FormHelperText>Lựa chọn quốc gia</FormHelperText>
    </FormControl>
  );
}
