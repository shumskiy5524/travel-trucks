import axios from 'axios';

const API = 'https://campers-api.goit.study/campers';
const LIMIT = 4;

type Filters = {
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
  AC?: boolean;
  kitchen?: boolean;
  tv?: boolean;
  bathroom?: boolean;
};

type CampersParams = {
  page: number;
} & Filters;

export const fetchCampers = async (params: CampersParams) => {
  const { page, ...filters } = params;

  const { data } = await axios.get(API, {
    params: {
      page,
      limit: LIMIT,
      ...filters,
    },
  });

  return data;
};