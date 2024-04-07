import axios from "axios";
import { Todo } from "../components/TodoList";
import { useQuery } from "@tanstack/react-query";

const useTodos = (userId:  number | undefined) =>{
    const fetchtodos = (userId: number | undefined) =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos",{
        params:{
            userId
        }
      })
      .then((res) => res.data);

  const { data, error, isLoading } = useQuery<Todo[],Error>({
    queryKey: ["todos",userId],
    queryFn: ()=>fetchtodos(userId)
  });

  return {data, error, isLoading}

}

export default useTodos