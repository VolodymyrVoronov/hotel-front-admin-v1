export interface IBooking {
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
