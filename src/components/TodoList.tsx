import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
}

const TodoList = () => {
  const fetchtodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const { data } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchtodos,
  });
  
  return (
    <>
      <div className="container">
        <ul className="list-group">
          {data?.map((todo) => (
            <li className="list-group-item" key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
