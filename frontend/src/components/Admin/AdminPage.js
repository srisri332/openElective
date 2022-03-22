import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminMainPage from "./AdminMainComps/AdminMainPage";
import AdminElectivePage from "./AdminElecComps/AdminElectivePage";
import NavBar from "./NavBar";
import { OEProvider } from "../../contexts/OEContext";

function AdminPage() {
  return (
    <div>
      <NavBar />
      <Switch>
        <OEProvider>
          <Route path='/adminmainpage'>
            <AdminMainPage />
          </Route>
        </OEProvider>
        <Route path='/adminelecpage'>
          <AdminElectivePage />
        </Route>
      </Switch>
    </div>
  );
}

export default AdminPage;
