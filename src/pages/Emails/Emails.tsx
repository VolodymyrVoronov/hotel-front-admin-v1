import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { useHookstate } from "@hookstate/core";

import globalState, { IGlobalState } from "@/state/state";
import { getRequest } from "@/helpers/getRequest";
import { API_URL } from "@/constants";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/Loader/Loader";

interface IEmailResponse {
  ID: number;
  Name: string;
  Email: string;
  Message: string;
  CreatedAt: string;
}

const Emails = (): JSX.Element => {
  const { userData } = useHookstate<IGlobalState>(globalState).get();

  const {
    data: emails,
    trigger: loadEmails,
    isMutating: isEmailsLoading,
  } = useSWRMutation(
    {
      url: `${API_URL}/admin/contact-us`,
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
    getRequest<IEmailResponse[]>
  );

  useEffect(() => {
    loadEmails();
  }, []);

  if (!emails?.length && !isEmailsLoading) {
    return (
      <div className="flex justify-center max-w-[768px] m-auto">
        <p className="text-xl">No emails yet</p>
      </div>
    );
  }

  if (isEmailsLoading) {
    return <Loader showText />;
  }

  return (
    <div className="flex max-w-[1024px] m-auto">
      <Table>
        <TableCaption>Users' Emails to Us</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px]">ID</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Sent</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {emails?.map((email) => (
            <TableRow key={email.ID}>
              <TableCell className="w-[10px] border align-top">
                {email.ID}
              </TableCell>
              <TableCell className="w-[100px] border align-top">
                {email.Name}
              </TableCell>
              <TableCell className="border align-top">{email.Email}</TableCell>
              <TableCell className="border">{email.Message}</TableCell>
              <TableCell className="text-right border align-top">
                {new Date(email.CreatedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Emails;
