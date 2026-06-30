import axios from 'axios';
import { CampersResponse, Camper } from '@/types/camper';

const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const camperService = {
  // Запрос для useInfiniteQuery (пагинация по 4 элемента на страницу)
  getCampers: async ({ pageParam = 1, limit = 4, filters = {} }) => {
    const params = {
      page: pageParam,
      limit,
      ...filters,
    };
    const { data } = await api.get<CampersResponse>('/campers', { params });
    return data;
  },

  // Запрос деталей отдельного кемпера
  getCamperById: async (id: string) => {
    const { data } = await api.get<Camper>(`/campers/${id}`);
    return data;
  },
};