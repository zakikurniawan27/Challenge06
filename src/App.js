import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
// import Protected from './components/Protected';
import Detail from "./pages/Detail/Detail";
import AllMovie from "./pages/AllMovie/AllMovie";
import Page2 from "./pages/AllMovie/Page2";
import Page3 from "./pages/AllMovie/Page3";
import { useState } from "react";
import Protected from "./components/Protected";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const tokenLocalStorage = localStorage.getItem("token");
  const [token, setToken] = useState(tokenLocalStorage);
  return (
    <GoogleOAuthProvider clientId="327648683850-r3ajmuldfq0gsj4in5hvfrjv9l2nmala.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<Home setToken={setToken} token={token} />} />
        <Route
          path="/detail/:id"
          element={
            <Protected setToken={setToken} token={token}>
              <Detail setToken={setToken} token={token}/>
            </Protected>
          }
        />
        <Route
          path="/register"
          element={<Register setToken={setToken} token={token} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} token={token} />}
        />
        <Route path="/seeallmovie" element={<AllMovie />} />
        <Route path="/seeallmovie-page2" element={<Page2 />} />
        <Route path="/seeallmovie-page3" element={<Page3 />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
