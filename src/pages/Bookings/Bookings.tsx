import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { useHookstate } from "@hookstate/core";

import globalState, { IGlobalState } from "@/state/state";

import { API_URL } from "@/constants";
import { getRequest } from "@/helpers/getRequest";
import { postRequestWithHeaders } from "@/helpers/postRequest";
import { IBooking } from "@/interfaces/booking.interface";

import Booking from "@/components/Booking/Booking";

interface IAllBookingsResponse extends IBooking {}

const Bookings = (): JSX.Element => {
  const { userData } = useHookstate<IGlobalState>(globalState).get();

  const {
    data: bookings,
    trigger: loadBookings,
    isMutating: isBookingsLoading,
  } = useSWRMutation(
    {
      url: `${API_URL}/admin/bookings`,
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
    getRequest<IAllBookingsResponse[]>
  );

  const {
    data: processBookingData,
    trigger: processBooking,
    isMutating: isBookingProcessing,
  } = useSWRMutation(
    {
      url: `${API_URL}/admin/bookings-process`,
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
    postRequestWithHeaders<
      { ID: number; Processed: boolean },
      { message: string; processed: boolean }
    >
  );

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (processBookingData?.processed && !isBookingProcessing) {
      loadBookings();
    }
  }, [processBookingData?.processed, isBookingProcessing]);

  const onProcessClick = ({
    ID,
    Processed,
  }: {
    ID: number;
    Processed: boolean;
  }): void => {
    processBooking({ ID, Processed });
  };

  if (!bookings?.length && !isBookingsLoading) {
    return <div>No bookings</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {bookings?.map(({ ...booking }) => (
        <Booking
          key={booking.ID}
          onProcessClick={onProcessClick}
          loading={isBookingProcessing || isBookingsLoading}
          {...booking}
        />
      ))}
    </div>
  );
};

export default Bookings;
