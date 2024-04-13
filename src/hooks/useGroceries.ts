import { useQuery } from "@tanstack/react-query";

import { CACHE_QUERY_KEY } from "../utils/Constants.ts";
import groceryService, { Grocery } from "../services/groceryService.ts";



function useGroceries() {
  

  const {
    data: groceriesListData,
    error,
    isLoading,
  } = useQuery<Grocery[], Error>({
    queryKey: CACHE_QUERY_KEY,
    queryFn: groceryService.getAll,
  });

  return { groceriesListData, error, isLoading };
}

export default useGroceries;
