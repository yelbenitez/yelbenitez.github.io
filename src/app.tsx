import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/Routes";
import Main from "./views/Main";
import Activity from "./views/Activity";
import Result from "./views/Result";
import { ActivityContextProvider } from "./hooks/ActivityContext";
import "./styles/App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ActivityContextProvider>
        <Routes>
          <Route path={ROUTES.home.path} element={<Main />} />
          <Route path={ROUTES.activity.path} element={<Activity />} />
          <Route path={ROUTES.result.path} element={<Result />} />
        </Routes>
      </ActivityContextProvider>
    </HashRouter>
  </StrictMode>,
);
