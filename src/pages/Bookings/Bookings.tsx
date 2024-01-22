import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { useSessionStorage } from "@uidotdev/usehooks";

import { API_URL } from "@/constants";
import { getRequest } from "@/helpers/getRequest";
import { UserData } from "@/types/user-data.types";

interface IAllBookingsResponse {
  ID: number;
  RoomID: string;
  RoomPrice: number;
  TotalPrice: number;
  TotalBookedDays: number;
  Name: string;
  Email: string;
  Phone: string;
  Message: string;
  StartDate: string;
  EndDate: string;
  CreatedAt: string;
  UpdatedAt: string;
  Processed: boolean;
}

const Bookings = (): JSX.Element => {
  const [userData] = useSessionStorage<UserData>("user-data", null);

  const {
    data: bookings,
    trigger,
    isMutating: isLoading,
  } = useSWRMutation(
    {
      url: `${API_URL}/admin/bookings`,
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
    getRequest<IAllBookingsResponse>
  );

  useEffect(() => {
    trigger();
  }, []);

  console.log(bookings);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div className="">Bookings</div>;
};

export default Bookings;
