import { useState } from "react";
import useTodos from "../hooks/useTodos";

export interface Todo {
  id: number;
  title: string;
}

export interface PageQuery{
  pageNumber: number;
  pageSize: number
}

const TodoList = () => {
  const [pageQuery, setPageQuery] = useState<PageQuery>({pageNumber: 1, pageSize: 20});
  const { data, error, isLoading } = useTodos(pageQuery);
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading ..</p>;

  return (
    <>
      <div className="container mt-5">
        <ul className="list-group">
          {data?.map((todo) => (
            <li className="list-group-item" key={todo.id}>
              {todo.id}. {todo.title}
            </li>
          ))}
        </ul>
        <div className="row mt-3">
          <div className="col-sm-1"><button className="btn btn-info" disabled={pageQuery.pageNumber === 1} onClick={()=>setPageQuery({...pageQuery,pageNumber: pageQuery.pageNumber-1})}>prev</button></div>
          <div className="col-sm-1"><button className="btn btn-info" disabled={pageQuery.pageNumber >=  pageQuery.pageSize} onClick={()=>setPageQuery({...pageQuery,pageNumber: pageQuery.pageNumber+1})}>next</button></div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
