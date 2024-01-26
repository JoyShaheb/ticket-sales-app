import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import {
//   logoutSuccess,
//   themeSwitch,
// } from "../../store";
import { useEffect } from "react";
import { ThemeTypesEnum } from "@/types/enum";
import SideBarMenu from "./SideBarMenu";
import MobileSideBar from "./MobileSideBar";
import { RootState, themeSwitch, useLogoutMutation } from "@/store";
import { toast } from "sonner";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const appSignout = async () => {
    toast.promise(
      logout(null)
        .unwrap()
        .then(() => navigate("/login")),
      {
        loading: "Logging out...",
        success: "Logout successful",
        error: "Logout failed",
      }
    );
  };

  const theme = useSelector((state: RootState) => state.system.mode);

  useEffect(() => {
    document.documentElement.classList.toggle(
      ThemeTypesEnum.DARK,
      theme === ThemeTypesEnum.DARK
    );
  }, [theme]);

  const handleChangeTheme = () =>
    dispatch(
      themeSwitch(
        theme === ThemeTypesEnum.LIGHT
          ? ThemeTypesEnum.DARK
          : ThemeTypesEnum.LIGHT
      )
    );

  return (
    <div className="flex">
      <aside className="hidden md:block sticky top-0 h-screen min-w-[220px] bg-background border-r-2 text-foreground p-4">
        <SideBarMenu
          theme={theme}
          appSignout={appSignout}
          handleChangeTheme={handleChangeTheme}
        />
      </aside>
      <main className="flex-grow p-6">{children}</main>
      <MobileSideBar
        menu={
          <SideBarMenu
            theme={theme}
            appSignout={appSignout}
            handleChangeTheme={handleChangeTheme}
          />
        }
      />
    </div>
  );
};

export default Sidebar;
