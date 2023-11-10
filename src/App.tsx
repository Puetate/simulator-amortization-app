import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./models/routes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path={PublicRoutes.login} element={<Login />} />
          {<Route path={PublicRoutes.register} element={<Register />} />}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
