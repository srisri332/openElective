import React from "react";
import { Route, Routes, Switch } from "react-router-dom";
import AdminMainPage from "./AdminMainComps/AdminMainPage";
import AdminElectivePage from "./AdminElecComps/AdminElectivePage";
import NavBar from "./NavBar";
import { OEProvider } from "../../contexts/OEContext";
import { SubjectProvider } from "../../contexts/SubjectContext";
import ResultsPage from "./AdminElecComps/ResultsPage";

function AdminPage() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path='adminmainpage'
          element={
            <OEProvider>
              <SubjectProvider>
                <AdminMainPage />{" "}
              </SubjectProvider>
            </OEProvider>
          }></Route>
        <Route path='adminelecpage' element={<AdminElectivePage />}></Route>
        <Route path='resultspage' element={<ResultsPage />}>
          {" "}
        </Route>
      </Routes>
    </div>
  );
}

export default AdminPage;
