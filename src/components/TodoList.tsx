import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
}

const TodoList = () => {
  const fetchtodos = () =>
    axios
      .get<Todo[]>("https://xjsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const { data, error } = useQuery<Todo[],Error>({
    queryKey: ["todos"],
    queryFn: fetchtodos,
  });

  if(error) return <p>{error.message}</p>

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
