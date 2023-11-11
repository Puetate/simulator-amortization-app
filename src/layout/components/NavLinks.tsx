import { NavLink } from "@mantine/core";
import { IconBuildingBank, IconReportMoney, TablerIconsProps } from "@tabler/icons-react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { cn } from "../../utils";

type Link = { label: string; href: string; icon: (props: TablerIconsProps) => JSX.Element };

const links: Record<string, Array<Link>> = {
  user: [{ label: "Amortización", href: "/user/amortization", icon: IconReportMoney }],
  admin: [{ label: "Compañía", href: "/admin/company", icon: IconBuildingBank }]
};

export default function NavLinks({ onPathChange }: { onPathChange: (label: string) => void }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const link = links[pathname.split("/")[1]].find((link) => link.href === pathname);
    onPathChange(link?.label ?? "");
  }, [pathname, onPathChange]);

  return (
    <>
      {links[pathname.split("/")[1]].map((link) => {
        const LinkIcon = link.icon;
        return (
          <NavLink
            key={link.label}
            label={link.label}
            to={link.href}
            component={Link}
            leftSection={<LinkIcon />}
            className={cn(
              "mt-2 rounded-lg font-bold text-white hover:bg-white hover:text-black",
              pathname === link.href && "bg-white text-black"
            )}
          />
        );
      })}
    </>
  );
}
