import useTodos from "../hooks/useTodos";

export interface Todo {
  id: number;
  title: string;
}

export interface PageQuery {
  pageSize: number;
}

const TodoList = () => {
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } = useTodos({ pageSize: 20 });
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading ..</p>;

  return (
    <>
      <div className="container mt-5">
        <ul className="list-group">
          {data?.pages.map((todoList) =>
            todoList.map((todo) => <li key={todo.id}>{todo.title}</li>)
          )}
        </ul>
        <div className="row mt-3">
          <div className="col-sm-3">
            <button className="btn btn-info" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Loading ..' : 'Load more'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
