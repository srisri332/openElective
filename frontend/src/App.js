import logo from "./logo.svg";
import "./App.css";
import Landpage from "./components/Landpage";
import LoginPage from "./components/LoginPage";
import AdminMainPage from "./components/Admin/AdminMainPage";

function App() {
  return (
    <div className='App'>
      {/* <LoginPage /> */}
      <AdminMainPage />
    </div>
  );
}

export default App;
