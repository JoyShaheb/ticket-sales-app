import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu, RxBackpack } from "react-icons/rx";

const MobileSideBar = ({ menu }: { menu: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex md:hidden">
          <RxHamburgerMenu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pt-4">
          <SheetTitle className="flex justify-center pb-6">
            <RxBackpack className="w-8 h-8" />
          </SheetTitle>
          <div className="flex gap-3 flex-col items-center">{menu}</div>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
