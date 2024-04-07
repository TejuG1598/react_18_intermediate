import axios from "axios";
import { PageQuery, Todo } from "../components/TodoList";
import { useQuery } from "@tanstack/react-query";

const useTodos = (pageQuery: PageQuery) =>{
    const fetchtodos = ({pageNumber, pageSize}: PageQuery) =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos",{
        params:{
            _start: (pageNumber -1) * pageSize,
            _limit: pageSize
        }
      })
      .then((res) => res.data);

  const { data, error, isLoading } = useQuery<Todo[],Error>({
    queryKey: ["todos",pageQuery],
    queryFn: ()=>fetchtodos(pageQuery)
  });

  return {data, error, isLoading}

}

export default useTodos