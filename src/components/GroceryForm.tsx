import { FormEvent, useRef } from "react";

import useAddGrocery from "../hooks/useAddGrocery";

const GroceryForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const { addingGrocery } = useAddGrocery();

  const onFormSubmit = (event: FormEvent) => {
    if (nameRef.current && priceRef.current) {
      addingGrocery.mutate({
        id: 0,
        name: nameRef.current.value,
        price: parseFloat(priceRef.current.value),
      });
    }
    event.preventDefault();
  };

  return (
    <div className="container mt-3">
      <form onSubmit={(event) => onFormSubmit(event)}>
        <div className="row mb-3">
          <div className="col-2">
            <label className="form-label">Name</label>
          </div>
          <div className="col-2">
            <input ref={nameRef} type="text" className="className" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-2">
            <label className="form-label">Price</label>
          </div>
          <div className="col-2">
            <input
              step="any"
              ref={priceRef}
              type="number"
              className="className"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-2">
            <label className="form-label"></label>
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-outline-info">
              Add Grocery
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GroceryForm;
