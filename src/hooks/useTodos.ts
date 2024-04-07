import axios from "axios";
import { PageQuery, Todo } from "../components/TodoList";
import { useInfiniteQuery } from "@tanstack/react-query";

const useTodos = (pageQuery: PageQuery) =>{
    const fetchtodos = (pageParam: number) =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos",{
        params:{
            _start: (pageParam -1) * pageQuery.pageSize,
            _limit: pageQuery.pageSize
        }
      })
      .then((res) => res.data);

  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Todo[],Error>({
    queryKey: ["todos",pageQuery],
    queryFn: ({pageParam})=>fetchtodos(pageParam),
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined
    }
  });

  return {data, error, isLoading, fetchNextPage, isFetchingNextPage}

}

export default useTodos