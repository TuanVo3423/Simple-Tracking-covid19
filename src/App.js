import Highlight from "./components/Highlight";
import SelectorCountry from "./components/SelectorCourtry";
import Sumary from "./components/Sumary";
import { getCountries, getReportByCountry } from "./apis";
import { useEffect, useState } from "react";
import { sortBy } from "lodash";
import { Typography } from "@mui/material";
import moment from "moment";
import "moment/locale/vi";
import { Container } from "@mui/system";
import "@fontsource/roboto";

moment.locale("vi");

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getCountries().then((res) => {
      const countries = sortBy(res.data, "Country");
      setCountries(countries);
      setSelectedCountryId("vn");
    });
  }, []);
  const handleOnchange = (e) => {
    setSelectedCountryId(e.target.value);
  };
  useEffect(() => {
    if (selectedCountryId) {
      const slug = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );
      getReportByCountry(slug.ISO2.toLowerCase()).then((res) => {
        // xoa di phan tu cuoi cung
        res.data.pop();
        setReports(res.data);
      });
    }
  }, [selectedCountryId, countries]);
  return (
    <Container style={{ marginTop: 20 }}>
      <Typography component={"h2"} variant={"h2"}>
        Số liệu COVID-19
      </Typography>
      <Typography
        component={"p"}
        variant={"p"}
        style={{ fontFamily: "Roboto" }}
      >
        {moment().format("LLL")}
      </Typography>
      <SelectorCountry
        value={selectedCountryId}
        countries={countries}
        handleOnchange={handleOnchange}
      />
      <Highlight report={reports} />
      <Sumary report={reports} selectedId={selectedCountryId} />
    </Container>
  );
}

export default App;
