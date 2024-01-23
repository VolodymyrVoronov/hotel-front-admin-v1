import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import cn from "classnames";

import { IBooking } from "@/interfaces/booking.interface";

interface IBookingProps extends IBooking {
  onProcessClick: ({
    ID,
    Processed,
  }: {
    ID: number;
    Processed: boolean;
  }) => void;

  loading: boolean;
}

const Booking = ({
  ID,
  RoomID,
  RoomPrice,
  TotalPrice,
  TotalBookedDays,
  Name,
  Email,
  Phone,
  Message,
  StartDate,
  EndDate,
  Processed,

  onProcessClick,

  loading,
}: IBookingProps): JSX.Element => {
  const startDate = new Date(StartDate);
  const endDate = new Date(EndDate);

  const formattedStartDate = startDate.toLocaleDateString();
  const formattedEndDate = endDate.toLocaleDateString();

  const onProcessButtonClick = (): void => {
    onProcessClick({ ID, Processed: !Processed });
  };

  return (
    <Card className="flex flex-col justify-start">
      <CardHeader>
        <CardTitle>Room type: {RoomID}</CardTitle>
        <CardDescription>
          Price: <b>{RoomPrice} $/day</b>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>
          Name: <b>{Name}</b>
        </p>
        <p>
          Email:{" "}
          <b>
            <a
              href={`mailto:${Email}`}
              className="text-sky-500 hover:underline"
            >
              {Email}
            </a>
          </b>
        </p>
        <p>
          Phone:{" "}
          <b>
            <a href={`tel:${Phone}`} className="text-sky-500 hover:underline">
              {Phone}
            </a>
          </b>
        </p>
        <p>
          Message:{" "}
          <b>
            <i>{Message}</i>
          </b>
        </p>
        <p>
          Start date: <b>{formattedStartDate}</b>
        </p>
        <p>
          End date: <b>{formattedEndDate}</b>
        </p>
        <p>
          Processed: <b>{Processed ? "Yes" : "No"}</b>
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-3">
        <p>
          Total price: <b>{TotalPrice} $</b>
        </p>
        <p>
          Total booked days: <b>{TotalBookedDays}</b>
        </p>
      </CardFooter>
      <CardFooter className="flex mt-auto">
        <Button
          onClick={onProcessButtonClick}
          disabled={loading}
          type="button"
          className={cn(Processed ? "bg-green-500" : "bg-red-500", "w-full")}
        >
          Processed: {Processed ? "Yes" : "No"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Booking;
