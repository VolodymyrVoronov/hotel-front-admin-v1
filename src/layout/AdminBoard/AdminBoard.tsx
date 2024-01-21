import { Outlet } from "react-router-dom";

import Navigation from "@/components/Navigation/Navigation";

const AdminBoard = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12  md:h-screen m-auto">
      <div className="col-span-1 md:col-span-4 lg:col-span-3 xl:col-span-2 border-r border-gray-300">
        <Navigation />
      </div>

      <div className="col-span-1 md:col-span-8 lg:col-span-9 xl:col-span-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminBoard;
