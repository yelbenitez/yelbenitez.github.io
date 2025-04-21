import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/Routes";
import Main from "./views/Main";
import Activity from "./views/Activity";
import Score from "./views/Score";
import { ActivityContextProvider } from "./hooks/ActivityContext";
import "./styles/App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ActivityContextProvider>
        <Routes>
          <Route path={ROUTES.home.path} element={<Main />} />
          <Route path={ROUTES.activity.path} element={<Activity />} />
          <Route path={ROUTES.score.path} element={<Score />} />
        </Routes>
      </ActivityContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
