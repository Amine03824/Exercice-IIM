import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { axiosInstance } from "./utils/axios";
function App() {
  const [arbres, setArbres] = useState([]);
  useEffect(() => {
    axiosInstance.get("/arbres").then((res) => {
      setArbres(res.data);
    });
  }, []);
  return (
    <div className="min-h-screen bg-[#FBF6EE]">
      <Navbar setArbres={setArbres} />
      <Routes>
        <Route
          path="/"
          element={<Home arbres={arbres} setArbres={setArbres} />}
        />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
