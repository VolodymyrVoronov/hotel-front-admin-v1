import { Outlet } from "react-router-dom";

import Navigation from "@/components/Navigation/Navigation";
import LogOut from "@/components/LogOut/LogOut";

const AdminBoard = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:h-screen m-auto">
      <div className="flex flex-col col-span-1 md:col-span-4 lg:col-span-3 xl:col-span-2  justify-between border-b md:border-r border-gray-300">
        <Navigation />

        <div className="p-2 md:p-3">
          <LogOut />
        </div>
      </div>

      <div className="col-span-1 md:col-span-8 lg:col-span-9 xl:col-span-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminBoard;
