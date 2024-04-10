import APIClient from "./apiClient";

export interface Grocery {
  id: number;
  name: string;
  price: number;
}

export default new APIClient<Grocery>("/groceries");
