import { useState } from "react";

let i = 3;
export default function Example() {
  let [items, setItems] = useState([1, 2, 3]);

  function handleClick() {
    i++;
    setItems((items) => [...items, i]);
  }

  function removeItem(item) {
    setItems((items) => items.filter((i) => i !== item));
  }

  return (
    <div className="mx-auto mt-20 max-w-sm">
      <button onClick={handleClick}>Add</button>
      <div className="mt-8 divide-y divide-gray-700">
        {items.map((item) => (
          <p className="flex justify-between py-2 px-2" key={item}>
            <span>{item}</span>
            <button onClick={() => removeItem(item)}>–</button>
          </p>
        ))}
      </div>
    </div>
  );
}
