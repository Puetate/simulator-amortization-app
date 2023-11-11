import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { AdminRoutes, PublicRoutes, UserRoutes } from "./models/routes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { SnackbarManagerConfigurator } from "./utils";
import { Company } from "./pages/Admin";
import IndirectPayment from "./pages/IndirectPayment/IndirectPayment";

function App() {
  return (
    <MantineProvider>
      <SnackbarProvider>
        <SnackbarManagerConfigurator />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={PublicRoutes.login} />} />
            <Route path={PublicRoutes.login} element={<Login />} />
            <Route path={PublicRoutes.register} element={<Register />} />
            {/* <Route element={<RequireAuth />}> */}
              <Route element={<Layout />}>
                <Route
                  path={UserRoutes.amortization}
                  element={<IndirectPayment />}
                />
                <Route path={AdminRoutes.company} element={<Company />} />
              </Route>
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </MantineProvider>
  );
}

export default App;
