import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { Skills } from "../pages/Skills";
import { Blog } from "../pages/Blog";
import { BlogPost } from "../pages/BlogPost";
import { Gallery } from "../pages/Gallery";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "skills", Component: Skills },
      { path: "blog", Component: Blog },
      { path: "blog/:id", Component: BlogPost },
      { path: "gallery", Component: Gallery },
    ],
  },
]);