export interface Product {

  _id: string;

  name: string;
  description?: string;
  brand?: string;
  category?: string;
  store?: string;
  location?: string;
  notes?: string;
  lifespan?: number;
  threshold?: number;
}
