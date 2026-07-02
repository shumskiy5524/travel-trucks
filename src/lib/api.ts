import axios from 'axios';

const API = 'https://campers-api.goit.study';

type CampersParams = {
  page?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
};

type BookingData = {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
};

export const fetchCampers = async (params: CampersParams) => {
  const res = await axios.get(`${API}/campers`, { params });
  return res.data;
};

export const fetchCamperById = async (id: string) => {
  const res = await axios.get(`${API}/campers/${id}`);
  return res.data;
};

export const createBooking = async (data: BookingData) => {
  const res = await axios.post(`${API}/booking`, data);
  return res.data;
};