import { ThemeTypesEnum } from "@/types/enum";
import DarkModeSwitch from "./DarkModeSwitch";
import SidebarLink from "./SidebarLink";
import { UserCircle, ShoppingBag, LogOut } from "lucide-react";

const SideBarMenu = ({
  theme,
  handleChangeTheme,
  appSignout,
}: {
  appSignout: () => void;
  handleChangeTheme: () => void;
  theme: ThemeTypesEnum.DARK | ThemeTypesEnum.LIGHT;
}) => {
  return (
    <>
      <div className="flex items-center mb-4 space-x-1">
        <h1 className="text-lg font-medium">Ticket Sales APP</h1>
      </div>
      <nav className="space-y-2">
        <SidebarLink
          icon={<UserCircle className="w-4 h-4" />}
          label="User"
          path="/user"
        />
        <SidebarLink
          icon={<ShoppingBag className="w-4 h-4" />}
          label="Products"
          path="/products"
        />
        <SidebarLink
          icon={<ShoppingBag className="w-4 h-4" />}
          label="Login"
          path="/login"
        />{" "}
        <SidebarLink
          icon={<ShoppingBag className="w-4 h-4" />}
          label="Create Account"
          path="/signup"
        />
        <div onClick={appSignout}>
          <SidebarLink
            icon={<LogOut className="w-4 h-4" />}
            label="Sign Out"
            path="/"
          />
        </div>
        <DarkModeSwitch theme={theme} onClick={handleChangeTheme} />
      </nav>
    </>
  );
};

export default SideBarMenu;