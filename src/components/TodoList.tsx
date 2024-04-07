import { useState } from "react";
import useTodos from "../hooks/useTodos";

export interface Todo {
  id: number;
  title: string;
}

const TodoList = () => {
  const [userId,setUserId] = useState<number>();
  const { data, error, isLoading } = useTodos(userId);
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading ..</p>;

  return (
    <>
      <div className="container mt-5">
        <select name="" value={userId} className="form-select mb-3" onChange={(event) => setUserId(parseInt(event.target.value))}>
          <option value="">Select user</option>
          <option value="1">user1</option>
          <option value="2">user2</option>
          <option value="3">user3</option>
        </select>
        <ul className="list-group">
          {data?.map((todo) => (
            <li className="list-group-item" key={todo.id}>
              {todo.id}. {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
