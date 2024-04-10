import { useQuery } from "@tanstack/react-query";

import { CACHE_QUERY_KEY } from "../utils/Constants.ts";
import APIClient from "../services/apiClient.ts";
import { Grocery } from "../services/groceryService.ts";



// interface ContextType {
//     previousGroceryList : GroceryInterface[]
// }

const apiClient = new APIClient("/groceries")

function useGroceries() {
  

  const {
    data: groceriesListData,
    error,
    isLoading,
  } = useQuery<Grocery[], Error>({
    queryKey: CACHE_QUERY_KEY,
    queryFn: apiClient.getAll,
  });

  return { groceriesListData, error, isLoading };
}

export default useGroceries;
