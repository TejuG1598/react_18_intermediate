import { QueryClient, useMutation } from "@tanstack/react-query"
import groceryService, { Grocery } from "../services/groceryService"
import { CACHE_QUERY_KEY } from "../utils/Constants"


const useDeleteGrocery = () => {
  const queryClient =  new QueryClient()
  const deleteGrocery = useMutation<Grocery,Error, Grocery>({
    
    mutationFn: (groceryItem) => groceryService.delete(groceryItem.id),
    onSuccess: (apiResponse, groceryItem) => queryClient.setQueryData<Grocery[]>(CACHE_QUERY_KEY,groceries => groceries?.filter(grocery => grocery.id != groceryItem.id))
  })

  return {deleteGrocery}
}

export default useDeleteGrocery