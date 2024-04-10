import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient.ts";

export interface GroceryInterface {
  id: number;
  name: string;
  price: number;
}

// interface ContextType {
//     previousGroceryList : GroceryInterface[]
// }


function useGroceries() {
  const queryClient = useQueryClient();
  const getGroceries = () =>
    apiClient.get("/groceries").then((res) => res.data);

  const postGroceries = (groceryItem: GroceryInterface) =>
    apiClient.post("/groceries", groceryItem).then((res) => res.data);

  const {
    data: groceriesListData,
    error,
    isLoading,
  } = useQuery<GroceryInterface[], Error>({
    queryKey: ["groceriesKey"],
    queryFn: getGroceries,
  });

  //Here we are just adding a grocery to groceries[]
  const updaterFunction = (groceryItem: GroceryInterface, groceriesListData: GroceryInterface[]) => [...groceriesListData, groceryItem];

  const updateGrocery = (apiResponse: GroceryInterface, groceries: GroceryInterface[]) => {
        return groceries.map(grocery => grocery.name == apiResponse.name ? apiResponse : grocery)
  }

  const addingGrocery = useMutation({

    onMutate: (groceryItem: GroceryInterface) => {
        const previousGroceryList = queryClient.getQueryData(["groceriesKey"])
        queryClient.setQueryData(["groceriesKey"],updaterFunction(groceryItem, groceriesListData || []))
        return previousGroceryList;
    },

    mutationFn: (groceryItem: GroceryInterface) => postGroceries(groceryItem),

    //Success from API
    onSuccess: (apiResponse) => queryClient.setQueryData(["groceriesKey"],updateGrocery(apiResponse, (groceriesListData || []))),

    //Error from API
    onError:(error,groceryItem , previousData )=>{
        if (!previousData) return;
        queryClient.setQueryData(["groceriesKey"],previousData)
    }

    
        
  });

  return { groceriesListData, error, isLoading, addingGrocery };
}

export default useGroceries;
