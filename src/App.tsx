import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CheckSession, RequireAuth } from "./components";
import Layout from "./layout/Layout";
import { AdminRoutes, PublicRoutes, UserRoutes } from "./models/routes";
import Company from "./pages/Admin/Company/Company";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Amortization from "./pages/User/Amortization/Amortization";
import { SnackbarManagerConfigurator } from "./utils";

function App() {
  return (
    <MantineProvider>
      <SnackbarProvider>
        <SnackbarManagerConfigurator />
        <BrowserRouter>
          <Routes>
            <Route element={<CheckSession />}>
              <Route path="/" element={<Navigate to={PublicRoutes.login} />} />
              <Route path={PublicRoutes.login} element={<Login />} />
              <Route path={PublicRoutes.register} element={<Register />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path={UserRoutes.amortization} element={<Amortization />} />
                <Route path={AdminRoutes.company} element={<Company />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </MantineProvider>
  );
}

export default App;
