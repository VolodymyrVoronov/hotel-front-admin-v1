import { Outlet } from "react-router-dom";

import Navigation from "@/components/Navigation/Navigation";
import LogOut from "@/components/LogOut/LogOut";

const AdminBoard = (): JSX.Element => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between p-2 md:p-3 border-b-2 border-slate-200">
        <Navigation />

        <div>
          <LogOut />
        </div>
      </div>

      <div className="p-2 md:p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminBoard;
