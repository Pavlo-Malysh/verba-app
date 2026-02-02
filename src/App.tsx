import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";
import Teachers from "./pages/Teachers.js";
import Favorites from "./pages/Favorites.js";
import NoPage from "./pages/NoPage.js";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
