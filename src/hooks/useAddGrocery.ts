import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_QUERY_KEY } from "../utils/Constants";
import groceryService, { Grocery } from "../services/groceryService";

interface ContextI {
  previousData: Grocery[];
}

function useAddGrocery() {
  const queryClient = useQueryClient();

  const addingGrocery = useMutation<Grocery[], Error, Grocery, ContextI>({
    onMutate: (groceryItem: Grocery) => {
      const previousData = queryClient.getQueryData(CACHE_QUERY_KEY);
      queryClient.setQueryData<Grocery[]>(
        CACHE_QUERY_KEY,
        (groceriesListData) => [...(groceriesListData || []), groceryItem]
      );
      return { previousData };
    },

    mutationFn: (groceryItem: Grocery) => groceryService.postItem(groceryItem),

    //Success from API
    onSuccess: (apiResponse: Grocery, groceryItem: Grocery) =>
      queryClient.setQueryData<Grocery[]>(
        CACHE_QUERY_KEY,
        (groceriesListData) =>
          groceriesListData?.map((item) =>
            item === groceryItem ? apiResponse : item
          )
      ),

    //Error from API
    onError: (error: Error, groceryItem: Grocery, previousData: ContextI) => {
      if (!previousData) return;
      queryClient.setQueryData(CACHE_QUERY_KEY, previousData);
    },
  });

  return { addingGrocery };
}

export default useAddGrocery;
