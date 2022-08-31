import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GlobalProvider from "Contexts/contexts";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import Welcome from "pages/Welcome";
import MySquad from "pages/SquadProfile";
import Forum from "pages/Forum";
import Leagues from "pages/Leagues";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* {getRoutes(routes)} */}
          <Route path="/home" element={<Welcome />} />
          <Route path="/squad" element={<MySquad />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/fanzone" element={<Forum />} />
          <Route exact path="/" element={<Welcome />} />
        </Routes>
      </ThemeProvider>
    </GlobalProvider>
  );
}
