import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminMainPage from "./AdminMainComps/AdminMainPage";
import AdminElectivePage from "./AdminElecComps/AdminElectivePage";
import NavBar from "./NavBar";
import { OEProvider } from "../../contexts/OEContext";
import { SubjectProvider } from "../../contexts/SubjectContext";

function AdminPage() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/adminmainpage'>
          <OEProvider>
            <SubjectProvider>
              <AdminMainPage />
            </SubjectProvider>
          </OEProvider>
        </Route>
        <Route path='/adminelecpage'>
          <AdminElectivePage />
        </Route>
      </Switch>
    </div>
  );
}

export default AdminPage;
