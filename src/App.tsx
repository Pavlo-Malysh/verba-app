import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";
import TeachersPage from "./pages/TeachersPage/TeachersPage.js";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.js";
import NoPage from "./pages/NoPage.js";
import PrivateRoute from "./components/PrivateRoute.js";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}
