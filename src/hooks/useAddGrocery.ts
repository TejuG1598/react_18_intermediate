import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGroceries from "./useGroceries";
import { CACHE_QUERY_KEY } from "../utils/Constants";
import APIClient from "../services/apiClient";
import { Grocery } from "../services/groceryService";

const apiClient = new APIClient("/groceries");

function useAddGrocery() {
  const queryClient = useQueryClient();
  const { groceriesListData } = useGroceries();

  //Here we are just adding a grocery to groceries[]
  const updaterFunction = (
    groceryItem: Grocery,
    groceriesListData: Grocery[]
  ) => [...groceriesListData, groceryItem];

  const updateGrocery = (apiResponse: Grocery, groceries: Grocery[]) => {
    return groceries.map((grocery) =>
      grocery.name == apiResponse.name ? apiResponse : grocery
    );
  };

  const addingGrocery = useMutation({
    onMutate: (groceryItem: Grocery) => {
      const previousGroceryList = queryClient.getQueryData(CACHE_QUERY_KEY);
      queryClient.setQueryData(
        CACHE_QUERY_KEY,
        updaterFunction(groceryItem, groceriesListData || [])
      );
      return previousGroceryList;
    },

    mutationFn: (groceryItem: Grocery) => apiClient.postItem(groceryItem),

    //Success from API
    onSuccess: (apiResponse) =>
      queryClient.setQueryData(
        CACHE_QUERY_KEY,
        updateGrocery(apiResponse, groceriesListData || [])
      ),

    //Error from API
    onError: (error, groceryItem, previousData) => {
      if (!previousData) return;
      queryClient.setQueryData(CACHE_QUERY_KEY, previousData);
    },
  });

  return { addingGrocery };
}

export default useAddGrocery;
