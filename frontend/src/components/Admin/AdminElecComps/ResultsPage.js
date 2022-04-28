import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultDataPage from "./ResultDataPage";

function ResultsPage() {
  const [results, setResults] = useState(null);

  const api = axios.create({
    baseURL: "https://localhost:7006",
  });

  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    api.get("/api/Details").then((res) => {
      // console.log(res.data.isCompleted + " " + res.data.isStarted);
      if (res.data.isCompleted && res.data.isStarted) {
        api.get("/api/Allotment", config).then((res) => {
          // console.log(res);
          setResults(res.data);
        });
      }
    });
  }, []);

  return <>{results && <ResultDataPage resultData={results} />}</>;
}

export default ResultsPage;
