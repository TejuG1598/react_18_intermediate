import { useQuery } from "@tanstack/react-query";
import { CACHE_QUERY_KEY } from "../utils/Constants.ts";
import groceryService, { Grocery } from "../services/groceryService.ts";

const useGroceries = () => {


  const {data: groceries,error,isLoading} = useQuery<Grocery[], Error>({
    queryKey: CACHE_QUERY_KEY,
    queryFn: groceryService.getAll,
  });

  return { groceries, error, isLoading };
}

export default useGroceries;
