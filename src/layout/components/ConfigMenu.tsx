import { Menu } from "@mantine/core";
import { IconSettingsFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { defaultRoutes } from "../../models";
import { useSessionStore } from "../../store";

export default function ConfigMenu() {
  const navigate = useNavigate();
  const { user } = useSessionStore();
  const { pathname } = useLocation();
  const { logout } = useSessionStore();
  const [currentRol, setCurrentRol] = useState("USER");

  const handleSignOut = async () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const path = pathname.split("/")[1];
    setCurrentRol(path.toUpperCase());
  }, [pathname]);

  return (
    <div>
      <Menu withArrow>
        <Menu.Target>
          <IconSettingsFilled className="hover:cursor-pointer" />
        </Menu.Target>
        <Menu.Dropdown>
          {user.roles.length > 1 &&
            user.roles.map(
              (role) =>
                currentRol !== role.name && (
                  <Menu.Item key={role._id} component={Link} to={defaultRoutes[role.name]}>
                    Cambiar a {role.name}
                  </Menu.Item>
                )
            )}
          <Menu.Item onClick={async () => await handleSignOut()}>Cerrar Sesión</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
