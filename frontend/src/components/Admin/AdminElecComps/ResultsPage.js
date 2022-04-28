import React, { useState, useEffect } from "react";
import axios from "axios";

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
    api.get("/api/Allotment", config).then((res) => {
      console.log(res);
    });
  }, []);

  return <div>ResultsPage</div>;
}

export default ResultsPage;
