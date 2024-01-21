import { Outlet } from "react-router-dom";

const AdminBoard = (): JSX.Element => {
  return (
    <div>
      AdminBoard
      <nav>Nav</nav>
      <Outlet />
    </div>
  );
};

export default AdminBoard;
