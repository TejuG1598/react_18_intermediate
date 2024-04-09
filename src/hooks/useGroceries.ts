import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient.ts";

export interface GroceryInterface {
  id: number;
  name: string;
  price: number;
}

function useGroceries() {
  const queryClient = useQueryClient();
  const getGroceries = () =>
    apiClient.get("/groceries").then((res) => res.data);
    
  const postGroceries = (groceryItem: GroceryInterface) =>
    apiClient
      .post("/groceries", groceryItem)
      .then((res) => res.data);

  const {
    data: groceriesListData,
    error,
    isLoading,
  } = useQuery<GroceryInterface[], Error>({
    queryKey: ["groceriesKey"],
    queryFn: getGroceries,
  });

    //Here we are just adding a grocery to groceries[]
    //const updaterFunction = (groceryItem: GroceryInterface, groceries: GroceryInterface[]) => [...groceries,groceryItem]

  const addingGrocery = useMutation({
    mutationFn: (groceryItem: GroceryInterface) => postGroceries(groceryItem),
    onSuccess: () => 
    // Approch 1: invalidate cache
     queryClient.invalidateQueries(["groceriesKey"])
     //APPROACH2: Modify cache directly: 
            //first parameter = queryKey
            //second parameter = function to update data to groceries list. Observe that we added alias name as 'groceries' to data in useQuery()
           // queryClient.setQueriesData(['groceries'],updaterFunction(apiResponse,(groceries || [])))
  })

  return { groceriesListData, error, isLoading , addingGrocery};
}

export default useGroceries;
