import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import AlertBar from "./components/modals/AlertBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function RootLayout() {
  const alert = useSelector((state) => state.alert);

  return (
    <div className="App" id="app">
      <AlertBar alertStates={alert} />
      <Outlet />
    </div>
  );
}
