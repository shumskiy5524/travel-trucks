export interface CamperGallery {
  thumb: string;
  original: string;
}

export interface CamperReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  engine: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  transmission: 'automatic' | 'manual';
  form: 'panelTruck' | 'fullyIntegrated' | 'alcove';
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  tv: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  gallery: CamperGallery[];
  reviews: CamperReview[];
}

export interface CampersResponse {
  items: Camper[];
  total: number;
}

export interface FilterState {
  location: string;
  form: string;
  transmission: string;
  engine: string;
  AC: boolean;
  kitchen: boolean;
  tv: boolean;
  bathroom: boolean;
}