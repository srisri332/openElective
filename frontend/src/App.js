import "./App.css";
import Landpage from "./components/Landpage";
import LoginPage from "./components/LoginPage";
import AdminMainPage from "./components/Admin/AdminMainComps/AdminMainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./components/Admin/AdminPage";
import StudentPage from "./components/Student/StudentPage";
import AdminElectivePage from "./components/Admin/AdminElecComps/AdminElectivePage";
import RequireAuth from "./components/RequireAuth";
import RequireStudentAuth from "./components/RequireStudentAuth";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Landpage />} />
            <Route path='/login' element={<LoginPage />} />

            <Route element={<RequireAuth />}>
              <Route path='/admin/*' element={<AdminPage />} />
            </Route>

            <Route element={<RequireStudentAuth />}>
              <Route path='/studentmainpage' element={<StudentPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
