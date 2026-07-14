// src/app/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { Skills } from "../pages/Skills";
import { Blog } from "../pages/Blog";
import { Gallery } from "../pages/Gallery";
import { News } from "../pages/News";
import { About } from "../pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "skills", Component: Skills },
      { path: "blog", Component: Blog },
      { path: "gallery", Component: Gallery },
      { path: "news", Component: News },
      { path: "about", Component: About },
    ],
  },
]);