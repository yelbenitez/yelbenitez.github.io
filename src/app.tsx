import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/Routes";
import Main from "./views/Main";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home.path} element={<Main />} />
        <Route path={ROUTES.score.path} element={<h2>Score</h2>} />
        <Route path={ROUTES.activity.path} element={<h2>Activity</h2>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
