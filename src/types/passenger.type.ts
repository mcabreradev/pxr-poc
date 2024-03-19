export type GeneralPassengerInfo = {
  paxs: string[];
  children: string[];
  infants: string[];
  seniors: string[];
};

export type DetailedPassengerInfo = {
  full_name: string | null;
  first_name: string | null;
  middle_name: string | null;
  primary_last_name: string | null;
  second_last_name: string | null;
  document_id: string | null;
  birthday: string | null;
  age: string | null;
  email: string | null;
  phone: string | null;
  resident: string | null;
  from: string | null;
  country: string | null;
  remarks: string | null;
};
