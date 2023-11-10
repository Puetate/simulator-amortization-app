import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { useSessionStore } from "../store";
import ConfigMenu from "./components/ConfigMenu";

export default function Layout() {
  const { user } = useSessionStore();
  const [opened, { toggle }] = useDisclosure();
  //   const [title, setTitle] = useState("");
  //   const handleLinkChange = (title: string) => {
  //     setTitle(title);
  //   };
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "md", collapsed: { mobile: !opened } }}
      padding="md"
      className="text-white"
    >
      <AppShell.Header className=" bg-gray-900">
        <Group h="100%" px="md" className="flex justify-between">
          <div>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              size="sm"
              color="white"
            />
            <Text className="hidden text-xl font-bold uppercase md:block">
              {/* {title} */}
            </Text>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Text>{user.names}</Text>
            <ConfigMenu />
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className=" bg-gray-900">
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="md"
            size="sm"
            color="white"
          />
          <img
            src="/vivo-vivo.svg"
            className="sm:mx-auto sm:w-28"
            alt="vivo vivo"
            height={100}
            width={100}
          />
        </Group>
        {/* <NavLinks onPathChange={handleLinkChange} /> */}
      </AppShell.Navbar>
      <AppShell.Main className="flex bg-gray-900">
        <div className="w-full">
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
