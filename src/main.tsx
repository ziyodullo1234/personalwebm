import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { AppRoutes } from "./app/routes";

// Spotlight effect: store the pointer position inside the hovered .spot card.
document.addEventListener("pointermove", (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>(".spot");
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);