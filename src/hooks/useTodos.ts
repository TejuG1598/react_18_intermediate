import axios from "axios";
import { Todo } from "../components/TodoList";
import { useQuery } from "@tanstack/react-query";

const useTodos = () =>{
    const fetchtodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const { data, error, isLoading } = useQuery<Todo[],Error>({
    queryKey: ["todos"],
    queryFn: fetchtodos,
  });

  return {data, error, isLoading}

}

export default useTodos