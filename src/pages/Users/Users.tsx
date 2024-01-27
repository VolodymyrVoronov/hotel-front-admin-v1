import { useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import useSWRMutation from "swr/mutation";
import { ToastOptions, toast } from "react-toastify";

import globalState, { IGlobalState } from "@/state/state";

import { API_URL, USER_ROLE } from "@/constants";
import { getRequest } from "@/helpers/getRequest";
import { postRequestWithHeaders } from "@/helpers/postRequest";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface IAllUsersResponse {
  ID: number;
  Email: string;
  Role: string;
  CreatedAt: string;
}

interface IDeleteRequest {
  ID: number;
}

interface IDeleteResponse {
  message: string;
}

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
} satisfies ToastOptions;

const toastSuccess = (message: string, options?: ToastOptions): void => {
  toast.success(message, {
    ...toastConfig,
    ...options,
  });
};

const toastError = (message: string, options?: ToastOptions): void => {
  toast.error(message, {
    ...toastConfig,
    ...options,
  });
};

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

  const { trigger: deleteUser, isMutating: isDeleting } = useSWRMutation(
    {
      url: `${API_URL}/admin/users`,
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
      method: "DELETE",
    },
    postRequestWithHeaders<IDeleteRequest, IDeleteResponse>
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const onDeletedUserButtonClick = async (ID: number): Promise<void> => {
    await deleteUser(
      { ID },
      {
        onSuccess: (data) => {
          toastSuccess(data?.message, {
            autoClose: 2000,
          });

          setTimeout(() => {
            loadUsers();
          }, 1000);
        },

        onError: (error) => {
          if (error instanceof Error) {
            toastError(error.message + " Check your email and password.");
          } else {
            toastError("Something went wrong. Please try again later.");
          }
        },
      }
    );
  };

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
        <TableCaption>Users</TableCaption>

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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {user.Role !== USER_ROLE.ADMIN && (
                      <Button
                        disabled={isUsersLoading || isDeleting}
                        variant="destructive"
                        size="sm"
                      >
                        Delete
                      </Button>
                    )}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this user?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete user's account and remove user's data from
                        server.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          onDeletedUserButtonClick(user.ID);
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
