import { useMutation, useQueryClient } from "@tanstack/react-query"
import groceryService, { Grocery } from "../services/groceryService"
import { CACHE_QUERY_KEY } from "../utils/Constants";

const useDeleteGrocery = () => {
    const queryClient = useQueryClient();
    const deleteGrocery = useMutation<Grocery,Error,Grocery>({
        mutationFn: (grocery) => groceryService.delete(grocery.id),
        onSuccess: (apiResponse, grocery) => {
            queryClient.setQueryData<Grocery[]>(CACHE_QUERY_KEY, groceries => groceries?.filter(item => item != grocery))
        }
    })

    return {deleteGrocery}
}

export default useDeleteGrocery