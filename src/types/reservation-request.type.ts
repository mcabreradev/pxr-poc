export type ReservationRequest = {
  id?: number | null;
  property_id: number;
  guest_id: number | undefined;
  sales_channel_type: string;
  process_state: string;
  date_in: string | Date;
  date_out: string | Date;
  mon_id: number;
  mon_iso: string | number | null | undefined;
  total_cost: number | null | undefined;
  room_types_cost: number;
  guest_mon_iso: string | number | null | undefined;
  mon_commission_id: number;
  commission_mon_iso: string | number | null | undefined;
  is_default_commission: number;
  reservation_status: string;
  room_types: ReservedRoom[];
  extras?: Extras[];
  coupons?: Coupon[];
  adults_amount: number;
  additional_field_values?: string[] | string;
  reg_status: string;
  sales_origin_type: string;
  send_confirmed_email: number;
  confirmed_email_active: number;
  thank_you_email_to_pax_active: number;
  send_payment_email: number;
  new_booking_email_send_to_hotel: number;
  confirmed_agreement: number;
  guest_preferred_language?: string;
  guest_email?: string;
  guest_country_code?: string;
  payment_id?: number;
  id_public?: string;
  reservation_id?: number;
};

export type RemainingReservationRequestData = {
  payment_id: number;
  guest_preferred_language: string;
  guest_email: string | undefined;
  guest_country_code: string;
};

export type ReservationData = {
  id_public: string;
  reservation_id: number;
};

// Names come like this directly from backend
export type Vq = {
  Qp?: string;
  Sp?: string;
  Yp?: number;
  Np?: number;
  Lp?: number;
  Op?: number;
  Pp?: number;
  Vp?: number;
  Xp?: number;
  Rp?: number;
  Wp?: number;
  Mp?: number;
  Tp?: string;
};

// Names come like this directly from backend
export type ReservationResponse = {
  xq?: number;
  res_guest_id?: number;
  Lq?: string;
  iq?: string;
  zq?: string;
  Eq?: string;
  oq?: number;
  qq?: number;
  res_status_reg?: string;
  pq?: number;
  Cq?: number;
  res_guest_mon_iso?: string;
  Dq?: string;
  res_mon_commission?: number;
  sq?: number;
  vq?: Vq[];
  uq?: never[];
  res_commission_default?: number;
  gq?: string;
  un?: number;
  res_send_confirmed_email?: number;
  res_send_payment_email?: number;
  res_new_booking_email_send_to_hotel?: number;
  hq?: number;
};

export type ReservationRequestResponseData = {
  id: number;
  process_state: string;
  step_completed: string;
  reservation_created: number;
  reservation_id?: number;
  id_public?: string;
  client_id?: number;
  reservation?: ReservationResponse;
};

export type ReservationRequestResponse = {
  message: string;
  code: number;
  data: ReservationRequestResponseData | ReservationRequest | string | number;
};

export type ReservedRoom = {
  har_in: string | Date;
  har_out: string | Date;
  har_hab_id?: number | null; // Physical id of the room, does not have to be sent
  har_tha_id: number | string | null | undefined; //Room type id
  har_res_id?: number | null;
  har_pla_id: string | number | null | undefined; // Selected plan
  har_cli_id?: number;
  har_hot_id: number;
  har_adults: number;
  har_seniors?: number | null;
  har_children: number;
  har_infants: number;
  har_pax_info?: string | null;
  har_adults_info?: string | null;
  har_childrens_info: string;
  har_seniors_info?: string | null;
  har_infants_info: string | null;
  har_cost: number | null | undefined;
  har_additional_field_1?: string | null;
  har_additional_field_2?: string | null;
  har_additional_field_3?: string | null;
};

export type CMAValue = {
  exr_cma_value_1: string | null;
  exr_cma_value_2: string | null;
  exr_cma_value_3: string | null;
};

export type Extras = {
  ext_id: number;
  mon_id: number;
  quantity: number;
  cost: number;
  cma_values: CMAValue[];
};

export type Coupon = {
  cpn_id: number;
  implementation_type: string;
  mon_id: number;
  amount: number;
  amount_applied: number;
  use_with_others: number;
};
