import { lazy, useEffect, Suspense } from "react";
import { useHookstate } from "@hookstate/core";
import useSWRMutation from "swr/mutation";

import globalState, { IGlobalState } from "@/state/state";

import { API_URL, USER_ROLE } from "@/constants";
import { getRequest } from "@/helpers/getRequest";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DrawerContainer from "@/components/DrawerContainer/DrawerContainer";
import Loader from "@/components/Loader/Loader";

const NewUserForm = lazy(() => import("@/components/NewUserForm/NewUserForm"));

interface IAllUsersResponse {
  ID: number;
  Email: string;
  Role: string;
  CreatedAt: string;
}

const Users = (): JSX.Element => {
  const { userData } = useHookstate<IGlobalState>(globalState).get();

  const {
    data: users,
    trigger: loadUsers,
    isMutating: isUsersLoading,
  } = useSWRMutation(
    {
      url: `${API_URL}/admin/users`,
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
    getRequest<IAllUsersResponse[]>
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const onDeletedUserButtonClick = (userId: number): void => {
    console.log(userId);
  };

  const onCreateNewUserButtonClick = (): void => {};

  if (!users?.length && !isUsersLoading) {
    return (
      <div className="flex justify-center max-w-[768px] m-auto">
        <p className="text-xl">Nothing to show</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-[1024px] m-auto">
      <Table className="w-full">
        <TableCaption>
          <DrawerContainer
            triggerButton={
              <Button
                disabled={isUsersLoading}
                variant="secondary"
                size="sm"
                onClick={onCreateNewUserButtonClick}
              >
                Create new user
              </Button>
            }
            title="New user"
          >
            <Suspense fallback={<Loader />}>
              <NewUserForm />
            </Suspense>
          </DrawerContainer>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px] border">ID</TableHead>
            <TableHead className="w-[100px] border">Email</TableHead>
            <TableHead className="border">Role</TableHead>
            <TableHead className="border">Created</TableHead>
            <TableHead className="text-right border">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.ID}>
              <TableCell className="w-[10px] border align-top">
                {user.ID}
              </TableCell>
              <TableCell className="border align-top">{user.Email}</TableCell>
              <TableCell className="border align-top">{user.Role}</TableCell>
              <TableCell className="border">
                {new Date(user.CreatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right border align-top">
                {user.Role !== USER_ROLE.ADMIN && (
                  <Button
                    disabled={isUsersLoading}
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      onDeletedUserButtonClick(user.ID);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
