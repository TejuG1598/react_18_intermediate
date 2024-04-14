import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_QUERY_KEY } from "../utils/Constants";
import groceryService, { Grocery } from "../services/groceryService";

interface ContextI {
  previousData : Grocery[]
}

function useAddGrocery() {
  const queryClient = useQueryClient();

  const addingGrocery = useMutation<Grocery, Error, Grocery, ContextI>({

    onMutate: (groceryItem) => {
      const previousData = queryClient.getQueryData<Grocery[]>(CACHE_QUERY_KEY) || [];
      queryClient.setQueryData<Grocery[]>(CACHE_QUERY_KEY,groceriesListData => [...(groceriesListData || []), groceryItem]);
      return { previousData };
    },

    mutationFn: (groceryItem) => groceryService.postItem(groceryItem),

    //Success from API
    onSuccess: (apiResponse, groceryItem) =>
      queryClient.setQueryData<Grocery[]>(
        CACHE_QUERY_KEY,
        (groceriesListData) =>
          groceriesListData?.map((item) =>
            item === groceryItem ? apiResponse : item
          )
      ),

    //Error from API
    onError: (error, groceryItem, context) => {
      if (!context) return;
      queryClient.setQueryData<Grocery[]>(CACHE_QUERY_KEY, context.previousData);
    },
  });

  return { addingGrocery };
}

export default useAddGrocery;
