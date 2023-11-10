import { Menu } from "@mantine/core";
import { IconSettingsFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "../../store";

export default function ConfigMenu() {
  const navigate = useNavigate();
  const { logout } = useSessionStore();

  const handleSignOut = async () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Menu withArrow>
        <Menu.Target>
          <IconSettingsFilled className="hover:cursor-pointer" />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={async () => await handleSignOut()}>
            Cerrar Sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
