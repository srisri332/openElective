import "./App.css";
import Landpage from "./components/Landpage";
import LoginPage from "./components/LoginPage";
import AdminMainPage from "./components/Admin/AdminMainComps/AdminMainPage";
import { BrowserRouter as Router } from "react-router-dom";
import AdminPage from "./components/Admin/AdminPage";
import StudentPage from "./components/Student/StudentPage";

function App() {
  return (
    <Router>
      <div className='App'>
        {/* <LoginPage /> */}
        <AdminPage />
        {/* <StudentPage /> */}
      </div>
    </Router>
  );
}

export default App;
