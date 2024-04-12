import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_QUERY_KEY } from "../utils/Constants";
import groceryService, { Grocery } from "../services/groceryService";


interface Context{
  previousGroceries: Grocery[]
}

function useAddGrocery() {

  const queryClient = useQueryClient();

  const addingGrocery = useMutation<Grocery,Error,Grocery,Context>({

    onMutate: (grocery) => {      
      const previousGroceries = queryClient.getQueryData<Grocery[]>(CACHE_QUERY_KEY) || [];      
      queryClient.setQueryData<Grocery[]>(CACHE_QUERY_KEY,groceries => [...(groceries || []),grocery]);      
      return {previousGroceries};
    },
    
    mutationFn: (groceryItem) => groceryService.postItem(groceryItem),

    //Success from API
    onSuccess: (apiResponse,grocery) => queryClient.setQueryData<Grocery[]>(CACHE_QUERY_KEY, groceries => groceries?.map(item => item === grocery ? apiResponse : item)),

    //Error from API
    onError: (error,grocery,context) => {
      if (!context) return;
      queryClient.setQueryData<Grocery[]>(CACHE_QUERY_KEY,context.previousGroceries);
    }
  });

  return { addingGrocery };
}

export default useAddGrocery;
