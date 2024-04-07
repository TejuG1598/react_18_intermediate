import useTodos from "../hooks/useTodos";

export interface Todo {
  id: number;
  title: string;
}

const TodoList = () => {
  const {data, error, isLoading} = useTodos();
  if(error) return <p>{error.message}</p>
  if(isLoading) return <p>Loading ..</p>

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
