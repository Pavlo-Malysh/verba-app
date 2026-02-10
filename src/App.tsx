import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";
import TeachersPage from "./pages/TeachersPage/TeachersPage.js";
import FavoritesPage from "./pages/FavoritesPage.js";
import NoPage from "./pages/NoPage.js";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}
