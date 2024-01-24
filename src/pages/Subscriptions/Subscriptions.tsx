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

interface ISubscriptionResponse {
  ID: number;
  Email: string;
  CreatedAt: string;
  UpdatedAt: string;
}

const Subscriptions = (): JSX.Element => {
  const { userData } = useHookstate<IGlobalState>(globalState).get();

  const {
    data: subscriptions,
    trigger: loadSubscriptions,
    isMutating: isSubscriptionsLoading,
  } = useSWRMutation(
    {
      url: `${API_URL}/admin/subscription`,
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
    getRequest<ISubscriptionResponse[]>
  );

  useEffect(() => {
    loadSubscriptions();
  }, []);

  if (!subscriptions?.length && !isSubscriptionsLoading) {
    return (
      <div className="flex justify-center max-w-[768px] m-auto">
        <p className="text-xl">No subscriptions yet</p>
      </div>
    );
  }

  if (isSubscriptionsLoading) {
    return <Loader showText />;
  }

  return (
    <div className="flex max-w-[768px] m-auto">
      <Table>
        <TableCaption>Users Subscriptions</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Date of subscription</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {subscriptions?.map((subscription) => (
            <TableRow key={subscription.ID}>
              <TableCell className="font-medium">{subscription.ID}</TableCell>
              <TableCell>
                <a href={`mailto:${subscription.Email}`}>
                  {subscription.Email}
                </a>
              </TableCell>
              <TableCell className="text-right">
                {new Date(subscription.CreatedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Subscriptions;
