import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { News } from "../pages/News";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}