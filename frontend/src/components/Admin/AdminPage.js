import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminMainPage from "./AdminMainComps/AdminMainPage";
import AdminElectivePage from "./AdminElecComps/AdminElectivePage";
import NavBar from "./NavBar";

function AdminPage() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/adminmainpage'>
          <AdminMainPage />
        </Route>

        <Route path='/adminelecpage'>
          <AdminElectivePage />
        </Route>
      </Switch>
    </div>
  );
}

export default AdminPage;
