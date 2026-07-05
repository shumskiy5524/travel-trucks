import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

export interface CampersParams {
  page?: number;
  limit?: number;
  perPage?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
}


const FORM_MAPPING: Record<string, string> = {
  fullyIntegrated: 'integrated',
  integrated: 'integrated',
  panelTruck: 'panel_van',
  panel_van: 'panel_van',
  alcove: 'alcove',
  semiIntegrated: 'semi_integrated',
  semi_integrated: 'semi_integrated',
};

export const fetchCampers = async (params: CampersParams = {}) => {
  const queryParams: Record<string, string | number> = {};

  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.perPage = params.limit;
  if (params.perPage) queryParams.perPage = params.perPage;

 
  if (params.location) queryParams.location = params.location.trim();

  if (params.form) {
    queryParams.form = FORM_MAPPING[params.form] || params.form;
  }


  if (params.transmission) queryParams.transmission = params.transmission;
  if (params.engine) queryParams.engine = params.engine;

  const response = await instance.get('/campers', { params: queryParams });
  return response.data;
};
export const fetchCamperById = async (id: string) => {
  const response = await instance.get(`/campers/${id}`);
  return response.data;
};

export type BookingData = {
  name: string;
  email: string;
  date: string;
  comment: string;
};

export const createBooking = async (bookingData: BookingData) => {
  const response = await instance.post('/bookings', bookingData);
  return response.data;
};