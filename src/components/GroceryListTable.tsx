import useDeleteGrocery from "../hooks/useDeleteGrocery";
import useGroceries from "../hooks/useGroceries";
import InputEachGrocery from "./GroceryForm";

const GroceryListTable = () => {
  const { groceries, error, isLoading } = useGroceries();
  const {deleteGrocery} = useDeleteGrocery();
  let count = 1

  if (isLoading)
    return (
      <>
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="progress"
        >
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: "25%" }}
            aria-valuenow={25}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
      </>
    );

  if (error) return <p className="alert alert-danger">{error.message}</p>;

  return (
    <>
      <InputEachGrocery />
      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {groceries?.map((eachGrocery) => {
              return (
                <tr key={eachGrocery.id}>
                  <th scope="row">{count++}</th>
                  <td>{eachGrocery.id}</td>
                  <td>{eachGrocery.name}</td>
                  <td>${eachGrocery.price.toFixed(2)}</td>
                  <td><button className="btn btn-outline-danger" onClick={() => deleteGrocery.mutate(eachGrocery) }>delete</button></td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>${groceries?.reduce((acc, grocery) => acc + grocery.price, 0)}</td>
            <td></td>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default GroceryListTable;
